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

describe('CardLabelsController', () => {
  // 컨트롤러 테스트
  let controller: CardLabelsController; // 컨트롤러 인스턴스
  let service: CardLabelsService; // 서비스 인스턴스

  beforeEach(async () => {
    // 테스트 환경 설정
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardLabelsController],
      providers: [
        {
          provide: CardLabelsService,
          useValue: {
            // 서비스 모의 객체 주입
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile(); // 모듈 컴파일
    //인스턴스 생성
    controller = module.get<CardLabelsController>(CardLabelsController);
    service = module.get<CardLabelsService>(CardLabelsService);
  });
  //컨트롤러 인스턴스 생성 확인
  it('instance check', () => {
    expect(controller).toBeDefined();
  });

  // 생성 테스트
  describe('create', () => {
    it('should create a card label', async () => {
      const dto: CreateCardLabelDto = { cardId: 1, labelId: 2 }; // 요청 목 객체
      const result = { id: 1, ...dto } as CardLabel; // 응답 목 객체
      jest.spyOn(service, 'create').mockResolvedValue(result); // 서비스 목 객체 생성

      expect(await controller.create(dto)).toEqual(result); // 컨트롤러의 반환값이 result와 동일한지 확인
      expect(service.create).toHaveBeenCalledWith(dto); //  service.create()가 dto를 인자로 호출되었는지 검증
    });
  });

  // 조회 테스트
  describe('findAll', () => {
    it('should return an array of card labels', async () => {
      const result: CardLabel[] = [
        Object.assign(new CardLabel(), {
          id: 1,
          cardId: 1,
          labelId: 2,
        }) as CardLabel,
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(result as never);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
  // 업데이트 테스트
  describe('update', () => {
    it('should update a card label', async () => {
      const dto: UpdateCardLabelDto = { labelId: 3 };
      const result = { id: 1, cardId: 1, labelId: 3 };
      jest.spyOn(service, 'update').mockResolvedValue(result as never);

      expect(await controller.update('1', dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });
  // 삭제 테스트
  describe('remove', () => {
    it('should remove a card label', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue({
        message: 'Deleted',
      } as unknown as Promise<string>);

      expect(await controller.remove('1')).toEqual({ message: 'Deleted' });
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
