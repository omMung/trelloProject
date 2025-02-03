import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ConflictException } from '@nestjs/common';
import { AuthService } from '../auth/services/auth.service';
import bcrypt from 'bcrypt';

describe('UsersService - 회원가입', () => {
  let usersService: UsersService;
  let userRepository: Repository<User>;
  let authService: AuthService;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockAuthService = {
    sendVerificationEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // ✅ 테스트 후 모든 Mock 초기화
  });

  it('회원가입 성공 시 올바른 메시지를 반환해야 한다', async () => {
    const createUserDto = {
      email: 'newuser@example.com',
      password: 'password123',
      name: '새 유저',
      phoneNumber: '010-1234-5678',
    };

    mockUserRepository.findOne.mockResolvedValue(null); // ✅ 기존 유저 없음
    mockUserRepository.create.mockReturnValue(createUserDto);
    mockUserRepository.save.mockResolvedValue({ id: 1, ...createUserDto });

    // ✅ bcrypt 모듈 모킹 (ESM 방식)
    jest.mock('bcrypt', () => ({
      __esModule: true, // ESM 모듈임을 명시
      default: {
        hash: jest.fn().mockResolvedValue('hashed_password'),
        compare: jest.fn(),
      },
    }));

    const result = await usersService.create(createUserDto);

    // ✅ 반환 값 검증
    expect(result).toEqual({
      message: '회원가입이 완료되었습니다. 이메일을 확인해주세요.',
    });

    // ✅ 이메일 중복 검사 호출 확인
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { email: createUserDto.email },
    });

    // ✅ 비밀번호 암호화 확인
    expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);

    // ✅ 이메일 인증 코드 전송 확인
    expect(authService.sendVerificationEmail).toHaveBeenCalledTimes(1);
    expect(authService.sendVerificationEmail).toHaveBeenCalledWith(
      createUserDto.email,
      expect.any(String), // 인증 코드는 랜덤값이므로 any(String)으로 검사
    );
  });

  it('이미 존재하는 이메일로 회원가입 시 ConflictException 발생해야 한다', async () => {
    const createUserDto = {
      email: 'existing@example.com',
      password: 'password123',
      name: '기존 유저',
      phoneNumber: '010-1234-5678',
    };

    // ✅ 기존 이메일 존재하도록 설정
    mockUserRepository.findOne.mockResolvedValue({ id: 1, ...createUserDto });

    await expect(usersService.create(createUserDto)).rejects.toThrow(
      ConflictException,
    );

    // ✅ 중복 이메일 검사가 호출되었는지 확인
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { email: createUserDto.email },
    });

    // ✅ 이미 존재하는 경우 저장(save) 및 이메일 전송이 호출되지 않아야 함
    expect(mockUserRepository.save).not.toHaveBeenCalled();
    expect(authService.sendVerificationEmail).not.toHaveBeenCalled();
  });
});
