import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { UpdateCardPositionsDto } from './dto/update-card-positions.dto';
import { FindCardDto } from './dto/find-card.dto';
import { DeleteCardDto } from './dto/delete-card.dto';
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    createCard(req: any, createCardDto: CreateCardDto): Promise<import("./entities/card.entity").Card>;
    findOne(id: string, findCardDto: FindCardDto): Promise<import("./entities/card.entity").Card>;
    updateCard(req: any, id: string, updateCardDto: UpdateCardDto): Promise<void>;
    deleteCard(req: any, id: string, deleteCardDto: DeleteCardDto): Promise<void>;
    updatePositions(UpdateCardPositionsDto: UpdateCardPositionsDto): Promise<{
        message: string;
    }>;
}
