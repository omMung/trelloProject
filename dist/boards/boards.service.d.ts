import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { List } from '../lists/entities/list.entity';
import { Card } from '../cards/entities/card.entity';
import { Member } from '../members/entities/member.entity';
import { visibEnum } from './dto/visibility.enum';
import { Repository } from 'typeorm';
export declare class BoardsService {
    private boardRepository;
    private listRepository;
    private cardRepository;
    private memberRepository;
    constructor(boardRepository: Repository<Board>, listRepository: Repository<List>, cardRepository: Repository<Card>, memberRepository: Repository<Member>);
    create(userId: number, createBoardDto: CreateBoardDto): Promise<{
        message: string;
    }>;
    findAll(userId: number): Promise<{
        message: string;
        data: Board[];
    }>;
    findOne(userId: number, id: number): Promise<{
        message: string;
        data: {
            lists: {
                cards: Card[];
                id: number;
                boardId: number;
                position: number;
                title: string;
                createdAt: Date;
                updatedAt: Date;
                board: Board;
            }[];
            id: number;
            userId: number;
            visibility: visibEnum;
            color: String;
            title: String;
            createdAt: Date;
            updatedAt: Date;
            user: import("../users/entities/user.entity").User;
            members: Member[];
            label: import("../labels/entities/label.entity").Label[];
        };
    }>;
    update(userId: number, id: number, updateBoardDto: UpdateBoardDto): Promise<{
        message: string;
        data: Board;
    }>;
    remove(userId: number, id: number): Promise<{
        message: string;
    }>;
}
