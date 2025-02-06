import { ChecklistsService } from './checklists.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { CheckList } from './entities/checklist.entity';
export declare class ChecklistsController {
    private readonly checklistsService;
    constructor(checklistsService: ChecklistsService);
    create(createChecklistDto: CreateChecklistDto): Promise<CheckList>;
    findAll(req: any): Promise<CheckList[]>;
    update(id: number, updateChecklistDto: UpdateChecklistDto): Promise<CheckList>;
    remove(id: number, cardId: number): Promise<void>;
}
