import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/services/auth.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt'; // default import로 변경

// bcrypt 모듈 전체 모킹 (ES 모듈 설정 제거)
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_newpassword'), // 모든 테스트에서 일관된 반환값 사용
  compare: jest.fn(),
}));

// UsersService 테스트 시작
describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Repository<User>;
  let authService: AuthService;

  // UserRepository와 AuthService Mock 설정
  const mockUserRepository = {
    findOne: jest.fn(), // 유저 찾기 함수 Mock
    create: jest.fn(), // 유저 생성 함수 Mock
    save: jest.fn(), // 유저 저장 함수 Mock
    update: jest.fn(), // 유저 업데이트 함수 Mock
    delete: jest.fn(), // 유저 삭제 함수 Mock
  };

  const mockAuthService = {
    sendVerificationEmail: jest.fn(), // 이메일 전송 함수 Mock
  };

  // 각 테스트 실행 전에 모듈 초기화
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository, // UserRepository에 Mock 주입
        },
        {
          provide: AuthService,
          useValue: mockAuthService, // AuthService에 Mock 주입
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    authService = module.get<AuthService>(AuthService);
  });

  // 각 테스트 후 Mock 초기화
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 회원가입 성공 시 테스트
  it('should create a new user successfully', async () => {
    const createUserDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      phoneNumber: '010-1234-5678',
    };

    mockUserRepository.findOne.mockResolvedValue(null); // 기존 유저 없음
    mockUserRepository.create.mockReturnValue(createUserDto); // 유저 생성
    mockUserRepository.save.mockResolvedValue({ id: 1, ...createUserDto }); // 유저 저장

    const result = await usersService.create(createUserDto);

    // 반환 값 검증
    expect(result).toEqual({
      message: '회원가입이 완료되었습니다. 이메일을 확인해주세요.',
    });

    // 이메일 중복 검사 호출 확인
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { email: createUserDto.email },
    });

    // 비밀번호 암호화 호출 확인
    expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);

    // 유저 저장 호출 확인
    expect(mockUserRepository.save).toHaveBeenCalled();

    // 이메일 전송 호출 확인
    expect(authService.sendVerificationEmail).toHaveBeenCalledWith(
      createUserDto.email,
      expect.any(String), // 인증 코드는 랜덤값이므로 any(String)으로 검사
    );
  });

  // 이미 존재하는 이메일로 회원가입 시 ConflictException 발생 테스트
  it('should throw ConflictException if email already exists', async () => {
    const createUserDto = {
      email: 'existing@example.com',
      password: 'password123',
      name: 'Existing User',
      phoneNumber: '010-1234-5678',
    };

    mockUserRepository.findOne.mockResolvedValue(createUserDto); // 기존 이메일 존재

    await expect(usersService.create(createUserDto)).rejects.toThrow(
      ConflictException, // ConflictException 발생 예상
    );

    // 이메일 중복 검사 호출 확인
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { email: createUserDto.email },
    });
  });

  // 유저 ID로 유저 데이터 조회 테스트
  it('should return user data by ID', async () => {
    const user = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      phoneNumber: '010-1234-5678',
      isVerified: true,
      createdAt: new Date(),
    };

    mockUserRepository.findOne.mockResolvedValue(user); // 유저 존재

    const result = await usersService.getUserById(1);

    // 반환 값 검증
    expect(result).toEqual(user);

    // 유저 조회 호출 확인
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      select: ['id', 'email', 'name', 'phoneNumber', 'isVerified', 'createdAt'],
    });
  });

  // 존재하지 않는 유저 조회 시 NotFoundException 발생 테스트
  it('should throw NotFoundException if user is not found', async () => {
    mockUserRepository.findOne.mockResolvedValue(null); // 유저 존재하지 않음

    await expect(usersService.getUserById(1)).rejects.toThrow(
      NotFoundException,
    ); // NotFoundException 발생 예상
  });

  // 유저 정보 수정 성공 테스트
  it('should update user data successfully', async () => {
    const updateUserDto: UpdateUserDto = {
      name: 'Updated User',
      password: 'newpassword123',
    }; // UpdateUserDto 타입 명시
    const user = { id: 1, name: 'Old User', password: 'oldpassword123' };

    mockUserRepository.findOne.mockResolvedValue(user); // 기존 유저 존재

    const result = await usersService.update(1, updateUserDto);

    // 유저 정보 수정 호출 확인
    expect(mockUserRepository.update).toHaveBeenCalledWith(1, {
      name: 'Updated User',
      password: 'hashed_newpassword',
    });

    // 반환 값 검증
    expect(result).toEqual({ message: '회원 정보가 수정되었습니다.' });
  });

  // 존재하지 않는 유저 정보 수정 시 NotFoundException 발생 테스트
  it('should throw NotFoundException if user not found for update', async () => {
    mockUserRepository.findOne.mockResolvedValue(null); // 유저 존재하지 않음

    await expect(usersService.update(1, { name: 'New Name' })).rejects.toThrow(
      NotFoundException, // NotFoundException 발생 예상
    );
  });

  // 유저 삭제 성공 테스트
  it('should delete user successfully', async () => {
    const user = { id: 1, name: 'User to Delete' };

    mockUserRepository.findOne.mockResolvedValue(user); // 삭제할 유저 존재

    const result = await usersService.delete(1);

    // 유저 삭제 호출 확인
    expect(mockUserRepository.delete).toHaveBeenCalledWith(1);

    // 반환 값 검증
    expect(result).toEqual({ message: '회원탈퇴가 완료되었습니다.' });
  });

  // 존재하지 않는 유저 삭제 시 NotFoundException 발생 테스트
  it('should throw NotFoundException if user is not found for deletion', async () => {
    mockUserRepository.findOne.mockResolvedValue(null); // 유저 존재하지 않음

    await expect(usersService.delete(1)).rejects.toThrow(NotFoundException); // NotFoundException 발생 예상
  });
});
