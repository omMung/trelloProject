import { Board } from '../../boards/entities/board.entity';
import { User } from '../../users/entities/user.entity';
export declare class Member {
    id: number;
    boardId: number;
    userId: number;
    user: User;
    board: Board;
}
