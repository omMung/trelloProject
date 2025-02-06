import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';
import { Member } from './entities/member.entity';
import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';

describe('MembersService', () => {
  let service: MembersService;
  let memberRepo: Repository<Member>;
  let userRepo: Repository<User>;
  let boardRepo: Repository<Board>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersService,
        {
          provide: getRepositoryToken(Member),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Board),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MembersService>(MembersService);
    memberRepo = module.get<Repository<Member>>(getRepositoryToken(Member));
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    boardRepo = module.get<Repository<Board>>(getRepositoryToken(Board));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('멤버 추가 성공', async () => {
      const createMemberDto = { userId: 1, boardId: 1 };
      const authId = 1;
      const mockBoard = { id: 1, userId: authId };
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', phoneNumber: '123456789' };

      jest.spyOn(boardRepo, 'findOne').mockResolvedValue(mockBoard as Board);
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(mockUser as User);
      jest.spyOn(memberRepo, 'save').mockResolvedValue(undefined);

      const result = await service.create(authId, createMemberDto);
      expect(result).toEqual({
        message: `Trello 보드(1)에 유저(1) 등록 성공`,
        data: mockUser,
      });
    });

    it('보드를 찾을 수 없으면 예외 발생', async () => {
      jest.spyOn(boardRepo, 'findOne').mockResolvedValue(null);

      await expect(service.create(1, { userId: 1, boardId: 1 })).rejects.toThrow(InternalServerErrorException);
    });

    it('유저를 찾을 수 없으면 예외 발생', async () => {
      jest.spyOn(boardRepo, 'findOne').mockResolvedValue({ id: 1, userId: 1 } as Board);
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(null);

      await expect(service.create(1, { userId: 1, boardId: 1 })).rejects.toThrow(NotFoundException);
    });

    it('보드 소유자가 아닐 경우 예외 발생', async () => {
      jest.spyOn(boardRepo, 'findOne').mockResolvedValue({ id: 1, userId: 2 } as Board);
      jest.spyOn(userRepo, 'findOne').mockResolvedValue({ id: 1 } as User);

      await expect(service.create(1, { userId: 1, boardId: 1 })).rejects.toThrow(ForbiddenException);
    });
  });

  describe('findAll', () => {
    it('멤버 전체 조회 성공', async () => {
      const getMemberDto = { boardId: 1 };
      const members = [{ userId: 1 }, { userId: 2 }];
      const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];

      jest.spyOn(memberRepo, 'find').mockResolvedValue(members as Member[]);
      jest.spyOn(userRepo, 'find').mockResolvedValue(users as User[]);

      const result = await service.findAll(getMemberDto);
      expect(result).toEqual({
        message: 'Trello 보드(1)에  멤버 조회 성공',
        names: users,
      });
    });

    it('보드에 멤버가 없을 경우 예외 발생', async () => {
      jest.spyOn(memberRepo, 'find').mockResolvedValue([]);

      await expect(service.findAll({ boardId: 1 })).rejects.toThrow(Error);
    });
  });

  describe('findOne', () => {
    it('멤버 상세 조회 성공', async () => {
      const detailGetMemberDto = { boardId: 1 };
      const members = [{ userId: 1 }];
      const user = { id: 1, name: 'John', email: 'john@example.com', phoneNumber: '123456789' };

      jest.spyOn(memberRepo, 'find').mockResolvedValue(members as Member[]);
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(user as User);

      const result = await service.findOne(1, detailGetMemberDto);
      expect(result).toEqual({
        message: 'Trello 보드(1)에  멤버(1) 상세 조회 성공',
        data: user,
      });
    });

    it('해당 유저가 보드에 없으면 예외 발생', async () => {
      jest.spyOn(memberRepo, 'find').mockResolvedValue([{ userId: 2 }] as Member[]);

      await expect(service.findOne(1, { boardId: 1 })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('멤버 삭제 성공', async () => {
      const deleteMemberDto = { userId: 1, boardId: 1 };
      const authId = 1;
      const board = { id: 1, userId: authId };
      const user = { id: 1, name: 'John' };
      const member = { userId: 1, boardId: 1 };

      jest.spyOn(boardRepo, 'findOne').mockResolvedValue(board as Board);
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(user as User);
      jest.spyOn(memberRepo, 'findOne').mockResolvedValue(member as Member);
      jest.spyOn(memberRepo, 'delete').mockResolvedValue({ affected: 1 } as any);

      const result = await service.remove(authId, deleteMemberDto);
      expect(result).toEqual({
        message: `Trello 보드(1)에  멤버 'John' (1)  삭제 성공`,
      });
    });

    it('보드를 찾을 수 없으면 예외 발생', async () => {
      jest.spyOn(boardRepo, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1, { userId: 1, boardId: 1 })).rejects.toThrow(InternalServerErrorException);
    });

    it('보드 소유자가 아닐 경우 예외 발생', async () => {
      jest.spyOn(boardRepo, 'findOne').mockResolvedValue({ id: 1, userId: 2 } as Board);

      await expect(service.remove(1, { userId: 1, boardId: 1 })).rejects.toThrow(InternalServerErrorException);
    });
  });
});
