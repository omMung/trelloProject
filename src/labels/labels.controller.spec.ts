import { Test, TestingModule } from '@nestjs/testing';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';

describe('LabelsController', () => {
  let controller: LabelsController;
  let service: LabelsService;

  const mockLabelsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabelsController],
      providers: [
        {
          provide: LabelsService,
          useValue: mockLabelsService,
        },
      ],
    }).compile();

    controller = module.get<LabelsController>(LabelsController);
    service = module.get<LabelsService>(LabelsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a label', async () => {
      const dto = { color: '#FFFFFF', title: 'Test Label' };
      mockLabelsService.create.mockResolvedValue(dto);

      const result = await controller.create(dto);
      expect(result).toEqual(dto);
      expect(mockLabelsService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of labels', async () => {
      const result = [{ id: 1, color: '#FFFFFF', title: 'Test Label' }];
      mockLabelsService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(mockLabelsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a label', async () => {
      const label = { id: 1, color: '#FFFFFF', title: 'Test Label' };
      mockLabelsService.findOne.mockResolvedValue(label);

      expect(await controller.findOne('1')).toEqual(label);
      expect(mockLabelsService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a label', async () => {
      const dto = { title: 'Updated Label' };
      const label = { id: 1, color: '#FFFFFF', title: 'Test Label' };
      mockLabelsService.update.mockResolvedValue({ ...label, ...dto });

      expect(await controller.update('1', dto)).toEqual({ ...label, ...dto });
      expect(mockLabelsService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove a label', async () => {
      const result = { message: '라벨이 성공적으로 삭제되었습니다.' };
      mockLabelsService.remove.mockResolvedValue(result);

      expect(await controller.remove('1')).toEqual(result);
      expect(mockLabelsService.remove).toHaveBeenCalledWith(1);
    });
  });
});
