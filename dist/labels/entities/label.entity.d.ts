import { Board } from 'src/boards/entities/board.entity';
import { CardLabel } from '../../card-labels/entities/card-label.entity';
export declare class Label {
    id: number;
    boardId: number;
    color: string;
    title: string;
    cardLabels: CardLabel[];
    board: Board;
}
