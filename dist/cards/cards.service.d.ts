import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { List } from 'src/lists/entities/list.entity';
import { Card } from './entities/card.entity';
import { Member } from 'src/members/entities/member.entity';
import { UpdateCardPositionsDto } from './dto/update-card-positions.dto';
import { FindCardDto } from './dto/find-card.dto';
import { DeleteCardDto } from './dto/delete-card.dto';
export declare class CardsService {
    private cardsRepository;
    private listsRepository;
    private memberRepository;
    constructor(cardsRepository: Repository<Card>, listsRepository: Repository<List>, memberRepository: Repository<Member>);
    findLastPosition(): Promise<number>;
    createCard(req: any, createCardDto: CreateCardDto): Promise<Card>;
    findOne(id: number, findCardDto: FindCardDto): Promise<Card>;
    updateCard(req: any, id: number, updateCardDto: UpdateCardDto): Promise<void>;
    deleteCard(req: any, id: number, deleteCardDto: DeleteCardDto): Promise<void>;
    private verifyCards;
    updatePositions(updateCardPositionsDto: UpdateCardPositionsDto): Promise<void>;
}
