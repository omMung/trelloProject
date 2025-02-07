import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistsController } from './checklists.controller';
import { ChecklistsService } from './checklists.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { CheckList } from './entities/checklist.entity';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ChecklistsController', () => {
  let controller: ChecklistsController;
  let service: ChecklistsService;

  const mockChecklistService = {
    create: jest.fn(),
    findAllByCardId: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChecklistsController],
      providers: [
        {
          provide: ChecklistsService,
          useValue: mockChecklistService,
        },
      ],
    }).compile();

    controller = module.get<ChecklistsController>(ChecklistsController);
    service = module.get<ChecklistsService>(ChecklistsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('체크리스트 생성', async () => {
      const createChecklistDto: CreateChecklistDto = {
        cardId: 1,
        title: 'Test Checklist',
      };
      const mockChecklist = { id: 1, ...createChecklistDto, position: 1 };

      mockChecklistService.create.mockResolvedValue(mockChecklist);

      const result = await controller.create(createChecklistDto);
      expect(result).toEqual(mockChecklist);
      expect(mockChecklistService.create).toHaveBeenCalledWith(
        createChecklistDto,
      );
    });
  });

  describe('findAll', () => {
    it('모든 체크리스트 조회', async () => {
      const updateChecklistDto: UpdateChecklistDto = {
        cardId: 1,
        title: 'Test Checklist',
        position: 3,
      };
      const mockChecklists = [
        { id: 1, cardId: 1, title: 'Checklist 1', position: 1 },
        { id: 2, cardId: 1, title: 'Checklist 2', position: 2 },
      ];

      mockChecklistService.findAllByCardId.mockResolvedValue(mockChecklists);

      const result = await controller.findAll(updateChecklistDto);
      expect(result).toEqual(mockChecklists);
      expect(mockChecklistService.findAllByCardId).toHaveBeenCalledWith(
        updateChecklistDto,
      );
    });
  });

  describe('update', () => {
    it('체크리스트 수정', async () => {
      const updateChecklistDto: UpdateChecklistDto = {
        cardId: 1,
        title: 'Updated Checklist',
        position: 2,
      };
      const mockChecklist = {
        id: 1,
        cardId: 1,
        title: 'Old Checklist',
        position: 1,
      };

      mockChecklistService.update.mockResolvedValue({
        ...mockChecklist,
        ...updateChecklistDto,
      });

      const result = await controller.update(1, updateChecklistDto);
      expect(result).toEqual({ ...mockChecklist, ...updateChecklistDto });
      expect(mockChecklistService.update).toHaveBeenCalledWith(
        1,
        updateChecklistDto,
      );
    });

    it('존재하지 않는 체크리스트', async () => {
      const updateChecklistDto: UpdateChecklistDto = {
        cardId: 1,
        title: 'Updated Checklist',
        position: 1,
      };

      mockChecklistService.update.mockRejectedValue(
        new NotFoundException('체크리스트를 찾을 수 없습니다.'),
      );

      await expect(controller.update(1, updateChecklistDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('리퀘스트 바디로 가져온 카드 아이디에 속하지 않은 체크리스트', async () => {
      const updateChecklistDto: UpdateChecklistDto = {
        cardId: 2,
        title: 'Updated Checklist',
        position: 1,
      };

      mockChecklistService.update.mockRejectedValue(
        new BadRequestException('체크리스트의 카드 ID가 일치하지 않습니다.'),
      );

      await expect(controller.update(1, updateChecklistDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('체크리스트 삭제', async () => {
      const updateChecklistDto: UpdateChecklistDto = {
        cardId: 1,
        title: 'Checklist',
        position: 1,
      };

      mockChecklistService.remove.mockResolvedValue(undefined);

      await controller.remove(1, updateChecklistDto);
      expect(mockChecklistService.remove).toHaveBeenCalledWith(
        1,
        updateChecklistDto,
      );
    });

    it('존재하지 않는 체크리스트', async () => {
      const updateChecklistDto: UpdateChecklistDto = {
        cardId: 1,
        title: 'Checklist',
        position: 1,
      };

      mockChecklistService.remove.mockRejectedValue(
        new NotFoundException('체크리스트를 찾을 수 없습니다.'),
      );

      await expect(controller.remove(1, updateChecklistDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('리퀘스트 바디로 가져온 카드 아이디에 속하지 않은 체크리스트', async () => {
      const updateChecklistDto: UpdateChecklistDto = {
        cardId: 2,
        title: 'Checklist',
        position: 1,
      };

      mockChecklistService.remove.mockRejectedValue(
        new BadRequestException('체크리스트의 카드 ID가 일치하지 않습니다.'),
      );

      await expect(controller.remove(1, updateChecklistDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
