import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        {
          provide: CardsService,
          useValue: mockCardsService,
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
});
