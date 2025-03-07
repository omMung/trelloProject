import { Test, TestingModule } from '@nestjs/testing';
import { CheckitemsService } from './checkitems.service';
import { Check, Repository } from 'typeorm';
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
    it('존재하지 않는 체크리스트 ID로 체크리스트 항목 생성 시 NotFoundException 발생', async () => {
      const createCheckitemDto = {
        checkListId: 999, // 존재하지 않는 체크리스트 ID
        title: 'Test Check Item',
      };

      // 체크리스트가 존재하지 않는 경우를 mock 처리
      jest.spyOn(checklistsService, 'exists').mockResolvedValue(false);

      await expect(service.create(createCheckitemDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('존재하는 체크리스트 ID로 체크리스트 항목 생성', async () => {
      const createCheckitemDto = {
        checkListId: 1, // 존재하는 체크리스트 ID
        title: 'Valid Check Item',
      };
      const mockCheckItems = [
        {
          id: 1,
          checkListId: 1,
          title: '항목 1',
          position: 1,
          status: false,
          memberId: 1,
          //checkList: { id: 1, cardId: 1, position: 1, title: '테스트' },
        },
        {
          id: 2,
          checkListId: 1,
          title: '항목 2',
          position: 2,
          status: false,
          memberId: 2,
          //checkList: { id: 1, cardId: 1, position: 1, title: '테스트' },
        },
      ] as CheckItem[];

      // 체크리스트가 존재하는 경우를 mock 처리
      jest.spyOn(checklistsService, 'exists').mockResolvedValue(true);
      jest
        .spyOn(mockCheckItemRepository, 'find')
        .mockResolvedValue(mockCheckItems);
      jest
        .spyOn(mockCheckItemRepository, 'create')
        .mockReturnValue(mockCheckItems[0]);
      jest
        .spyOn(mockCheckItemRepository, 'save')
        .mockResolvedValue(mockCheckItems[0]);

      const result = await service.create(createCheckitemDto);
      expect(result).toEqual(mockCheckItems[0]);
      expect(mockCheckItemRepository.find).toHaveBeenCalledWith({
        where: { checkListId: 1 },
        select: ['position'],
      });
      expect(mockCheckItemRepository.create).toHaveBeenCalledWith({
        checkListId: 1,
        title: 'Valid Check Item',
        position: 3,
      });
      expect(mockCheckItemRepository.save).toHaveBeenCalledWith(
        mockCheckItems[0],
      );
    });
  });

  describe('update', () => {
    it('존재하지 않는 체크리스트 항목 ID로 업데이트 시 NotFoundException 발생', async () => {
      const updateCheckitemDto = {
        checklistId: 1,
        title: 'Updated Title',
        status: true,
        position: 5,
        memberId: 5,
      };

      jest.spyOn(mockCheckItemRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.update(999, updateCheckitemDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('체크리스트 ID 불일치 시 BadRequestException 발생', async () => {
      const updateCheckitemDto = {
        checklistId: 2, // 불일치하는 체크리스트 ID
        title: 'Updated Title',
        status: true,
        position: 5,
        memberId: 5,
      };
      const mockCheckItem = {
        id: 1,
        checkListId: 1,
        title: 'Old Title',
        status: false,
        position: 1,
        memberId: null,
      } as CheckItem;

      jest
        .spyOn(mockCheckItemRepository, 'findOneBy')
        .mockResolvedValue(mockCheckItem);

      await expect(service.update(1, updateCheckitemDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('체크리스트 항목 업데이트 성공', async () => {
      const updateCheckitemDto = {
        checklistId: 1,
        title: 'Updated Title',
        status: true,
        position: 5,
        memberId: 5,
      };
      const mockCheckItem = {
        id: 1,
        checkListId: 1,
        title: 'Old Title',
        status: false,
        position: 1,
        memberId: null,
      } as CheckItem;

      jest
        .spyOn(mockCheckItemRepository, 'findOneBy')
        .mockResolvedValue(mockCheckItem);
      jest
        .spyOn(mockCheckItemRepository, 'save')
        .mockResolvedValue(mockCheckItem);

      const result = await service.update(1, updateCheckitemDto);
      expect(result).toEqual(mockCheckItem);
      expect(mockCheckItemRepository.save).toHaveBeenCalledWith(mockCheckItem);
    });
  });

  describe('remove', () => {
    it('존재하지 않는 체크리스트 항목 ID로 삭제 시 NotFoundException 발생', async () => {
      jest.spyOn(mockCheckItemRepository, 'findOneBy').mockResolvedValue(null);

      await expect(
        service.remove(999, {
          checklistId: 1,
          title: 'Updated Title',
          status: true,
          position: 5,
          memberId: 5,
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('체크리스트 ID 불일치 시 BadRequestException 발생', async () => {
      const mockCheckItem = {
        id: 1,
        checkListId: 1,
        title: 'Old Title',
        status: false,
        position: 1,
        memberId: null,
      } as CheckItem;

      jest
        .spyOn(mockCheckItemRepository, 'findOneBy')
        .mockResolvedValue(mockCheckItem);

      await expect(
        service.remove(1, {
          checklistId: 2,
          title: 'Old Title',
          status: false,
          position: 1,
          memberId: null,
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('체크리스트 항목 삭제 성공', async () => {
      const mockCheckItem = {
        id: 1,
        checkListId: 1,
        title: 'Old Title',
        status: false,
        position: 1,
        memberId: null,
      } as CheckItem;

      jest
        .spyOn(mockCheckItemRepository, 'findOneBy')
        .mockResolvedValue(mockCheckItem);
      jest
        .spyOn(mockCheckItemRepository, 'remove')
        .mockResolvedValue(undefined);

      await expect(
        service.remove(1, {
          checklistId: 1,
          title: 'Old Title',
          status: false,
          position: 1,
          memberId: null,
        }),
      ).resolves.toBeUndefined();
      expect(mockCheckItemRepository.remove).toHaveBeenCalledWith(
        mockCheckItem,
      );
    });
  });
});
