import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';
import { CheckItem } from './entities/checkitem.entity';
import { Repository } from 'typeorm';
export declare class CheckitemsService {
    private checkitemsRepository;
    constructor(checkitemsRepository: Repository<CheckItem>);
    create(createCheckitemDto: CreateCheckitemDto): Promise<CheckItem>;
    update(id: number, updateCheckitemDto: UpdateCheckitemDto): Promise<CheckItem>;
    remove(id: number, checkListId: number): Promise<void>;
}
