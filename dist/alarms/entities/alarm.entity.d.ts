import { Card } from '../../cards/entities/card.entity';
import { User } from '../../users/entities/user.entity';
export declare class Alarm {
    id: number;
    userId: number;
    cardId: number;
    content: string;
    status: boolean;
    user: User;
    card: Card;
}
