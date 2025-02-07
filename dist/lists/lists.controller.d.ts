import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { UpdateListPositionsDto } from './dto/update-list-positions.dto';
export declare class ListsController {
    private readonly listsService;
    constructor(listsService: ListsService);
    create(createListDto: CreateListDto, req: any): Promise<import("./entities/list.entity").List>;
    update(id: string, updateListDto: UpdateListDto, req: any): Promise<import("./entities/list.entity").List>;
    remove(id: string, updateListDto: UpdateListDto, req: any): Promise<void>;
    updatePositions(updateListPositionsDto: UpdateListPositionsDto, req: any): Promise<{
        message: string;
    }>;
}
