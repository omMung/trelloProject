import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
export declare class LabelsController {
    private readonly labelsService;
    constructor(labelsService: LabelsService);
    create(req: any, createLabelDto: CreateLabelDto): Promise<import("./entities/label.entity").Label>;
    findAll(): Promise<import("./entities/label.entity").Label[]>;
    findOne(id: string): Promise<import("./entities/label.entity").Label>;
    update(id: string, updateLabelDto: UpdateLabelDto): Promise<import("./entities/label.entity").Label>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
