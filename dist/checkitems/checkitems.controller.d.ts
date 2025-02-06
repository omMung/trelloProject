import { CheckitemsService } from './checkitems.service';
import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';
import { CheckItem } from './entities/checkitem.entity';
export declare class CheckitemsController {
    private readonly checkitemsService;
    constructor(checkitemsService: CheckitemsService);
    create(createCheckitemDto: CreateCheckitemDto): Promise<CheckItem>;
    update(id: number, updateCheckitemDto: UpdateCheckitemDto): Promise<CheckItem>;
    remove(id: number, CheckListId: number): Promise<void>;
}
