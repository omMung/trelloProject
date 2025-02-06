import { CardLabel } from './entities/card-label.entity';
import { Repository } from 'typeorm';
import { Card } from '../cards/entities/card.entity';
import { Label } from '../labels/entities/label.entity';
import { Member } from '../members/entities/member.entity';
export declare class CardLabelsService {
    private readonly cardLabelRepository;
    private readonly cardRepository;
    private readonly labelRepository;
    private readonly memberRepository;
    constructor(cardLabelRepository: Repository<CardLabel>, cardRepository: Repository<Card>, labelRepository: Repository<Label>, memberRepository: Repository<Member>);
    create(userId: number, cardId: number, labelId: number): Promise<CardLabel>;
    findAll(userId: number, cardId: number): Promise<CardLabel[]>;
    update(userId: number, cardId: number, labelId: number, id: number): Promise<CardLabel>;
    remove(id: number): Promise<string>;
    isUserMember(userId: number, boardId: number): Promise<void>;
}
