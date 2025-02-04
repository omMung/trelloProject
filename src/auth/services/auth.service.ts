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

@Injectable()
export class AuthService {
  private blacklistedTokens = new Set<string>(); // 블랙리스트 저장소 (임시), 차후 redis 확장 예정?

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
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

  async logout(token: string) {
    this.blacklistedTokens.add(token); // 토큰을 블랙리스트에 추가
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.blacklistedTokens.has(token);
  }
}
