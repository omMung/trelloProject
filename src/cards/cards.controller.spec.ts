import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/services/auth.service';

describe('CardsController', () => {
  let controller: CardsController;
  let service: CardsService;

  const mockCardsService = {
    createCard: jest.fn(),
    findOne: jest.fn(),
    updateCard: jest.fn(),
    deleteCard: jest.fn(),
    updatePositions: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const mockAuthService = {
    validateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        {
          provide: CardsService,
          useValue: mockCardsService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<CardsController>(CardsController);
    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCard', () => {
    it('should create a card', async () => {
      const mockReq = { user: { id: 1 } };
      const mockCreateCardDto = {
        listId: 1,
        title: 'Test Card',
        description: 'Test Description',
        color: '#000000',
        status: false,
        boardId: 1,
      };

      mockCardsService.createCard.mockResolvedValue(mockCreateCardDto);

      const result = await controller.createCard(mockReq, mockCreateCardDto);
      expect(result).toEqual(mockCreateCardDto);
      expect(service.createCard).toHaveBeenCalledWith(
        mockReq,
        mockCreateCardDto,
      );
    });
  });

  describe('updatePositions', () => {
    it('should update card positions', async () => {
      const mockUpdateDto = {
        listId: 1,
        cards: [
          { id: 1, position: 1 },
          { id: 2, position: 2 },
        ],
      };

      mockCardsService.updatePositions.mockResolvedValue(undefined);

      const result = await controller.updatePositions(mockUpdateDto);
      expect(result).toEqual({
        message: '카드 위치가 성공적으로 업데이트되었습니다.',
      });
      expect(service.updatePositions).toHaveBeenCalledWith(mockUpdateDto);
    });
  });

  describe('findOne', () => {
    it('should find a card', async () => {
      const mockFindCardDto = { listId: 1 };
      const mockCard = {
        id: 1,
        listId: 1,
        title: 'Test Card',
        description: 'Test Description',
      };

      mockCardsService.findOne.mockResolvedValue(mockCard);

      const result = await controller.findOne('1', mockFindCardDto);
      expect(result).toEqual(mockCard);
      expect(service.findOne).toHaveBeenCalledWith(1, mockFindCardDto);
    });
  });

  describe('updateCard', () => {
    it('should update a card', async () => {
      const mockReq = { user: { id: 1 } };
      const mockUpdateCardDto = {
        listId: 1,
        title: 'Updated Card',
        description: 'Updated Description',
      };

      mockCardsService.updateCard.mockResolvedValue(undefined);

      const result = await controller.updateCard(
        mockReq,
        '1',
        mockUpdateCardDto,
      );
      expect(result).toEqual(undefined);
      expect(service.updateCard).toHaveBeenCalledWith(
        mockReq,
        1,
        mockUpdateCardDto,
      );
    });
  });

  describe('deleteCard', () => {
    it('should delete a card', async () => {
      const mockReq = { user: { id: 1 } };
      const mockDeleteCardDto = { listId: 1 };

      mockCardsService.deleteCard.mockResolvedValue(undefined);

      const result = await controller.deleteCard(
        mockReq,
        '1',
        mockDeleteCardDto,
      );
      expect(result).toEqual(undefined);
      expect(service.deleteCard).toHaveBeenCalledWith(
        mockReq,
        1,
        mockDeleteCardDto,
      );
    });
  });
});
