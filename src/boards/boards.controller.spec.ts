import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { visibEnum } from './dto/visibility.enum'

describe('BoardsController', () => {
  let boardsController: BoardsController;
  let boardsService: BoardsService;

  const mockBoardsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [
        { provide: BoardsService, useValue: mockBoardsService },
      ],
    }).compile();

    boardsController = module.get<BoardsController>(BoardsController);
    boardsService = module.get<BoardsService>(BoardsService);
  });

  describe('create', () => {
    test('보드를 성공적으로 생성할 수 있어야 한다', async () => {
      const result = { message: '보드를 성공적으로 생성했습니다.' };
      mockBoardsService.create.mockResolvedValue(result);

      expect(await boardsController.create({ user: { id: 1 } }, { title: 'Test', visibility: visibEnum.PUBLIC, color: '#FFFFFF' }))
        .toEqual(result);
    });

    test('유효하지 않은 색상 코드일 경우 BadRequestException이 발생해야 한다', async () => {
      await expect(boardsController.create({ user: { id: 1 } }, { title: 'Test', visibility: visibEnum.PUBLIC, color: 'invalid' }))
        .rejects
        .toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    test('모든 보드를 성공적으로 조회할 수 있어야 한다', async () => {
      const result = { message: '모든 보드를 성공적으로 조회했습니다', data: [] };
      mockBoardsService.findAll.mockResolvedValue(result);

      expect(await boardsController.findAll({ user: { id: 1 } })).toEqual(result);
    });
  });

  describe('findOne', () => {
    test('하나의 보드를 성공적으로 조회할 수 있어야 한다', async () => {
      const result = {
        message: '하나의 보드를 성공적으로 조회했습니다',
        data: { id: 1, title: 'Test', visibility: visibEnum.PUBLIC, color: '#FFFFFF' },
      };
      mockBoardsService.findOne.mockResolvedValue(result);

      expect(await boardsController.findOne({ user: { id: 1 } }, '1')).toEqual(result);
    });

    test('존재하지 않는 보드일 경우 NotFoundException이 발생해야 한다', async () => {
      mockBoardsService.findOne.mockRejectedValue(new NotFoundException('해당 보드를 상세 조회 할수 없습니다'));
      await expect(boardsController.findOne({ user: { id: 1 } }, '999'))
        .rejects
        .toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    test('보드를 성공적으로 수정할 수 있어야 한다', async () => {
      const result = { message: '보드를 성공적으로 수정했습니다', data: { id: 1, title: 'Updated Title' } };
      mockBoardsService.update.mockResolvedValue(result);

      expect(await boardsController.update({ user: { id: 1 } }, '1', { title: 'Updated Title', visibility: visibEnum.PRIVATE, color: '#FF1212' }))
        .toEqual(result);
    });

    test('수정할 보드를 찾을 수 없을 경우 NotFoundException이 발생해야 한다', async () => {
      mockBoardsService.update.mockRejectedValue(new NotFoundException('보드를 찾을 수 없습니다.'));
      await expect(boardsController.update({ user: { id: 1 } }, '999', { title: 'Updated Title', visibility: visibEnum.PUBLIC, color: '#FFFFFF' }))
        .rejects
        .toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    test('보드를 성공적으로 삭제할 수 있어야 한다', async () => {
      const result = { message: '보드를 성공적으로 삭제했습니다' };
      mockBoardsService.remove.mockResolvedValue(result);

      expect(await boardsController.remove({ user: { id: 1 } }, '1')).toEqual(result);
    });

    test('삭제할 보드를 찾을 수 없을 경우 NotFoundException이 발생해야 한다', async () => {
      mockBoardsService.remove.mockRejectedValue(new NotFoundException('삭제할 대상 보드를 찾을수 없습니다'));
      await expect(boardsController.remove({ user: { id: 1 } }, '999'))
        .rejects
        .toThrow(NotFoundException);
    });
  });
});
