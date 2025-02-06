import { Test, TestingModule } from '@nestjs/testing';
import { CardLabelsController } from './card-labels.controller';
import { CardLabelsService } from './card-labels.service';
import { CreateCardLabelDto } from './dto/create-card-label.dto';
import { UpdateCardLabelDto } from './dto/update-card-label.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CardLabelsController', () => {
  let controller: CardLabelsController;
  let service: CardLabelsService;

  const mockCardLabelsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardLabelsController],
      providers: [
        {
          provide: CardLabelsService,
          useValue: mockCardLabelsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) }) // JwtAuthGuard를 모의 처리
      .compile();

    controller = module.get<CardLabelsController>(CardLabelsController);
    service = module.get<CardLabelsService>(CardLabelsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockUser = { id: 1 };
    const mockCreateCardLabelDto: CreateCardLabelDto = {
      cardId: 1,
      labelId: 1,
    };

    it('카드 라벨 생성 성공', async () => {
      const mockResult = { id: 1, cardId: 1, labelId: 1 };
      mockCardLabelsService.create.mockResolvedValue(mockResult);

      const result = await controller.create(
        { user: mockUser },
        mockCreateCardLabelDto,
      );

      expect(result).toEqual(mockResult);
      expect(service.create).toHaveBeenCalledWith(
        mockUser.id,
        mockCreateCardLabelDto.cardId,
        mockCreateCardLabelDto.labelId,
      );
    });

    it('카드 라벨 생성 실패 - 서비스에서 예외 발생', async () => {
      mockCardLabelsService.create.mockRejectedValue(new BadRequestException());

      await expect(
        controller.create({ user: mockUser }, mockCreateCardLabelDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    const mockUser = { id: 1 };
    const mockCardId = 1;

    it('카드 라벨 목록 조회 성공', async () => {
      const mockResult = [{ id: 1, cardId: 1, labelId: 1 }];
      mockCardLabelsService.findAll.mockResolvedValue(mockResult);

      const result = await controller.findAll(
        { user: mockUser },
        { cardId: mockCardId },
      );

      expect(result).toEqual(mockResult);
      expect(service.findAll).toHaveBeenCalledWith(mockUser.id, mockCardId);
    });

    it('카드 라벨 목록 조회 실패 - 서비스에서 예외 발생', async () => {
      mockCardLabelsService.findAll.mockRejectedValue(new NotFoundException());

      await expect(
        controller.findAll({ user: mockUser }, { cardId: mockCardId }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const mockUser = { id: 1 };
    const mockId = '1';
    const mockUpdateCardLabelDto: UpdateCardLabelDto = {
      cardId: 1,
      labelId: 2,
    };

    it('카드 라벨 업데이트 성공', async () => {
      const mockResult = { id: 1, cardId: 1, labelId: 2 };
      mockCardLabelsService.update.mockResolvedValue(mockResult);

      const result = await controller.update(mockId, mockUpdateCardLabelDto, {
        user: mockUser,
      });

      expect(result).toEqual(mockResult);
      expect(service.update).toHaveBeenCalledWith(
        mockUser.id,
        mockUpdateCardLabelDto.cardId,
        mockUpdateCardLabelDto.labelId,
        +mockId,
      );
    });

    it('카드 라벨 업데이트 실패 - 서비스에서 예외 발생', async () => {
      mockCardLabelsService.update.mockRejectedValue(new BadRequestException());

      await expect(
        controller.update(mockId, mockUpdateCardLabelDto, { user: mockUser }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    const mockId = '1';

    it('카드 라벨 삭제 성공', async () => {
      mockCardLabelsService.remove.mockResolvedValue(
        '지정 라벨을 삭제하였습니다.',
      );

      const result = await controller.remove(mockId);

      expect(result).toEqual('지정 라벨을 삭제하였습니다.');
      expect(service.remove).toHaveBeenCalledWith(+mockId);
    });

    it('카드 라벨 삭제 실패 - 서비스에서 예외 발생', async () => {
      mockCardLabelsService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove(mockId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
