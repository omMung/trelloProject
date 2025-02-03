import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/services/auth.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    //@Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password, name, phoneNumber } = createUserDto;

    // 이메일 중복 검사
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 이메일 인증 코드 생성
    const verifyCode = Math.random().toString(36).substr(2, 6).toUpperCase();

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      phoneNumber,
      isVerified: false,
      verifyCode,
    });

    await this.userRepository.save(newUser);

    // 이메일 인증 코드 전송
    await this.authService.sendVerificationEmail(email, verifyCode);

    return { message: '회원가입이 완료되었습니다. 이메일을 확인해주세요.' };
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'name', 'phoneNumber', 'isVerified', 'createdAt'], // 비밀번호 제외
    });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return user;
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.userRepository.update(userId, updateUserDto);

    return { message: '회원 정보가 수정되었습니다.' };
  }

  async delete(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    await this.userRepository.delete(userId);
    return { message: '회원탈퇴가 완료되었습니다.' };
  }
}
