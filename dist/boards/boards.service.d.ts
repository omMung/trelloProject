import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
export declare class BoardsService {
    private BoardRepository;
    constructor(BoardRepository: Repository<Board>);
    create(createBoardDto: CreateBoardDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<{
        message: string;
        data: Board[];
    }>;
    findOne(id: number): Promise<{
        message: string;
        data: Board;
    }>;
    update(id: number, updateBoardDto: UpdateBoardDto): Promise<{
        message: string;
        data: Board;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
