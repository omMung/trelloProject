import { CreateAlarmDto } from './dto/create-alarm.dto';
import { UpdateAlarmDto } from './dto/update-alarm.dto';
export declare class AlarmsService {
    create(createAlarmDto: CreateAlarmDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAlarmDto: UpdateAlarmDto): string;
    remove(id: number): string;
}
