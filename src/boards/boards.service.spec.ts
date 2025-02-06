import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { List } from '../lists/entities/list.entity';
import { Card } from '../cards/entities/card.entity';
import { Member } from '../members/entities/member.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { visibEnum } from './dto/visibility.enum';

describe('BoardsService', () => {
  let service: BoardsService;
  let boardRepository: Repository<Board>;
  let listRepository: Repository<List>;
  let cardRepository: Repository<Card>;
  let memberRepository: Repository<Member>;

  const mockBoardRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockListRepository = { find: jest.fn() };
  const mockCardRepository = { find: jest.fn() };
  const mockMemberRepository = { create: jest.fn(), save: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        { provide: getRepositoryToken(Board), useValue: mockBoardRepository },
        { provide: getRepositoryToken(List), useValue: mockListRepository },
        { provide: getRepositoryToken(Card), useValue: mockCardRepository },
        { provide: getRepositoryToken(Member), useValue: mockMemberRepository },
      ],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
    boardRepository = module.get<Repository<Board>>(getRepositoryToken(Board));
    listRepository = module.get<Repository<List>>(getRepositoryToken(List));
    cardRepository = module.get<Repository<Card>>(getRepositoryToken(Card));
    memberRepository = module.get<Repository<Member>>(getRepositoryToken(Member));
  });

  it('서비스가 정의가 되어야 함', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('보드를 성공적으로 생성해야 함', async () => {
      const createBoardDto = { title: 'Test Board', visibility: visibEnum.PUBLIC, color: '#FF5733' };
      const userId = 1;
      const newBoard = { id: 1, ...createBoardDto, userId };
      const newMember = { userId, boardId: newBoard.id };

      mockBoardRepository.create.mockReturnValue(newBoard);
      mockBoardRepository.save.mockResolvedValue(newBoard);
      mockMemberRepository.create.mockReturnValue(newMember);
      mockMemberRepository.save.mockResolvedValue(newMember);

      const result = await service.create(userId, createBoardDto);
      expect(result).toEqual({ message: '보드를 성공적으로 생성했습니다.' });
      expect(mockBoardRepository.create).toHaveBeenCalledWith({ userId, ...createBoardDto });
      expect(mockBoardRepository.save).toHaveBeenCalledWith(newBoard);
      expect(mockMemberRepository.create).toHaveBeenCalledWith({ userId, boardId: newBoard.id });
      expect(mockMemberRepository.save).toHaveBeenCalledWith(newMember);
    });

    it('유효하지 않은 색상 코드가 주어지면 에러를 던져야 함', async () => {
      const createBoardDto = { title: 'Invalid Color', visibility: visibEnum.PUBLIC, color: 'INVALID' };
      const userId = 1;

      await expect(service.create(userId, createBoardDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('보드를 성공적으로 조회해야 함', async () => {
      const userId = 1;
      const allBoards = [{ id: 1, visibility: visibEnum.PUBLIC, color: '#FFFFFF', title: 'Board 1' }];

      mockBoardRepository.find.mockResolvedValue(allBoards);

      const result = await service.findAll(userId);
      expect(result).toEqual({ message: '모든 보드를 성공적으로 조회했습니다.', data: allBoards });
      expect(mockBoardRepository.find).toHaveBeenCalledWith({
        where: [{ visibility: visibEnum.PUBLIC }, { userId }],
        select: ['id', 'visibility', 'color', 'title'],
      });
    });
  });

  describe('findOne', () => {
    it('보드를 상세 조회해야 함', async () => {
      const userId = 1;
      const boardId = 1;
      const board = { id: boardId, visibility: visibEnum.PUBLIC, color: '#FFFFFF', title: 'Board 1' };
      const lists = [{ id: 1, boardId, position: 1, title: 'List 1' }];
      const cards = [{ id: 1, listId: 1, title: 'Card 1', position: 1, color: '#000000', description: 'Test Card' }];

      mockBoardRepository.findOne.mockResolvedValue(board);
      mockListRepository.find.mockResolvedValue(lists);
      mockCardRepository.find.mockResolvedValue(cards);

      const result = await service.findOne(userId, boardId);
      expect(result).toEqual({
        message: '하나의 보드를 성공적으로 조회했습니다.',
        data: { ...board, lists: [{ ...lists[0], cards: [cards[0]] }] },
      });
    });

    it('존재하지 않는 보드는 에러를 던져야 함', async () => {
      mockBoardRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(1, 999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('보드를 성공적으로 수정해야 함', async () => {
      const userId = 1;
      const boardId = 1;
      const updateBoardDto = { title: 'Updated Board', visibility: visibEnum.PRIVATE, color: '#123456' };
      const updatedBoard = { id: boardId, userId, ...updateBoardDto };

      mockBoardRepository.findOne.mockResolvedValue(updatedBoard);
      mockBoardRepository.update.mockResolvedValue(undefined);
      mockBoardRepository.findOne.mockResolvedValue(updatedBoard);

      const result = await service.update(userId, boardId, updateBoardDto);
      expect(result).toEqual({ message: '보드를 성공적으로 수정했습니다.', data: updatedBoard });
    });

    it('존재하지 않는 보드는 수정할 수 없음', async () => {
      mockBoardRepository.findOne.mockResolvedValue(null);
      await expect(service.update(1, 999, { title: 'New Title', visibility: visibEnum.PUBLIC, color: '#000000' }))
        .rejects.toThrow(NotFoundException);
    });

    it('유효하지 않은 색상 코드가 주어지면 에러를 던져야 함', async () => {
      const updateBoardDto = { title: 'Invalid Color', visibility: visibEnum.PUBLIC, color: 'INVALID' };
      const userId = 1;
      const boardId = 1;

      await expect(service.update(boardId, userId, updateBoardDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('보드를 성공적으로 삭제해야 함', async () => {
      const userId = 1;
      const boardId = 1;
      const board = { id: boardId, userId };

      mockBoardRepository.findOne.mockResolvedValue(board);
      mockBoardRepository.remove.mockResolvedValue(undefined);

      const result = await service.remove(userId, boardId);
      expect(result).toEqual({ message: '보드를 성공적으로 삭제했습니다.' });
    });

    it('존재하지 않는 보드는 삭제할 수 없음', async () => {
      mockBoardRepository.findOne.mockResolvedValue(null);
      await expect(service.remove(1, 999)).rejects.toThrow(NotFoundException);
    });
  });
});
