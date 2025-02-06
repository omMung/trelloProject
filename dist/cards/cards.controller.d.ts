import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { UpdateCardPositionsDto } from './dto/update-card-positions.dto';
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    createCard(createCardDto: CreateCardDto): Promise<import("./entities/card.entity").Card>;
    findOne(id: string, listId: number): Promise<import("./entities/card.entity").Card>;
    updateCard(id: string, updateCardDto: UpdateCardDto): Promise<void>;
    deleteCard(id: string, listId: number): Promise<void>;
    updatePositions(UpdateCardPositionsDto: UpdateCardPositionsDto): Promise<{
        message: string;
    }>;
}
