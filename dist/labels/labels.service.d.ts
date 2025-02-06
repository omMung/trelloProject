import { Label } from './entities/label.entity';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Repository } from 'typeorm';
export declare class LabelsService {
    private readonly labelRepository;
    constructor(labelRepository: Repository<Label>);
    create(userId: number, title: string, color: string, boardId: number): Promise<Label>;
    findAll(): Promise<Label[]>;
    findOne(id: number): Promise<Label>;
    update(id: number, updateLabelDto: UpdateLabelDto): Promise<Label>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
