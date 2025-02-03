import { Test, TestingModule } from '@nestjs/testing';
import { CardLabelsService } from './card-labels.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CardLabel } from './entities/card-label.entity';
import { Card } from '../cards/entities/card.entity';
import { Label } from '../labels/entities/label.entity';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

describe('CardLabelsService', () => {
  let service: CardLabelsService;
  let cardLabelRepository: Repository<CardLabel>;
  let cardRepository: Repository<Card>;
  let labelRepository: Repository<Label>;

  const mockCardLabelRepository = {
    //CardLabelRepository mock 추가
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
    find: jest.fn(),
  };
  const mockCardRepository = { findOneBy: jest.fn() }; // CardRepository mock 추가
  const mockLabelRepository = { findOneBy: jest.fn() }; // LabelRepository mock 추가

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardLabelsService,
        {
          provide: getRepositoryToken(CardLabel),
          useValue: mockCardLabelRepository,
        },
        {
          provide: getRepositoryToken(Card),
          useValue: mockCardRepository,
        },
        { provide: getRepositoryToken(Label), useValue: mockLabelRepository },
      ],
    }).compile();

    service = module.get<CardLabelsService>(CardLabelsService);
    cardLabelRepository = module.get<Repository<CardLabel>>(
      getRepositoryToken(CardLabel),
    );
    cardRepository = module.get<Repository<Card>>(getRepositoryToken(Card));
    labelRepository = module.get<Repository<Label>>(getRepositoryToken(Label));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('카드 라벨 생성 성공 테스트', async () => {
      const dto = { cardId: 1, labelId: 2 };
      const cardLabel = { id: 1, cardId: 1, labelId: 2 };

      mockCardRepository.findOneBy.mockResolvedValueOnce({ id: 1 });
      mockLabelRepository.findOneBy.mockResolvedValueOnce({ id: 2 });

      mockCardLabelRepository.create.mockReturnValue(cardLabel);
      mockCardLabelRepository.save.mockResolvedValue(cardLabel);

      const result = await service.create(dto);
      expect(result).toEqual(cardLabel);
      expect(mockCardLabelRepository.save).toHaveBeenCalledWith(cardLabel);
    });

    it('카드가 존재하지 않는 경우 테스트', async () => {
      const dto = { cardId: 1, labelId: 2 };
      mockCardRepository.findOneBy.mockResolvedValueOnce(null);

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('라벨이 존재하지 않는 경우', async () => {
      const dto = { cardId: 1, labelId: 2 };
      mockCardRepository.findOneBy.mockResolvedValueOnce({ id: 1 });
      mockLabelRepository.findOneBy.mockResolvedValueOnce(null);

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('전체 지정라벨 조회 테스트', async () => {
      const result = [{ id: 1, cardId: 1, labelId: 2 }];
      mockCardLabelRepository.find.mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('update', () => {
    it('라벨 업데이트 성공 테스트', async () => {
      const dto = { labelId: 3 };
      const cardLabel = { id: 1, cardId: 1, labelId: 3 };
      mockCardRepository.findOneBy.mockResolvedValueOnce({ id: 1 });
      mockLabelRepository.findOneBy.mockResolvedValueOnce({ id: 3 });
      mockCardLabelRepository.save.mockResolvedValue(cardLabel);

      const result = await service.update(1, dto);
      expect(result).toEqual(cardLabel);
      expect(mockCardLabelRepository.save).toHaveBeenCalledWith({
        ...cardLabel,
        ...dto,
      });
    });

    it('지정 라벨이 존재하지 않을 경우 테스트', async () => {
      const dto = { labelId: 3 };
      mockCardLabelRepository.findOneBy.mockResolvedValueOnce(null);

      await expect(service.update(1, dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('지정 라벨 삭제 성공 테스트', async () => {
      const cardLabel = { id: 1 };
      mockCardLabelRepository.findOneBy.mockResolvedValueOnce(cardLabel);
      mockCardLabelRepository.delete.mockResolvedValueOnce({ affected: 1 });

      const result = await service.remove(1);
      expect(result).toEqual('지정 라벨을 삭제하였습니다.');
      expect(mockCardLabelRepository.delete).toHaveBeenCalledWith(1);
    });

    it('지정 라벨이 존재하지 않는 경우 테스트', async () => {
      mockCardLabelRepository.findOneBy.mockResolvedValueOnce(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
