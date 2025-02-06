import { Label } from './entities/label.entity';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Repository } from 'typeorm';
export declare class LabelsService {
    private readonly labelRepository;
    constructor(labelRepository: Repository<Label>);
    create(createLabelDto: CreateLabelDto): Promise<Label>;
    findAll(): Promise<Label[]>;
    findOne(id: number): Promise<Label>;
    update(id: number, updateLabelDto: UpdateLabelDto): Promise<Label>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
