import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
export declare class BoardsController {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    create(createBoardDto: CreateBoardDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<{
        message: string;
        data: import("./entities/board.entity").Board[];
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: import("./entities/board.entity").Board;
    }>;
    update(id: string, updateBoardDto: UpdateBoardDto): Promise<{
        message: string;
        data: import("./entities/board.entity").Board;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
