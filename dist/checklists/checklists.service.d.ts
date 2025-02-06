import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { CheckList } from './entities/checklist.entity';
import { Repository } from 'typeorm';
export declare class ChecklistsService {
    private checklistRepository;
    constructor(checklistRepository: Repository<CheckList>);
    create(createChecklistDto: CreateChecklistDto): Promise<CheckList>;
    findAllByUserId(userId: number): Promise<CheckList[]>;
    update(id: number, updateChecklistDto: UpdateChecklistDto): Promise<CheckList>;
    remove(id: number, cardId: number): Promise<void>;
}
