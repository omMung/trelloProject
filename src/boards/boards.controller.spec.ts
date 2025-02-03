import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { visibEnum } from './dto/visibility.enum';

describe('BoardsController', () => {
  let controller: BoardsController;
  let service: BoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [
        {
          provide: BoardsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
    service = module.get<BoardsService>(BoardsService);
  });

  describe('create', () => {
    it('should successfully create a board', async () => {
      const createBoardDto: CreateBoardDto = {
        userId: 1,
        title: 'New Board',
        visibility: visibEnum.PUBLIC,
        color: 'blue',
      };
      const result = { message: '보드를 성공적으로 생성했습니다.' };

      service.create = jest.fn().mockResolvedValue(result);

      expect(await controller.create(createBoardDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should successfully fetch all boards', async () => {
      const result = {
        message: '모든 보드를 성공적으로 조회했습니다',
        data: [{ id: 1, title: 'Board 1', visibility: 'private', color: 'blue' }],
      };

      service.findAll = jest.fn().mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should successfully fetch a board', async () => {
      const result = {
        message: '하나의 보드를 성공적으로 조회했습니다',
        data: { id: 1, title: 'Board 1', visibility: 'private', color: 'blue' },
      };

      service.findOne = jest.fn().mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should successfully update a board', async () => {
      const updateBoardDto: UpdateBoardDto = {
        title: 'Updated Board',
        visibility: visibEnum.PRIVATE,
        color: 'red',
      };
      const result = {
        message: '보드를 성공적으로 수정했습니다',
        data: { id: 1, title: 'Updated Board', visibility: 'public', color: 'red' },
      };

      service.update = jest.fn().mockResolvedValue(result);

      expect(await controller.update('1', updateBoardDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should successfully remove a board', async () => {
      const result = { message: '보드를 성공적으로 삭제했습니다' };

      service.remove = jest.fn().mockResolvedValue(result);

      expect(await controller.remove('1')).toBe(result);
    });
  });
});
