import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';
import { Member } from './entities/member.entity';
import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('MembersService', () => {
  let service: MembersService;
  let memberRepo: Repository<Member>;
  let userRepo: Repository<User>;
  let boardRepo: Repository<Board>;

  const mockMemberRepo = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockUserRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockBoardRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersService,
        { provide: getRepositoryToken(Member), useValue: mockMemberRepo },
        { provide: getRepositoryToken(User), useValue: mockUserRepo },
        { provide: getRepositoryToken(Board), useValue: mockBoardRepo },
      ],
    }).compile();

    service = module.get<MembersService>(MembersService);
    memberRepo = module.get<Repository<Member>>(getRepositoryToken(Member));
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    boardRepo = module.get<Repository<Board>>(getRepositoryToken(Board));
  });

  describe('create', () => {
    test('멤버를 성공적으로 추가할 수 있어야 한다', async () => {
      const createMemberDto = { boardId: 1 };
      const userId = 1;

      mockBoardRepo.findOne.mockResolvedValue({ id: 1 });
      mockUserRepo.find.mockResolvedValue([{ name: 'User 1', email: 'user1@example.com' }]);
      mockMemberRepo.save.mockResolvedValue({});

      const result = { message: 'Trello 보드(1)에 유저(1) 등록 성공', data: [{ name: 'User 1', email: 'user1@example.com' }] };
      
      expect(await service.create(userId, createMemberDto)).toEqual(result);
    });

    test('존재하지 않는 보드일 경우 NotFoundException이 발생해야 한다', async () => {
      const createMemberDto = { boardId: 999 };
      const userId = 1;

      mockBoardRepo.findOne.mockResolvedValue(null);

      await expect(service.create(userId, createMemberDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    test('보드에 멤버들을 성공적으로 조회할 수 있어야 한다', async () => {
      const getMemberDto = { boardId: 1 };

      mockMemberRepo.find.mockResolvedValue([{ userId: 1 }, { userId: 2 }]);
      mockUserRepo.find.mockResolvedValue([{ name: 'User 1' }, { name: 'User 2' }]);

      const result = { message: 'Trello 보드(1)에 멤버 조회 성공', names: [{ name: 'User 1' }, { name: 'User 2' }] };
      
      expect(await service.findAll(getMemberDto)).toEqual(result);
    });

    test('보드에 해당하는 유저가 없을 경우 Error가 발생해야 한다', async () => {
      const getMemberDto = { boardId: 999 };

      mockMemberRepo.find.mockResolvedValue([]);
      await expect(service.findAll(getMemberDto)).rejects.toThrow(Error);
    });
  });

  describe('findOne', () => {
    test('멤버 상세 조회가 성공적으로 되어야 한다', async () => {
      const detailgetMemberDto = { boardId: 1 };
      const memberId = 1;

      mockMemberRepo.find.mockResolvedValue([{ userId: 1 }]);
      mockUserRepo.findOne.mockResolvedValue({ name: 'User 1', email: 'user1@example.com' });

      const result = { message: 'Trello 보드(1)에 멤버(1) 상세 조회 성공', data: { name: 'User 1', email: 'user1@example.com' } };

      expect(await service.findOne(memberId, detailgetMemberDto)).toEqual(result);
    });

    test('보드에 해당하는 멤버가 없을 경우 Error가 발생해야 한다', async () => {
      const detailgetMemberDto = { boardId: 999 };
      const memberId = 1;

      mockMemberRepo.find.mockResolvedValue([{ userId: 2 }]);
      await expect(service.findOne(memberId, detailgetMemberDto)).rejects.toThrow(Error);
    });
  });

  describe('remove', () => {
    test('멤버를 성공적으로 삭제할 수 있어야 한다', async () => {
      const deleteMemberDto = { boardId: 1 };
      const userId = 1;

      mockUserRepo.findOne.mockResolvedValue({ name: 'User 1' });
      mockMemberRepo.findOne.mockResolvedValue({});

      const result = { message: "Trello 보드(1)에 멤버 'User 1' (1) 삭제 성공" };

      expect(await service.remove(userId, deleteMemberDto)).toEqual(result);
    });

    test('삭제할 멤버가 없을 경우 NotFoundException이 발생해야 한다', async () => {
      const deleteMemberDto = { boardId: 1 };
      const userId = 999;

      mockUserRepo.findOne.mockResolvedValue(null);
      await expect(service.remove(userId, deleteMemberDto)).rejects.toThrow(NotFoundException);
    });
  });
});
