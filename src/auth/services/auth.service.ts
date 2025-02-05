import nodemailer from 'nodemailer';
import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { VerifyEmailDto } from '../dto/verify-email.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AuthService {
  private blacklistedTokens = new Set<string>(); // 블랙리스트 저장소 (임시), 차후 redis 확장 예정?

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
    private redisService: RedisService,
    private configService: ConfigService,
  ) {}

  async sendVerificationEmail(email: string, verifyCode: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // .env에서 설정
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '이메일 인증 코드',
      text: `인증 코드: ${verifyCode}`,
    };

    //await transporter.sendMail(mailOptions);
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('이메일 발송 성공:', info.response); // 발송 성공 로그
    } catch (error) {
      console.error('이메일 발송 실패:', error); // 발송 실패 로그
    }
  }
  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    if (!user.isVerified) {
      throw new UnauthorizedException('이메일 인증이 완료되지 않았습니다.');
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESS_SECRET_KEY'),
      expiresIn: this.configService.get<string>('ACCESS_EXPIRES_IN', '1m'),
    });

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      {
        // 리프레시 토큰에 유저 ID 포함
        secret: this.configService.get<string>('REFRESH_SECRET_KEY'),
        expiresIn: '2m',
      },
    );

    // Redis에 리프레시 토큰 저장 (덮어쓰기)
    await this.redisService.set(`refresh:${user.id}`, refreshToken, 2 * 60);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const { email, verifyCode } = verifyEmailDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException(
        '해당 이메일의 사용자가 존재하지 않습니다.',
      );
    }

    if (user.verifyCode !== verifyCode) {
      throw new BadRequestException('인증 코드가 올바르지 않습니다.');
    }

    // 인증 완료
    user.isVerified = true;
    user.verifyCode = null; // 인증 코드 제거
    await this.userRepository.save(user);

    return { message: '이메일 인증이 완료되었습니다.' };
  }

  async logout(userId: number, accessToken: string) {
    // 리프레시 토큰 삭제
    await this.redisService.del(`refresh:${userId}`);

    // JWT 블랙리스트 추가
    const decoded = this.jwtService.decode(accessToken) as { exp: number };
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

    await this.redisService.set(
      `blacklist:${accessToken}`,
      'blacklisted',
      expiresIn,
    );
  }

  // 블랙리스트에 있는 JWT 토큰인지 확인
  async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await this.redisService.get(`blacklist:${token}`);
    return !!result;
  }

  // 리프레시 토큰 검증
  async validateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<boolean> {
    const storedToken = await this.redisService.get(`refresh:${userId}`);
    return storedToken === refreshToken;
  }

  // 리프레시 토큰을 이용한 새로운 액세스 토큰 발급
  async refreshToken(req: Request) {
    const refreshToken = req.cookies.refreshToken; // 쿠키에서 리프레시 토큰 가져오기

    if (!refreshToken) {
      throw new UnauthorizedException('리프레시 토큰이 제공되지 않았습니다.');
    }

    const payload = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('REFRESH_SECRET_KEY'),
    });

    const userId = payload.sub;

    const isValid = await this.validateRefreshToken(userId, refreshToken);
    if (!isValid) {
      throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
    }

    const newAccessToken = this.jwtService.sign(
      { sub: userId },
      {
        secret: this.configService.get<string>('ACCESS_SECRET_KEY'),
        expiresIn: '1m', // 엑세스 토큰 유효기간 1분
      },
    );

    // 새 리프레시 토큰 발급 및 Redis 덮어쓰기
    const newRefreshToken = this.jwtService.sign(
      { sub: userId },
      {
        secret: this.configService.get<string>('REFRESH_SECRET_KEY'),
        expiresIn: '2m', // 리프레시 토큰 유효기간 2분
      },
    );
    await this.redisService.set(`refresh:${userId}`, newRefreshToken, 2 * 60);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
