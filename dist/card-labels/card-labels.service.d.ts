import { CardLabel } from './entities/card-label.entity';
import { CreateCardLabelDto } from './dto/create-card-label.dto';
import { UpdateCardLabelDto } from './dto/update-card-label.dto';
import { Repository } from 'typeorm';
import { Card } from '../cards/entities/card.entity';
import { Label } from '../labels/entities/label.entity';
export declare class CardLabelsService {
    private readonly cardLabelRepository;
    private readonly cardRepository;
    private readonly labelRepository;
    constructor(cardLabelRepository: Repository<CardLabel>, cardRepository: Repository<Card>, labelRepository: Repository<Label>);
    create(createCardLabelDto: CreateCardLabelDto): Promise<CardLabel>;
    findAll(): Promise<CardLabel[]>;
    update(id: number, updateCardLabelDto: UpdateCardLabelDto): Promise<CardLabel>;
    remove(id: number): Promise<string>;
}
