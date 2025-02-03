import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { visibEnum } from './dto/visibility.enum';

describe('BoardsService', () => {
  let service: BoardsService;
  let boardRepo: Repository<Board>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        {
          provide: getRepositoryToken(Board),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
    boardRepo = module.get<Repository<Board>>(getRepositoryToken(Board));
  });

  describe('create', () => {
    it('should successfully create a board', async () => {
      const createBoardDto = {
        userId: 1,
        title: 'New Board',
        visibility: visibEnum.PRIVATE,
        color: 'blue',
      };

      const result = { message: '보드를 성공적으로 생성했습니다.' };

      boardRepo.create = jest.fn().mockReturnValue(createBoardDto);
      boardRepo.save = jest.fn().mockResolvedValue(createBoardDto);

      expect(await service.create(createBoardDto)).toBe(result);
    });

    it('should throw an error if board creation fails', async () => {
      const createBoardDto = {
        userId: 1,
        title: 'New Board',
        visibility: visibEnum.PRIVATE,
        color: 'blue',
      };

      boardRepo.save = jest.fn().mockRejectedValue(new Error('Board creation failed'));

      await expect(service.create(createBoardDto)).rejects.toThrow('보드 생성에 실패했습니다.');
    });
  });

  describe('findAll', () => {
    it('should return all boards', async () => {
      const boards = [
        { id: 1, title: 'Board 1', visibility: visibEnum.PRIVATE, color: 'blue' },
        { id: 2, title: 'Board 2', visibility: visibEnum.PUBLIC, color: 'green' },
      ];

      boardRepo.find = jest.fn().mockResolvedValue(boards);

      const result = {
        message: '모든 보드를 성공적으로 조회했습니다',
        data: boards,
      };

      expect(await service.findAll()).toBe(result);
    });

    it('should throw error if finding boards fails', async () => {
      boardRepo.find = jest.fn().mockRejectedValue(new Error('Database error'));

      await expect(service.findAll()).rejects.toThrow('보드 전체 조회중에 에러가 발생했습니다.');
    });
  });

  describe('findOne', () => {
    it('should return a board', async () => {
      const board = { id: 1, title: 'Board 1', visibility: visibEnum.PRIVATE, color: 'blue' };

      boardRepo.findOne = jest.fn().mockResolvedValue(board);

      const result = {
        message: '하나의 보드를 성공적으로 조회했습니다',
        data: board,
      };

      expect(await service.findOne(1)).toBe(result);
    });

    it('should throw error if board not found', async () => {
      boardRepo.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a board successfully', async () => {
      const updateBoardDto = { title: 'Updated Board', visibility: visibEnum.PUBLIC, color: 'red' };
      const board = { id: 1, title: 'Updated Board', visibility: visibEnum.PUBLIC, color: 'red' };

      boardRepo.findOne = jest.fn().mockResolvedValue({ id: 1 });
      boardRepo.update = jest.fn().mockResolvedValue({});
      boardRepo.findOne = jest.fn().mockResolvedValue(board);

      const result = { message: '보드를 성공적으로 수정했습니다', data: board };

      expect(await service.update(1, updateBoardDto)).toBe(result);
    });

    it('should throw error if board not found for update', async () => {
      const updateBoardDto = { title: 'Updated Board', visibility: visibEnum.PUBLIC, color: 'red' };

      boardRepo.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.update(999, updateBoardDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should successfully remove a board', async () => {
      const board = { id: 1, title: 'Board 1', visibility: visibEnum.PRIVATE, color: 'blue' };

      boardRepo.findOne = jest.fn().mockResolvedValue(board);
      boardRepo.remove = jest.fn().mockResolvedValue(board);

      const result = { message: '보드를 성공적으로 삭제했습니다' };

      expect(await service.remove(1)).toBe(result);
    });

    it('should throw error if board not found for removal', async () => {
      boardRepo.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
