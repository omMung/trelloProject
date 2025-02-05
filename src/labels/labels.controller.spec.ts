import { Test, TestingModule } from '@nestjs/testing';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

  const mockJwtAuthGuard = {
    canActivate: jest.fn().mockImplementation(() => true), // 항상 통과하도록 모의 구현
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
    })
      .overrideGuard(JwtAuthGuard) // JwtAuthGuard를 모의 객체로 대체
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<LabelsController>(LabelsController);
    service = module.get<LabelsService>(LabelsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('라벨 생성', () => {
    it('사용자 ID와 DTO를 받아 새로운 라벨을 생성해야 함', async () => {
      const mockUser = { id: 1 };
      const mockRequest = { user: mockUser };
      const createLabelDto: CreateLabelDto = {
        title: 'Bug',
        color: '#ff0000',
        boardId: 1,
      };
      const expectedResult = {
        id: 1,
        ...createLabelDto,
      };

      mockLabelsService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(mockRequest, createLabelDto);

      expect(service.create).toHaveBeenCalledWith(
        mockUser.id,
        createLabelDto.title,
        createLabelDto.color,
        createLabelDto.boardId,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('모든 라벨 조회', () => {
    it('모든 라벨을 조회해야 함', async () => {
      const expectedLabels = [
        { id: 1, title: 'Bug', color: '#ff0000', boardId: 1 },
        { id: 2, title: 'Feature', color: '#00ff00', boardId: 1 },
      ];
      mockLabelsService.findAll.mockResolvedValue(expectedLabels);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedLabels);
    });
  });

  describe('특정 라벨 조회', () => {
    it('ID를 통해 특정 라벨을 조회해야 함', async () => {
      const labelId = '1';
      const expectedLabel = {
        id: 1,
        title: 'Bug',
        color: '#ff0000',
        boardId: 1,
      };
      mockLabelsService.findOne.mockResolvedValue(expectedLabel);

      const result = await controller.findOne(labelId);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedLabel);
    });
  });

  describe('라벨 수정', () => {
    it('ID와 DTO를 받아 라벨을 수정해야 함', async () => {
      const labelId = '1';
      const updateLabelDto: UpdateLabelDto = {
        title: 'Critical Bug',
        color: '#ff0000',
      };
      const updatedLabel = { id: 1, ...updateLabelDto, boardId: 1 };

      mockLabelsService.update.mockResolvedValue(updatedLabel);

      const result = await controller.update(labelId, updateLabelDto);

      expect(service.update).toHaveBeenCalledWith(1, updateLabelDto);
      expect(result).toEqual(updatedLabel);
    });
  });

  describe('라벨 삭제', () => {
    it('ID를 통해 라벨을 삭제해야 함', async () => {
      const labelId = '1';
      const deleteResult = { affected: 1 };
      mockLabelsService.remove.mockResolvedValue(deleteResult);

      const result = await controller.remove(labelId);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResult);
    });
  });
});
