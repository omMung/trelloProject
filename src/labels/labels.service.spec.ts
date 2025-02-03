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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('라벨 지정 생성 성공 테스트', async () => {
      const dto = { color: '#FFFFFF', title: 'Test Label' };
      const label = { id: 1, ...dto };
      mockLabelRepository.create.mockReturnValue(label);
      mockLabelRepository.save.mockResolvedValue(label);

      const result = await service.create(dto);
      expect(result).toEqual(label);
      expect(mockLabelRepository.save).toHaveBeenCalledWith(label);
    });

    it('컬러코드 유효성 검사 실패 테스트', async () => {
      const dto = { color: 'invalidColor', title: 'Test Label' };
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of labels', async () => {
      const result = [{ id: 1, color: '#FFFFFF', title: 'Test Label' }];
      mockLabelRepository.find.mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a label', async () => {
      const label = { id: 1, color: '#FFFFFF', title: 'Test Label' };
      mockLabelRepository.findOneBy.mockResolvedValue(label);

      expect(await service.findOne(1)).toEqual(label);
    });

    it('should throw NotFoundException if label does not exist', async () => {
      mockLabelRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a label', async () => {
      const dto = { title: 'Updated Label' };
      const label = { id: 1, color: '#FFFFFF', title: 'Test Label' };
      mockLabelRepository.findOneBy.mockResolvedValue(label);
      mockLabelRepository.save.mockResolvedValue({ ...label, ...dto });

      const result = await service.update(1, dto);
      expect(result).toEqual({ ...label, ...dto });
      expect(mockLabelRepository.save).toHaveBeenCalledWith({
        ...label,
        ...dto,
      });
    });

    it('should throw NotFoundException if label does not exist', async () => {
      const dto = { title: 'Updated Label' };
      mockLabelRepository.findOneBy.mockResolvedValue(null);

      await expect(service.update(1, dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a label', async () => {
      const label = { id: 1 };
      mockLabelRepository.findOneBy.mockResolvedValue(label);
      mockLabelRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);
      expect(result).toEqual({ message: '라벨이 성공적으로 삭제되었습니다.' });
      expect(mockLabelRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if label does not exist', async () => {
      mockLabelRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
