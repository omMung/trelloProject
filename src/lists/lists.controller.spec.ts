// src/lists/lists.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { UpdateListPositionsDto } from './dto/update-list-positions.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

describe('ListsController', () => {
  let controller: ListsController;
  let service: ListsService;

  const mockListsService = {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    updatePositions: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListsController],
      providers: [
        {
          provide: ListsService,
          useValue: mockListsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ListsController>(ListsController);
    service = module.get<ListsService>(ListsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('리스트 생성 테스트', async () => {
      const createListDto: CreateListDto = {
        boardId: 1,
        title: 'New List',
      };

      const result = { id: 1, boardId: 1, title: 'New List', position: 1 };

      mockListsService.create.mockResolvedValue(result);

      const dummyReq = { user: { id: 1 } };

      const response = await controller.create(createListDto, dummyReq);

      expect(service.create).toHaveBeenCalledWith(createListDto, dummyReq);
      expect(response).toEqual(result);
    });
  });

  describe('update', () => {
    it('리스트 업데이트 테스트', async () => {
      const id = '1';
      const updateListDto: UpdateListDto = {
        boardId: 1,
        title: '수정된 리스트 제목',
      };

      const result = {
        id: 1,
        boardId: 1,
        title: '수정된 리스트 제목',
        position: 1,
      };

      mockListsService.update.mockResolvedValue(result);

      const dummyReq = { user: { id: 1 } };

      const response = await controller.update(id, updateListDto, dummyReq);

      expect(service.update).toHaveBeenCalledWith(1, updateListDto, dummyReq);
      expect(response).toEqual(result);
    });
  });

  describe('remove', () => {
    it('리스트 삭제 테스트', async () => {
      const id = '1';
      const updateListDto: UpdateListDto = {
        boardId: 1,
        title: '수정된 리스트 제목',
      };
      mockListsService.remove.mockResolvedValue(undefined);

      const dummyReq = { user: { id: 1 } };

      const response = await controller.remove(id, updateListDto, dummyReq);

      expect(service.remove).toHaveBeenCalledWith(1, updateListDto, dummyReq);
      expect(response).toBeUndefined();
    });
  });

  describe('updatePositions', () => {
    it('리스트 포지션 업데이트 테스트', async () => {
      const updateListPositionsDto: UpdateListPositionsDto = {
        boardId: 1,
        lists: [
          { id: 1, position: 1 },
          { id: 2, position: 2 },
          { id: 3, position: 3 },
        ],
      };

      mockListsService.updatePositions.mockResolvedValue(undefined);

      const dummyReq = { user: { id: 1 } };

      const response = await controller.updatePositions(
        updateListPositionsDto,
        dummyReq,
      );

      expect(service.updatePositions).toHaveBeenCalledWith(
        updateListPositionsDto,
        dummyReq,
      );
      expect(response).toEqual({
        message: '리스트 위치가 성공적으로 업데이트되었습니다.',
      });
    });
  });
});
