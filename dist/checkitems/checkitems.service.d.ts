import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';
import { CheckItem } from './entities/checkitem.entity';
import { Repository } from 'typeorm';
import { ChecklistsService } from 'src/checklists/checklists.service';
export declare class CheckitemsService {
    private checkitemsRepository;
    private checklistsService;
    constructor(checkitemsRepository: Repository<CheckItem>, checklistsService: ChecklistsService);
    create(createCheckitemDto: CreateCheckitemDto): Promise<CheckItem>;
    update(id: number, updateCheckitemDto: UpdateCheckitemDto): Promise<CheckItem>;
    remove(id: number, updateCheckitemDto: UpdateCheckitemDto): Promise<void>;
}
