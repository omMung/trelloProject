import { Card } from '../../cards/entities/card.entity';
import { User } from '../../users/entities/user.entity';
export declare class Comment {
    id: number;
    userId: number;
    cardId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    card: Card;
}
