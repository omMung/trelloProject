import { Board } from '../../boards/entities/board.entity';
import { Card } from '../../cards/entities/card.entity';
export declare class List {
    id: number;
    boardId: number;
    position: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    board: Board;
    cards: Card[];
}
