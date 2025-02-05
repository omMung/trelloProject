import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('멤버 서비스 (MembersService)', () => {
  let service: MembersService;
  let memberRepository: Repository<Member>;
  let userRepository: Repository<User>;
  let boardRepository: Repository<Board>;

  const mockMemberRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };

  const mockUserRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const mockBoardRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersService,
        { provide: getRepositoryToken(Member), useValue: mockMemberRepository },
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: getRepositoryToken(Board), useValue: mockBoardRepository },
      ],
    }).compile();

    service = module.get<MembersService>(MembersService);
    memberRepository = module.get<Repository<Member>>(getRepositoryToken(Member));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    boardRepository = module.get<Repository<Board>>(getRepositoryToken(Board));
  });

  test('서비스가 정상적으로 정의되는지 확인', () => {
    expect(service).toBeDefined();
  });

  describe('멤버 추가 (create)', () => {
    test('정상적으로 멤버를 추가하면 성공 메시지를 반환해야 한다', async () => {
      mockUserRepository.findOne.mockResolvedValue({ id: 1, name: '홍길동' });
      mockBoardRepository.findOne.mockResolvedValue({ id: 1, userId: 100 });
      mockMemberRepository.save.mockResolvedValue(undefined);

      const result = await service.create(100, { userId: 1, boardId: 1 });

      expect(result).toEqual({
        message: `Trello 보드(1)에 유저(1) 등록 성공`,
        data: { id: 1, name: '홍길동' },
      });
    });

    test('존재하지 않는 유저를 추가하려 하면 NotFoundException이 발생해야 한다', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.create(100, { userId: 1, boardId: 1 })).rejects.toThrow(NotFoundException);
    });

    test('존재하지 않는 보드에 추가하려 하면 NotFoundException이 발생해야 한다', async () => {
      mockUserRepository.findOne.mockResolvedValue({ id: 1 });
      mockBoardRepository.findOne.mockResolvedValue(null);

      await expect(service.create(100, { userId: 1, boardId: 1 })).rejects.toThrow(NotFoundException);
    });

    test('보드 생성자가 아닌 사용자가 추가하려 하면 ForbiddenException이 발생해야 한다', async () => {
      mockUserRepository.findOne.mockResolvedValue({ id: 1 });
      mockBoardRepository.findOne.mockResolvedValue({ id: 1, userId: 999 });

      await expect(service.create(100, { userId: 1, boardId: 1 })).rejects.toThrow(ForbiddenException);
    });
  });

  describe('모든 멤버 조회 (findAll)', () => {
    test('보드에 속한 멤버를 정상적으로 조회해야 한다', async () => {
      mockMemberRepository.find.mockResolvedValue([{ userId: 1 }, { userId: 2 }]);
      mockUserRepository.find.mockResolvedValue([{ id: 1, name: '김철수' }, { id: 2, name: '이영희' }]);

      const result = await service.findAll({ boardId: 1 });

      expect(result).toEqual({
        message: `Trello 보드(1)에  멤버 조회 성공`,
        names: [{ id: 1, name: '김철수' }, { id: 2, name: '이영희' }],
      });
    });

    test('멤버가 없는 보드를 조회하면 에러가 발생해야 한다', async () => {
      mockMemberRepository.find.mockResolvedValue([]);

      await expect(service.findAll({ boardId: 1 })).rejects.toThrowError('보드에 해당하는 유저를 찾을수가 없습니다');
    });
  });

  describe('특정 멤버 조회 (findOne)', () => {
    test('특정 멤버 정보를 정상적으로 조회해야 한다', async () => {
      mockMemberRepository.find.mockResolvedValue([{ userId: 1 }]);
      mockUserRepository.findOne.mockResolvedValue({
        id: 1,
        name: '김철수',
        email: 'kim@example.com',
        phoneNumber: '010-1234-5678',
      });

      const result = await service.findOne(1, { boardId: 1 });

      expect(result).toEqual({
        message: `Trello 보드(1)에  멤버(1) 상세 조회 성공`,
        data: {
          id: 1,
          name: '김철수',
          email: 'kim@example.com',
          phoneNumber: '010-1234-5678',
        },
      });
    });

    test('해당 보드에 없는 멤버를 조회하면 에러가 발생해야 한다', async () => {
      mockMemberRepository.find.mockResolvedValue([]);

      await expect(service.findOne(1, { boardId: 1 })).rejects.toThrowError('보드에 해당하는 유저를 찾을수가 없습니다');
    });
  });

  describe('멤버 삭제 (remove)', () => {
    test('멤버를 정상적으로 삭제해야 한다', async () => {
      mockBoardRepository.findOne.mockResolvedValue({ id: 1, userId: 100 });
      mockUserRepository.findOne.mockResolvedValue({ id: 1, name: '홍길동' });
      mockMemberRepository.findOne.mockResolvedValue({ userId: 1, boardId: 1 });
      mockMemberRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(100, { userId: 1, boardId: 1 });

      expect(result).toEqual({
        message: `Trello 보드(1)에  멤버 '홍길동' (1)  삭제 성공`,
      });
    });
  });
});
