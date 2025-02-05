import { Test, TestingModule } from '@nestjs/testing';
import { CheckitemsService } from './checkitems.service';
import { Repository } from 'typeorm';
import { CheckItem } from './entities/checkitem.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';
import { ChecklistsService } from 'src/checklists/checklists.service';

describe('CheckitemsService', () => {
  let service: CheckitemsService;
  let checklistsService: ChecklistsService;
  let mockCheckItemRepository: Repository<CheckItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckitemsService,
        {
          provide: getRepositoryToken(CheckItem),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: ChecklistsService,
          useValue: {
            exists: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CheckitemsService>(CheckitemsService);
    checklistsService = module.get<ChecklistsService>(ChecklistsService);
    mockCheckItemRepository = module.get<Repository<CheckItem>>(
      getRepositoryToken(CheckItem),
    );
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
      const mockCheckItems = [{ position: 1 }, { position: 2 }];

      mockCheckItemRepository.find.mockResolvedValue(mockCheckItems);
      mockCheckItemRepository.create.mockReturnValue(mockCheckItems[0]);
      mockCheckItemRepository.save.mockResolvedValue(mockCheckItems[0]);

      const result = await service.create(createCheckitemDto);
      expect(result).toEqual(mockCheckItems[0]);
      expect(mockCheckItemRepository.find).toHaveBeenCalledWith({
        where: { checkListId: 1 },
        select: ['position'],
      });
      expect(mockCheckItemRepository.create).toHaveBeenCalledWith({
        checkListId: 1,
        title: 'Test Check Item',
        position: 3,
      });
      expect(mockCheckItemRepository.save).toHaveBeenCalledWith(
        mockCheckItems[0],
      );
    });

    it('존재하지 않는 체크리스트', async () => {
      const createCheckitemDto: CreateCheckitemDto = {
        checkListId: 999,
        title: 'Nonexistent Check Item',
      };
      // 체크리스트가 존재하지 않는 경우를 mock 처리
      jest.spyOn(checklistsService, 'exists').mockResolvedValue(false);

      await expect(service.create(createCheckitemDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('체크리스트 항목 수정', async () => {
      const updateCheckitemDto: UpdateCheckitemDto = {
        checklistId: 1,
        title: 'Updated Check Item',
        status: true,
        position: 1,
        memberId: 2,
      };
      const mockCheckItem = { id: 1, checkListId: 1, title: 'Old Check Item' };

      mockCheckItemRepository.findOneBy.mockResolvedValue(mockCheckItem);
      mockCheckItemRepository.save.mockResolvedValue({
        ...mockCheckItem,
        ...updateCheckitemDto,
      });

      const result = await service.update(mockCheckItem.id, updateCheckitemDto);
      expect(result).toEqual({ ...mockCheckItem, ...updateCheckitemDto });
    });

    it('존재하지 않는 체크리스트 항목', async () => {
      const updateCheckitemDto: UpdateCheckitemDto = {
        checklistId: 1,
        title: 'Updated Check Item',
        status: true,
        position: 1,
        memberId: 2,
      };

      mockCheckItemRepository.findOneBy.mockResolvedValue(null);

      await expect(service.update(999, updateCheckitemDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('일치하지 않는 체크리스트 아이디', async () => {
      const updateCheckitemDto: UpdateCheckitemDto = {
        checklistId: 2,
        title: 'Updated Check Item',
        status: true,
        position: 1,
        memberId: 2,
      };
      const mockCheckItem = { id: 1, checkListId: 1, title: 'Old Check Item' };

      mockCheckItemRepository.findOneBy.mockResolvedValue(mockCheckItem);

      await expect(
        service.update(mockCheckItem.id, updateCheckitemDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('체크리스트 항목 제거', async () => {
      const updateCheckitemDto: UpdateCheckitemDto = {
        checklistId: 1,
        title: 'Updated Check Item',
        status: true,
        position: 1,
        memberId: 2,
      };
      const mockCheckItem = { id: 1, checkListId: 1 };

      mockCheckItemRepository.findOneBy.mockResolvedValue(mockCheckItem);
      mockCheckItemRepository.remove.mockResolvedValue(undefined);

      await service.remove(mockCheckItem.id, updateCheckitemDto);
      expect(mockCheckItemRepository.remove).toHaveBeenCalledWith(
        mockCheckItem,
      );
    });

    it('존재하지 않는 체크리스트 항목', async () => {
      const updateCheckitemDto: UpdateCheckitemDto = {
        checklistId: 1,
        title: 'Updated Check Item',
        status: true,
        position: 1,
        memberId: 2,
      };

      mockCheckItemRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove(999, updateCheckitemDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('일치하지 않는 체크리스트 아이디', async () => {
      const updateCheckitemDto: UpdateCheckitemDto = {
        checklistId: 2,
        title: 'Updated Check Item',
        status: true,
        position: 1,
        memberId: 2,
      };
      const mockCheckItem = { id: 1, checkListId: 1 };

      mockCheckItemRepository.findOneBy.mockResolvedValue(mockCheckItem);

      await expect(
        service.remove(mockCheckItem.id, updateCheckitemDto),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
