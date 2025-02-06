import { Card } from '../../cards/entities/card.entity';
import { Label } from '../../labels/entities/label.entity';
export declare class CardLabel {
    id: number;
    labelId: number;
    cardId: number;
    card: Card;
    label: Label;
}
