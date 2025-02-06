import { CardLabelsService } from './card-labels.service';
import { CreateCardLabelDto } from './dto/create-card-label.dto';
import { UpdateCardLabelDto } from './dto/update-card-label.dto';
export declare class CardLabelsController {
    private readonly cardLabelsService;
    constructor(cardLabelsService: CardLabelsService);
    create(createCardLabelDto: CreateCardLabelDto): Promise<import("./entities/card-label.entity").CardLabel>;
    findAll(): Promise<import("./entities/card-label.entity").CardLabel[]>;
    update(id: string, updateCardLabelDto: UpdateCardLabelDto): Promise<import("./entities/card-label.entity").CardLabel>;
    remove(id: string): Promise<string>;
}
