import { Test, TestingModule } from '@nestjs/testing';
import { CheckitemsController } from './checkitems.controller';
import { CheckitemsService } from './checkitems.service';
import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { CheckItem } from './entities/checkitem.entity';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CheckitemsController', () => {
  let controller: CheckitemsController;
  let service: CheckitemsService;

  const mockCheckItemService = {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckitemsController],
      providers: [
        {
          provide: CheckitemsService,
          useValue: mockCheckItemService,
        },
      ],
    }).compile();

    controller = module.get<CheckitemsController>(CheckitemsController);
    service = module.get<CheckitemsService>(CheckitemsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('체크리스트 항목 생성', async () => {
      const createCheckitemDto: CreateCheckitemDto = {
        checkListId: 1,
        title: 'Test Check Item',
      };
      const mockCheckItem = { id: 1, ...createCheckitemDto };

      mockCheckItemService.create.mockResolvedValue(mockCheckItem);

      const result = await controller.create(createCheckitemDto);
      expect(result).toEqual(mockCheckItem);
      expect(mockCheckItemService.create).toHaveBeenCalledWith(
        createCheckitemDto,
      );
    });
  });

  describe('update', () => {
    it('체크리스트 항목 수정', async () => {
      const id = 1;
      const updateCheckitemDto: UpdateCheckitemDto = {
        checklistId: 1,
        title: 'Updated Check Item',
        status: true,
        position: 1,
        memberId: 2,
      };
      const mockCheckItem = { id, checkListId: 1, title: 'Old Check Item' };

      mockCheckItemService.update.mockResolvedValue({
        ...mockCheckItem,
        ...updateCheckitemDto,
      });

      const result = await controller.update(id, updateCheckitemDto);
      expect(result).toEqual({ ...mockCheckItem, ...updateCheckitemDto });
      expect(mockCheckItemService.update).toHaveBeenCalledWith(
        id,
        updateCheckitemDto,
      );
    });

    it('존재하지 않는 체크리스트 항목', async () => {
      const id = 999;
      const updateCheckitemDto: UpdateCheckitemDto = {
        checklistId: 1,
        title: 'Updated Check Item',
        status: true,
        position: 1,
        memberId: 2,
      };

      mockCheckItemService.update.mockRejectedValue(
        new NotFoundException('체크리스트 항목을 찾을 수 없습니다.'),
      );

      await expect(controller.update(id, updateCheckitemDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('일치하지 않는 체크리스트 아이디', async () => {
      const id = 1;
      const updateCheckitemDto: UpdateCheckitemDto = {
        checklistId: 2,
        title: 'Updated Check Item',
        status: true,
        position: 1,
        memberId: 2,
      };

      mockCheckItemService.update.mockRejectedValue(
        new BadRequestException('체크리스트의 ID가 일치하지 않습니다.'),
      );

      await expect(controller.update(id, updateCheckitemDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('체크리스트 항목 삭제', async () => {
      const id = 1;
      const updateCheckitemDto: UpdateCheckitemDto = {
        checklistId: 1,
        title: 'Updated Check Item',
        status: true,
        position: 1,
        memberId: 2,
      };

      mockCheckItemService.remove.mockResolvedValue(undefined);

      await controller.remove(id, updateCheckitemDto);
      expect(mockCheckItemService.remove).toHaveBeenCalledWith(
        id,
        updateCheckitemDto,
      );
    });

    it('존재하지 않는 체크리스트', async () => {
      const id = 999;
      const updateCheckitemDto: UpdateCheckitemDto = {
        checklistId: 1,
        title: 'Updated Check Item',
        status: true,
        position: 1,
        memberId: 2,
      };

      mockCheckItemService.remove.mockRejectedValue(
        new NotFoundException('항목이 없어용.'),
      );

      await expect(controller.remove(id, updateCheckitemDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('일치하지 않는 체크리스트 아이디', async () => {
      const id = 1;
      const updateCheckitemDto: UpdateCheckitemDto = {
        checklistId: 2,
        title: 'Updated Check Item',
        status: true,
        position: 1,
        memberId: 2,
      };

      mockCheckItemService.remove.mockRejectedValue(
        new BadRequestException('체크리스트의 ID가 일치하지 않습니다.'),
      );

      await expect(controller.remove(id, updateCheckitemDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
