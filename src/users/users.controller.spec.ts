import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

// JwtAuthGuard 모킹
jest.mock('../auth/guards/jwt-auth.guard', () => ({
  JwtAuthGuard: jest.fn().mockImplementation(() => true),
}));

// UsersController 테스트 시작
describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  // UsersService Mock 설정
  const mockUsersService = {
    getUserById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  // 각 테스트 실행 전에 모듈 초기화
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  // 각 테스트 후 Mock 초기화
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 내 정보 조회 성공 테스트
  it('should return user data for authenticated user', async () => {
    const mockRequest = { user: { id: 1 } };
    const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };

    mockUsersService.getUserById.mockResolvedValue(mockUser);

    const result = await usersController.getMyInfo(mockRequest);

    expect(result).toEqual(mockUser);
    expect(mockUsersService.getUserById).toHaveBeenCalledWith(1);
  });

  // 내 정보 조회 실패 테스트
  it('should throw NotFoundException if user not found', async () => {
    const mockRequest = { user: { id: 999 } };
    mockUsersService.getUserById.mockRejectedValue(
      new NotFoundException('User not found'),
    );

    await expect(usersController.getMyInfo(mockRequest)).rejects.toThrow(
      NotFoundException,
    );
  });

  // 내 정보 수정 성공 테스트
  it('should update user info successfully', async () => {
    const mockRequest = { user: { id: 1 } };
    const updateUserDto: UpdateUserDto = { name: 'Updated User' };
    const updatedUser = {
      id: 1,
      name: 'Updated User',
      email: 'test@example.com',
    };

    mockUsersService.update.mockResolvedValue(updatedUser);

    const result = await usersController.updateMyInfo(
      mockRequest,
      updateUserDto,
    );

    expect(result).toEqual(updatedUser);
    expect(mockUsersService.update).toHaveBeenCalledWith(1, updateUserDto);
  });

  // 내 정보 수정 실패 테스트
  it('should throw NotFoundException if user not found during update', async () => {
    const mockRequest = { user: { id: 999 } };
    const updateUserDto: UpdateUserDto = { name: 'Updated User' };

    mockUsersService.update.mockRejectedValue(
      new NotFoundException('User not found'),
    );

    await expect(
      usersController.updateMyInfo(mockRequest, updateUserDto),
    ).rejects.toThrow(NotFoundException);
  });

  // 계정 삭제 성공 테스트
  it('should delete user account successfully', async () => {
    const mockRequest = { user: { id: 1 } };
    const deleteResponse = { message: '회원탈퇴가 완료되었습니다.' };

    mockUsersService.delete.mockResolvedValue(deleteResponse);

    const result = await usersController.deleteMyAccount(mockRequest);

    expect(result).toEqual(deleteResponse);
    expect(mockUsersService.delete).toHaveBeenCalledWith(1);
  });

  // 계정 삭제 실패 테스트
  it('should throw NotFoundException if user not found during deletion', async () => {
    const mockRequest = { user: { id: 999 } };

    mockUsersService.delete.mockRejectedValue(
      new NotFoundException('User not found'),
    );

    await expect(usersController.deleteMyAccount(mockRequest)).rejects.toThrow(
      NotFoundException,
    );
  });
});
