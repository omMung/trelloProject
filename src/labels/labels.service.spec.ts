import { Test, TestingModule } from '@nestjs/testing';
import { LabelsService } from './labels.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('LabelsService', () => {
  let service: LabelsService;
  let labelRepository: Repository<Label>;

  const mockLabelRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LabelsService,
        {
          provide: getRepositoryToken(Label),
          useValue: mockLabelRepository,
        },
      ],
    }).compile();

    service = module.get<LabelsService>(LabelsService);
    labelRepository = module.get<Repository<Label>>(getRepositoryToken(Label));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('유효한 색상 코드와 데이터로 라벨을 생성해야 함', async () => {
      const userId = 1;
      const title = 'Bug';
      const color = '#ff0000';
      const boardId = 1;
      const mockLabel = { id: 1, title, color, boardId };

      mockLabelRepository.create.mockReturnValue(mockLabel);
      mockLabelRepository.save.mockResolvedValue(mockLabel);

      const result = await service.create(userId, title, color, boardId);

      expect(labelRepository.create).toHaveBeenCalledWith({
        title,
        color,
        boardId,
      });
      expect(labelRepository.save).toHaveBeenCalledWith(mockLabel);
      expect(result).toEqual(mockLabel);
    });

    it('유효하지 않은 색상 코드로 라벨 생성 시 BadRequestException을 던져야 함', async () => {
      const userId = 1;
      const title = 'Bug';
      const invalidColor = 'invalidColor';
      const boardId = 1;

      await expect(
        service.create(userId, title, invalidColor, boardId),
      ).rejects.toThrow(BadRequestException);
      expect(labelRepository.create).not.toHaveBeenCalled();
      expect(labelRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('모든 라벨을 조회해야 함', async () => {
      const mockLabels = [
        { id: 1, title: 'Bug', color: '#ff0000', boardId: 1 },
        { id: 2, title: 'Feature', color: '#00ff00', boardId: 1 },
      ];

      mockLabelRepository.find.mockResolvedValue(mockLabels);

      const result = await service.findAll();

      expect(labelRepository.find).toHaveBeenCalled();
      expect(result).toEqual(mockLabels);
    });
  });

  describe('findOne', () => {
    it('ID로 특정 라벨을 조회해야 함', async () => {
      const labelId = 1;
      const mockLabel = {
        id: labelId,
        title: 'Bug',
        color: '#ff0000',
        boardId: 1,
      };

      mockLabelRepository.findOneBy.mockResolvedValue(mockLabel);

      const result = await service.findOne(labelId);

      expect(labelRepository.findOneBy).toHaveBeenCalledWith({ id: labelId });
      expect(result).toEqual(mockLabel);
    });

    it('존재하지 않는 ID로 조회 시 NotFoundException을 던져야 함', async () => {
      const labelId = 999;

      mockLabelRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(labelId)).rejects.toThrow(NotFoundException);
      expect(labelRepository.findOneBy).toHaveBeenCalledWith({ id: labelId });
    });
  });

  describe('update', () => {
    it('ID와 DTO로 라벨을 업데이트해야 함', async () => {
      const labelId = 1;
      const updateLabelDto = { title: 'Critical Bug', color: '#ff0000' };
      const mockLabel = {
        id: labelId,
        title: 'Bug',
        color: '#ff0000',
        boardId: 1,
      };

      mockLabelRepository.findOneBy.mockResolvedValue(mockLabel);
      mockLabelRepository.save.mockResolvedValue({
        ...mockLabel,
        ...updateLabelDto,
      });

      const result = await service.update(labelId, updateLabelDto);

      expect(labelRepository.findOneBy).toHaveBeenCalledWith({ id: labelId });
      expect(labelRepository.save).toHaveBeenCalledWith({
        ...mockLabel,
        ...updateLabelDto,
      });
      expect(result).toEqual({ ...mockLabel, ...updateLabelDto });
    });

    it('존재하지 않는 ID로 업데이트 시 NotFoundException을 던져야 함', async () => {
      const labelId = 999;
      const updateLabelDto = { title: 'Critical Bug', color: '#ff0000' };

      mockLabelRepository.findOneBy.mockResolvedValue(null);

      await expect(service.update(labelId, updateLabelDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(labelRepository.findOneBy).toHaveBeenCalledWith({ id: labelId });
      expect(labelRepository.save).not.toHaveBeenCalled();
    });

    it('유효하지 않은 색상 코드로 업데이트 시 BadRequestException을 던져야 함', async () => {
      const labelId = 1;
      const updateLabelDto = { title: 'Critical Bug', color: 'invalidColor' };
      const mockLabel = {
        id: labelId,
        title: 'Bug',
        color: '#ff0000',
        boardId: 1,
      };

      mockLabelRepository.findOneBy.mockResolvedValue(mockLabel);

      await expect(service.update(labelId, updateLabelDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(labelRepository.findOneBy).toHaveBeenCalledWith({ id: labelId });
      expect(labelRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('ID로 라벨을 삭제해야 함', async () => {
      const labelId = 1;
      const mockLabel = {
        id: labelId,
        title: 'Bug',
        color: '#ff0000',
        boardId: 1,
      };

      mockLabelRepository.findOneBy.mockResolvedValue(mockLabel);
      mockLabelRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(labelId);

      expect(labelRepository.findOneBy).toHaveBeenCalledWith({ id: labelId });
      expect(labelRepository.delete).toHaveBeenCalledWith(labelId);
      expect(result).toEqual({ message: '라벨이 성공적으로 삭제되었습니다.' });
    });

    it('존재하지 않는 ID로 삭제 시 NotFoundException을 던져야 함', async () => {
      const labelId = 999;

      mockLabelRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove(labelId)).rejects.toThrow(NotFoundException);
      expect(labelRepository.findOneBy).toHaveBeenCalledWith({ id: labelId });
      expect(labelRepository.delete).not.toHaveBeenCalled();
    });
  });
});
