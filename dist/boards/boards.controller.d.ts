import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
export declare class BoardsController {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    create(req: any, createBoardDto: CreateBoardDto): Promise<{
        message: string;
    }>;
    findAll(req: any): Promise<{
        message: string;
        data: import("./entities/board.entity").Board[];
    }>;
    findOne(req: any, id: string): Promise<{
        message: string;
        data: {
            lists: {
                cards: import("../cards/entities/card.entity").Card[];
                id: number;
                boardId: number;
                position: number;
                title: string;
                createdAt: Date;
                updatedAt: Date;
                board: import("./entities/board.entity").Board;
            }[];
            id: number;
            userId: number;
            visibility: import("./dto/visibility.enum").visibEnum;
            color: String;
            title: String;
            createdAt: Date;
            updatedAt: Date;
            user: import("../users/entities/user.entity").User;
            members: import("../members/entities/member.entity").Member[];
            label: import("../labels/entities/label.entity").Label[];
        };
    }>;
    update(req: any, id: string, updateBoardDto: UpdateBoardDto): Promise<{
        message: string;
        data: import("./entities/board.entity").Board;
    }>;
    remove(req: any, id: string): Promise<{
        message: string;
    }>;
}
