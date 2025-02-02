import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';
import { Member } from './entities/member.entity';
import { User } from 'src/users/entities/user.entity';
import { Board } from 'src/boards/entities/board.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

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
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Board),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MembersService>(MembersService);
    memberRepo = module.get<Repository<Member>>(getRepositoryToken(Member));
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    boardRepo = module.get<Repository<Board>>(getRepositoryToken(Board));
  });

  describe('create', () => {
    it('should successfully create a member', async () => {
      const createMemberDto = { userId: 1, boardId: 1 };
      const user = { name: 'User 1' };

      boardRepo.findOne = jest.fn().mockResolvedValue({ id: 1 }); 
      userRepo.find = jest.fn().mockResolvedValue([user]); 

      const result = await service.create(createMemberDto);

      expect(result.message).toBe('Trello 보드(1)에 유저(1) 등록 성공');
      expect(result.data[0].name).toBe('User 1');
    });

    it('should throw error if board not found', async () => {
      const createMemberDto = { userId: 1, boardId: 999 };

      boardRepo.findOne = jest.fn().mockResolvedValue(null); 

      await expect(service.create(createMemberDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return members successfully', async () => {
      const getMemberDto = { boardId: 1 };
      const members = [{ userId: 1 }];
      const users = [{ name: 'User 1' }];

      memberRepo.find = jest.fn().mockResolvedValue(members); 
      userRepo.find = jest.fn().mockResolvedValue(users); 
      const result = await service.findAll(getMemberDto);
      expect(result.message).toBe('Trello 보드(1)에  멤버 조회 성공');
      expect(result.names[0].name).toBe('User 1');
    });
  });

  describe('findOne', () => {
    it('should return member details successfully', async () => {
      const getMemberDto = { boardId: 1 };
      const user = { name: 'User 1', email: 'user1@example.com' };

      memberRepo.find = jest.fn().mockResolvedValue([{ userId: 1 }]); 
      userRepo.findOne = jest.fn().mockResolvedValue(user); 

      const result = await service.findOne(1, getMemberDto);
      expect(result.message).toBe('Trello 보드(1)에  멤버(1) 상세 조회 성공');
      expect(result.data.name).toBe('User 1');
    });
  });

  describe('remove', () => {
    it('should successfully remove a member', async () => {
      const getMemberDto = { boardId: 1 };
      const user = { name: 'User 1' };

      userRepo.findOne = jest.fn().mockResolvedValue(user); 
      memberRepo.delete = jest.fn().mockResolvedValue({ affected: 1 }); 

      const result = await service.remove(1, getMemberDto);
      expect(result.message).toBe('Trello 보드(1)에  멤버 삭제 성공');
    });

    it('should throw error if user not found', async () => {
      const getMemberDto = { boardId: 1 };

      userRepo.findOne = jest.fn().mockResolvedValue(null); 

      await expect(service.remove(999, getMemberDto)).rejects.toThrow(NotFoundException);
    });
  });
});
