import { Test, TestingModule } from '@nestjs/testing';
import { CardLabelsController } from './card-labels.controller';
import { CardLabelsService } from './card-labels.service';
import { CreateCardLabelDto } from './dto/create-card-label.dto';
import { UpdateCardLabelDto } from './dto/update-card-label.dto';
import { CardLabel } from './entities/card-label.entity';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

describe('CardLabelsController', () => {
  // 컨트롤러 테스트
  let controller: CardLabelsController; // 컨트롤러 인스턴스
  let service: CardLabelsService; // 서비스 인스턴스

  const mockCardLabelsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    isUserMember: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardLabelsController],
      providers: [
        {
          provide: CardLabelsService,
          useValue: mockCardLabelsService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard) // JwtAuthGuard 비활성화
      .useValue({ canActivate: jest.fn(() => true) }) // 가짜 가드 적용 (모든 요청 허용)
      .compile();

    controller = module.get<CardLabelsController>(CardLabelsController);
    service = module.get<CardLabelsService>(CardLabelsService);
  });
  //ㅡㅐ
  afterEach(() => {
    jest.clearAllMocks();
  });
  //컨트롤러 인스턴스 생성 확인
  it('컨트롤러 인스턴스 생성 확인', () => {
    expect(controller).toBeDefined();
  });

  // 생성 테스트
  describe('create', () => {
    it('라벨 지정 성공 테스트', async () => {
      const dto: CreateCardLabelDto = { cardId: 1, labelId: 2 };
      const userId = 123; // 테스트용 userId

      mockCardLabelsService.create.mockResolvedValue(dto);

      // 가짜 req 객체 생성
      const mockReq = { user: { id: userId } };

      const result = await controller.create(mockReq, dto);
      expect(result).toEqual(dto);

      // ✅ 올바른 순서로 호출되었는지 확인 (userId, cardId, labelId)
      expect(mockCardLabelsService.create).toHaveBeenCalledWith(
        userId,
        dto.cardId,
        dto.labelId,
      );
    });
  });

  // 조회 테스트
  describe('findAll', () => {
    it('지정 라벨 전체 조회 테스트', async () => {
      const result: CardLabel[] = [
        Object.assign(new CardLabel(), {
          id: 1,
          cardId: 1,
          labelId: 2,
        }) as CardLabel,
      ];

      mockCardLabelsService.findAll.mockResolvedValue(result as never);

      expect(await controller.findAll()).toEqual(result);
      expect(mockCardLabelsService.findAll).toHaveBeenCalled();
    });
  });
  // 업데이트 테스트
  describe('update', () => {
    it('지정 라벨 업데이트 테스트', async () => {
      const dto: UpdateCardLabelDto = { labelId: 3 };
      const result = { id: 1, cardId: 1, labelId: 3 };
      mockCardLabelsService.update.mockResolvedValue(result as never);

      expect(await controller.update('1', dto)).toEqual(result);
      expect(mockCardLabelsService.update).toHaveBeenCalledWith(1, dto);
    });
  });
  // 삭제 테스트
  describe('remove', () => {
    it('지정 라벨 삭제 테스트', async () => {
      mockCardLabelsService.remove.mockResolvedValue({
        message: 'Deleted',
      } as unknown as Promise<string>);

      expect(await controller.remove('1')).toEqual({ message: 'Deleted' });
      expect(mockCardLabelsService.remove).toHaveBeenCalledWith(1);
    });
  });
});
