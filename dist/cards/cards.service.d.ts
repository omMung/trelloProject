import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { UpdateCardPositionsDto } from './dto/update-card-positions.dto';
export declare class CardsService {
    private cardsRepository;
    constructor(cardsRepository: Repository<Card>);
    findLastPosition(): Promise<number>;
    createCard(createCardDto: CreateCardDto): Promise<Card>;
    findOne(id: number, listId: number): Promise<Card>;
    updateCard(id: number, updateCardDto: UpdateCardDto): Promise<void>;
    deleteCard(id: number, listId: number): Promise<void>;
    private verifyCards;
    updatePositions(updateCardPositionsDto: UpdateCardPositionsDto): Promise<void>;
}
