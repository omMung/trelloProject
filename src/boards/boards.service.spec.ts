import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { List } from '../lists/entities/list.entity';
import { Card } from '../cards/entities/card.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { visibEnum } from './dto/visibility.enum'

describe('BoardsService', () => {
  let service: BoardsService;

  const mockBoardRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockListRepository = {
    find: jest.fn(),
  };

  const mockCardRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        {
          provide: getRepositoryToken(Board),
          useValue: mockBoardRepository,
        },
        {
          provide: getRepositoryToken(List),
          useValue: mockListRepository,
        },
        {
          provide: getRepositoryToken(Card),
          useValue: mockCardRepository,
        },
      ],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
  });

  describe('create', () => {
    test('보드를 성공적으로 생성할 수 있어야 한다', async () => {
      mockBoardRepository.create.mockReturnValue({ id: 1 });
      mockBoardRepository.save.mockResolvedValue({ id: 1 });

      expect(await service.create(1, { title: 'Test Board', visibility: visibEnum.PUBLIC, color: '#FFFFFF' }))
        .toEqual({ message: '보드를 성공적으로 생성했습니다.' });
    });

    test('유효하지 않은 색상 코드일 경우 BadRequestException이 발생해야 한다', async () => {
      await expect(service.create(1, { title: 'Test Board', visibility: visibEnum.PUBLIC, color: 'invalid' }))
        .rejects
        .toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    test('모든 보드를 성공적으로 조회할 수 있어야 한다', async () => {
      mockBoardRepository.find.mockResolvedValue([{ id: 1, title: 'Test', visibility: visibEnum.PUBLIC, color: '#FFFFFF' }]);
      
      const result = { message: '모든 보드를 성공적으로 조회했습니다', data: [{ id: 1, title: 'Test', visibility: visibEnum.PUBLIC, color: '#FFFFFF' }] };
      expect(await service.findAll(1)).toEqual(result);
    });
  });

  describe('findOne', () => {
    test('하나의 보드를 성공적으로 조회할 수 있어야 한다', async () => {
      mockBoardRepository.findOne.mockResolvedValue({ id: 1, title: 'Test', visibility: visibEnum.PUBLIC, color: '#FFFFFF' });
      mockListRepository.find.mockResolvedValue([]);
      mockCardRepository.find.mockResolvedValue([]);

      const result = {
        message: '하나의 보드를 성공적으로 조회했습니다',
        data: { id: 1, title: 'Test', visibility: visibEnum.PUBLIC, color: '#FFFFFF', lists: [] },
      };

      expect(await service.findOne(1, 1)).toEqual(result);
    });

    test('존재하지 않는 보드일 경우 NotFoundException이 발생해야 한다', async () => {
      mockBoardRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(1, 999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    test('보드를 성공적으로 수정할 수 있어야 한다', async () => {
      mockBoardRepository.findOne.mockResolvedValue({ id: 1, title: 'Test', visibility: visibEnum.PUBLIC, color: '#FFFFFF' });
      mockBoardRepository.update.mockResolvedValue({ affected: 1 });

      const result = { message: '보드를 성공적으로 수정했습니다', data: { id: 1, title: 'Updated Title' } };
      expect(await service.update(1, 1, { title: 'Updated Title', visibility: visibEnum.PUBLIC, color: '#FFFFFF' })).toEqual(result);
    });

    test('수정할 보드를 찾을 수 없을 경우 NotFoundException이 발생해야 한다', async () => {
      mockBoardRepository.findOne.mockResolvedValue(null);
      await expect(service.update(1, 999, { title: 'Updated Title', visibility: visibEnum.PUBLIC, color: '#FFFFFF' }))
        .rejects
        .toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    test('보드를 성공적으로 삭제할 수 있어야 한다', async () => {
      mockBoardRepository.findOne.mockResolvedValue({ id: 1, title: 'Test', visibility: visibEnum.PUBLIC, color: '#FFFFFF' });
      mockBoardRepository.remove.mockResolvedValue({});

      const result = { message: '보드를 성공적으로 삭제했습니다' };
      expect(await service.remove(1, 1)).toEqual(result);
    });

    test('삭제할 보드를 찾을 수 없을 경우 NotFoundException이 발생해야 한다', async () => {
      mockBoardRepository.findOne.mockResolvedValue(null);
      await expect(service.remove(1, 999)).rejects.toThrow(NotFoundException);
    });
  });
});
