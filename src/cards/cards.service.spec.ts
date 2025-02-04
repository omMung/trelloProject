import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { List } from '../lists/entities/list.entity';
import { Member } from '../members/entities/member.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CardsService', () => {
  let service: CardsService;
  let cardRepository: Repository<Card>;
  let listRepository: Repository<List>;
  let memberRepository: Repository<Member>;

  const mockCardRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockListRepository = {
    findOne: jest.fn(),
  };

  const mockMemberRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: getRepositoryToken(Card),
          useValue: mockCardRepository,
        },
        {
          provide: getRepositoryToken(List),
          useValue: mockListRepository,
        },
        {
          provide: getRepositoryToken(Member),
          useValue: mockMemberRepository,
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
    cardRepository = module.get<Repository<Card>>(getRepositoryToken(Card));
    listRepository = module.get<Repository<List>>(getRepositoryToken(List));
    memberRepository = module.get<Repository<Member>>(
      getRepositoryToken(Member),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCard', () => {
    it('should create a card successfully', async () => {
      const mockReq = { user: { id: 1 } };
      const mockCreateCardDto = {
        listId: 1,
        title: 'Test Card',
        description: 'Test Description',
        color: '#000000',
        status: false,
        boardId: 1,
      };

      mockMemberRepository.findOne.mockResolvedValue({ boardId: 1 });
      mockListRepository.findOne.mockResolvedValue({ boardId: 1 });
      mockCardRepository.find.mockResolvedValue([{ position: 1 }]);
      mockCardRepository.create.mockReturnValue(mockCreateCardDto);
      mockCardRepository.save.mockResolvedValue(mockCreateCardDto);

      const result = await service.createCard(mockReq, mockCreateCardDto);
      expect(result).toEqual(mockCreateCardDto);
    });

    it('should throw NotFoundException when member not found', async () => {
      const mockReq = { user: { id: 1 } };
      mockMemberRepository.findOne.mockResolvedValue(null);

      await expect(service.createCard(mockReq, {} as any)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('updatePositions', () => {
    it('should update card positions successfully', async () => {
      const mockUpdateDto = {
        listId: 1,
        cards: [
          { id: 1, position: 1 },
          { id: 2, position: 2 },
        ],
      };

      mockCardRepository.find.mockResolvedValue([
        { id: 1, position: 2 },
        { id: 2, position: 1 },
      ]);

      mockCardRepository.update.mockResolvedValue({});

      await expect(
        service.updatePositions(mockUpdateDto),
      ).resolves.not.toThrow();
    });

    it('should throw BadRequestException when card counts do not match', async () => {
      const mockUpdateDto = {
        listId: 1,
        cards: [{ id: 1, position: 1 }],
      };

      mockCardRepository.find.mockResolvedValue([
        { id: 1, position: 1 },
        { id: 2, position: 2 },
      ]);

      await expect(service.updatePositions(mockUpdateDto)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
