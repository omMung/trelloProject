import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { Member } from '../members/entities/member.entity';
import { User } from '../users/entities/user.entity';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { UpdateListPositionsDto } from './dto/update-list-positions.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class ListsService {
    private listsRepository;
    private membersRepository;
    private usersRepository;
    private readonly eventEmitter;
    constructor(listsRepository: Repository<List>, membersRepository: Repository<Member>, usersRepository: Repository<User>, eventEmitter: EventEmitter2);
    private validateUserAndMember;
    create(createListDto: CreateListDto, req: any): Promise<List>;
    update(id: number, updateListDto: UpdateListDto, req: any): Promise<List>;
    remove(id: number, updateListDto: UpdateListDto, req: any): Promise<void>;
    updatePositions(updateListPositionsDto: UpdateListPositionsDto, req: any): Promise<void>;
}
