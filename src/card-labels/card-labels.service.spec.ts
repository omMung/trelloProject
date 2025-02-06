import { Test, TestingModule } from '@nestjs/testing';
import { CardLabelsService } from './card-labels.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CardLabel } from './entities/card-label.entity';
import { Card } from '../cards/entities/card.entity';
import { Label } from '../labels/entities/label.entity';
import { Repository } from 'typeorm';
import { Member } from '../members/entities/member.entity';
import {
  BoardMembersForbiddenException,
  CardLabelConflictException,
  CardLabelNotFoundException,
  CardNotFoundException,
  LabelNotFoundException,
} from '../common/exceptions/card-label.exception';

describe('CardLabelsService', () => {
  let service: CardLabelsService;
  let cardLabelRepository: Repository<CardLabel>;
  let cardRepository: Repository<Card>;
  let labelRepository: Repository<Label>;
  let memberRepository: Repository<Member>;

  const mockCardLabelRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
    find: jest.fn(),
  };

  const mockCardRepository = {
    findOne: jest.fn(), // 관계형 쿼리 처리 위해 findOne 사용
  };

  const mockLabelRepository = {
    findOneBy: jest.fn(),
  };

  const mockMemberRepository = {
    findOne: jest.fn(),
  };

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
        {
          provide: getRepositoryToken(Label),
          useValue: mockLabelRepository,
        },
        {
          provide: getRepositoryToken(Member),
          useValue: mockMemberRepository,
        },
      ],
    }).compile();

    service = module.get<CardLabelsService>(CardLabelsService);
    cardLabelRepository = module.get<Repository<CardLabel>>(
      getRepositoryToken(CardLabel),
    );
    cardRepository = module.get<Repository<Card>>(getRepositoryToken(Card));
    labelRepository = module.get<Repository<Label>>(getRepositoryToken(Label));
    memberRepository = module.get<Repository<Member>>(
      getRepositoryToken(Member),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const userId = 1;
    const cardId = 1;
    const labelId = 1;
    const boardId = 1;

    const mockCard = {
      id: cardId,
      list: {
        board: {
          id: boardId,
        },
      },
    };

    it('카드가 존재하지 않으면 CardNotFoundException을 던진다', async () => {
      mockCardRepository.findOne.mockResolvedValue(null);

      await expect(service.create(userId, cardId, labelId)).rejects.toThrow(
        CardNotFoundException,
      );
    });

    it('사용자가 보드 멤버가 아니면 BoardMembersForbiddenException을 던진다', async () => {
      mockCardRepository.findOne.mockResolvedValue(mockCard);
      mockMemberRepository.findOne.mockResolvedValue(null);

      await expect(service.create(userId, cardId, labelId)).rejects.toThrow(
        BoardMembersForbiddenException,
      );
    });

    it('라벨이 존재하지 않으면 LabelNotFoundException을 던진다', async () => {
      mockCardRepository.findOne.mockResolvedValue(mockCard);
      mockMemberRepository.findOne.mockResolvedValue({});
      mockLabelRepository.findOneBy.mockResolvedValue(null);

      await expect(service.create(userId, cardId, labelId)).rejects.toThrow(
        LabelNotFoundException,
      );
    });

    it('중복된 카드 라벨 생성 시 CardLabelConflictException을 던진다', async () => {
      mockCardRepository.findOne.mockResolvedValue(mockCard);
      mockMemberRepository.findOne.mockResolvedValue({});
      mockLabelRepository.findOneBy.mockResolvedValue({ id: labelId });
      mockCardLabelRepository.save.mockRejectedValue({ code: 'ER_DUP_ENTRY' });

      await expect(service.create(userId, cardId, labelId)).rejects.toThrow(
        CardLabelConflictException,
      );
    });

    it('카드 라벨 생성 성공', async () => {
      const mockCardLabel = { cardId, labelId };

      mockCardRepository.findOne.mockResolvedValue(mockCard);
      mockMemberRepository.findOne.mockResolvedValue({});
      mockLabelRepository.findOneBy.mockResolvedValue({ id: labelId });
      mockCardLabelRepository.create.mockReturnValue(mockCardLabel);
      mockCardLabelRepository.save.mockResolvedValue(mockCardLabel);

      const result = await service.create(userId, cardId, labelId);

      expect(result).toEqual(mockCardLabel);
      expect(cardLabelRepository.create).toHaveBeenCalledWith({
        cardId,
        labelId,
      });
      expect(cardLabelRepository.save).toHaveBeenCalledWith(mockCardLabel);
    });
  });

  describe('findAll', () => {
    const userId = 1;
    const cardId = 1;
    const boardId = 1;

    const mockCard = {
      id: cardId,
      list: {
        board: {
          id: boardId,
        },
      },
    };

    it('카드가 존재하지 않으면 CardLabelNotFoundException을 던진다', async () => {
      mockCardRepository.findOne.mockResolvedValue(null);

      await expect(service.findAll(userId, cardId)).rejects.toThrow(
        CardLabelNotFoundException,
      );
    });

    it('사용자가 보드 멤버가 아니면 BoardMembersForbiddenException을 던진다', async () => {
      mockCardRepository.findOne.mockResolvedValue(mockCard);
      mockMemberRepository.findOne.mockResolvedValue(null);

      await expect(service.findAll(userId, cardId)).rejects.toThrow(
        BoardMembersForbiddenException,
      );
    });

    it('카드 라벨 목록 반환 성공', async () => {
      const mockCardLabels = [{ id: 1 }, { id: 2 }];

      mockCardRepository.findOne.mockResolvedValue(mockCard);
      mockMemberRepository.findOne.mockResolvedValue({});
      mockCardLabelRepository.find.mockResolvedValue(mockCardLabels);

      const result = await service.findAll(userId, cardId);

      expect(result).toEqual(mockCardLabels);
      expect(cardLabelRepository.find).toHaveBeenCalledWith({
        where: { cardId },
      });
    });
  });

  describe('update', () => {
    const userId = 1;
    const cardId = 1;
    const labelId = 2;
    const id = 1;
    const boardId = 1;

    const mockCard = {
      id: cardId,
      list: {
        board: {
          id: boardId,
        },
      },
    };

    const mockCardLabel = { id, cardId: 1, labelId: 1 };

    it('카드 라벨이 존재하지 않으면 CardLabelNotFoundException을 던진다', async () => {
      mockCardRepository.findOne.mockResolvedValue(mockCard);
      mockMemberRepository.findOne.mockResolvedValue({});
      mockCardLabelRepository.findOneBy.mockResolvedValue(null);

      await expect(service.update(userId, cardId, labelId, id)).rejects.toThrow(
        CardLabelNotFoundException,
      );
    });

    it('새 라벨이 존재하지 않으면 LabelNotFoundException을 던진다', async () => {
      mockCardRepository.findOne.mockResolvedValue(mockCard);
      mockMemberRepository.findOne.mockResolvedValue({});
      mockCardLabelRepository.findOneBy.mockResolvedValue(mockCardLabel);
      mockLabelRepository.findOneBy.mockResolvedValue(null);

      await expect(service.update(userId, cardId, labelId, id)).rejects.toThrow(
        LabelNotFoundException,
      );
    });

    it('카드 라벨 업데이트 성공', async () => {
      const updatedCardLabel = { ...mockCardLabel, labelId };

      mockCardRepository.findOne.mockResolvedValue(mockCard);
      mockMemberRepository.findOne.mockResolvedValue({});
      mockCardLabelRepository.findOneBy.mockResolvedValue(mockCardLabel);
      mockLabelRepository.findOneBy.mockResolvedValue({ id: labelId });
      mockCardLabelRepository.save.mockResolvedValue(updatedCardLabel);

      const result = await service.update(userId, cardId, labelId, id);

      expect(result).toEqual(updatedCardLabel);
      expect(cardLabelRepository.save).toHaveBeenCalledWith(updatedCardLabel);
    });
  });

  describe('remove', () => {
    const id = 1;

    it('카드 라벨이 존재하지 않으면 LabelNotFoundException을 던진다', async () => {
      mockCardLabelRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove(id)).rejects.toThrow(LabelNotFoundException);
    });

    it('카드 라벨 삭제 성공', async () => {
      const mockCardLabel = { id };

      mockCardLabelRepository.findOneBy.mockResolvedValue(mockCardLabel);
      mockCardLabelRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(id);

      expect(result).toEqual('지정 라벨을 삭제하였습니다.');
      expect(cardLabelRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
