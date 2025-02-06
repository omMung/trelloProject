import { Card } from '../../cards/entities/card.entity';
import { User } from '../../users/entities/user.entity';
export declare class JoinMember {
    id: number;
    userId: number;
    cardId: number;
    user: User;
    card: Card;
}
