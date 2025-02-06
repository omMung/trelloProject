import { User } from '../../users/entities/user.entity';
export declare class Alarm {
    id: number;
    userId: number;
    message: string;
    isRead: boolean;
    createdAt: Date;
    user: User;
}
