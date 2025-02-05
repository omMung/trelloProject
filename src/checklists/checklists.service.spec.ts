import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistsService } from './checklists.service';
import { Repository } from 'typeorm';
import { CheckList } from './entities/checklist.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateChecklistDto } from './dto/update-checklist.dto';

describe('ChecklistsService', () => {
  let service: ChecklistsService;
  let repository: Repository<CheckList>;

  const mockChecklistRepository = {
    find: jest.fn(),
    findBy: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChecklistsService,
        {
          provide: getRepositoryToken(CheckList),
          useValue: mockChecklistRepository,
        },
      ],
    }).compile();

    service = module.get<ChecklistsService>(ChecklistsService);
    repository = module.get<Repository<CheckList>>(
      getRepositoryToken(CheckList),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  describe('create', () => {
    it('체크리스트 생성 성공', async () => {
      const createChecklistDto: CreateChecklistDto = {
        cardId: 1,
        title: 'Test Checklist',
      };
      const mockCards = [{ position: 1 }, { position: 2 }];

      mockChecklistRepository.find.mockResolvedValue(mockCards);
      mockChecklistRepository.create.mockReturnValue({
        ...createChecklistDto,
        position: 3,
      });
      mockChecklistRepository.save.mockResolvedValue({
        ...createChecklistDto,
        position: 3,
      });

      const result = await service.create(createChecklistDto);
      expect(result).toEqual({ ...createChecklistDto, position: 3 });
      expect(mockChecklistRepository.find).toHaveBeenCalledWith({
        where: { cardId: 1 },
        select: ['position'],
      });
      expect(mockChecklistRepository.create).toHaveBeenCalledWith({
        ...createChecklistDto,
        position: 3,
      });
      expect(mockChecklistRepository.save).toHaveBeenCalledWith({
        ...createChecklistDto,
        position: 3,
      });
    });

    it('서버 오류 발생', async () => {
      const createChecklistDto: CreateChecklistDto = {
        cardId: 1,
        title: 'Test Checklist',
      };

      mockChecklistRepository.find.mockRejectedValue(new Error());

      await expect(service.create(createChecklistDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findAllByCardId', () => {
    it('모든 체크리스트 조회', async () => {
      const { cardId, title, position } = {
        cardId: 1,
        title: 'Test Checklist',
        position: 1,
      };
      const mockChecklists = [
        { id: 1, cardId: 1, title: 'Checklist 1' },
        { id: 2, cardId: 1, title: 'Checklist 2' },
      ];

      mockChecklistRepository.findBy.mockResolvedValue(mockChecklists);

      const result = await service.findAllByCardId({ cardId, title, position });
      expect(result).toEqual(mockChecklists);
    });
  });

  describe('update', () => {
    it('체크리스트 수정', async () => {
      const updateChecklistDto: UpdateChecklistDto = {
        cardId: 1,
        title: 'Updated Checklist',
        position: 2,
      };
      const checklist = {
        id: 1,
        cardId: 1,
        title: 'Old Checklist',
        position: 1,
      };

      mockChecklistRepository.findOneBy.mockResolvedValue(checklist);
      mockChecklistRepository.save.mockResolvedValue({
        ...checklist,
        ...updateChecklistDto,
      });

      const result = await service.update(1, updateChecklistDto);
      expect(result).toEqual({ ...checklist, ...updateChecklistDto });
    });

    it('존재하지 않는 체크리스트', async () => {
      const updateChecklistDto: UpdateChecklistDto = {
        cardId: 1,
        title: 'Updated Checklist',
        position: 2,
      };

      mockChecklistRepository.findOneBy.mockResolvedValue(null);

      await expect(service.update(1, updateChecklistDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('리퀘스트 바디로 가져온 카드 아이디에 속하지 않은 체크리스트', async () => {
      const updateChecklistDto: UpdateChecklistDto = {
        cardId: 2,
        title: 'Updated Checklist',
        position: 2,
      };
      const checklist = { id: 1, cardId: 1, title: 'Old Checklist' };

      mockChecklistRepository.findOneBy.mockResolvedValue(checklist);

      await expect(service.update(1, updateChecklistDto)).rejects.toThrow(
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
      const checklist = { id: 1, cardId: 1, title: 'Checklist' };

      mockChecklistRepository.findOneBy.mockResolvedValue(checklist);
      mockChecklistRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1, updateChecklistDto);
      expect(mockChecklistRepository.delete).toHaveBeenCalledWith({ id: 1 });
    });

    it('존재하지 않는 체크리스트', async () => {
      const updateChecklistDto: UpdateChecklistDto = {
        cardId: 1,
        title: 'Checklist',
        position: 1,
      };

      mockChecklistRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove(1, updateChecklistDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('리퀘스트 바디로 가져온 카드 아이디에 속하지 않은 체크리스트', async () => {
      const updateChecklistDto: UpdateChecklistDto = {
        cardId: 2,
        title: 'Checklist',
        position: 1,
      };
      const checklist = { id: 1, cardId: 1, title: 'Checklist' };

      mockChecklistRepository.findOneBy.mockResolvedValue(checklist);

      await expect(service.remove(1, updateChecklistDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
