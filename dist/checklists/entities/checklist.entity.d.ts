import { Card } from '../../cards/entities/card.entity';
import { CheckItem } from '../../checkitems/entities/checkitem.entity';
export declare class CheckList {
    id: number;
    cardId: number;
    position: number;
    title: string;
    card: Card;
    checkItems?: CheckItem[];
}
