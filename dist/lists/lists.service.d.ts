import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { UpdateListPositionsDto } from './dto/update-list-positions.dto';
export declare class ListsService {
    private listsRepository;
    constructor(listsRepository: Repository<List>);
    create(createListDto: CreateListDto): Promise<List>;
    update(id: number, updateListDto: UpdateListDto): Promise<List>;
    remove(id: number): Promise<void>;
    updatePositions(updateListPositionsDto: UpdateListPositionsDto): Promise<void>;
}
