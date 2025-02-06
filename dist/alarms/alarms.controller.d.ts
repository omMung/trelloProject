import { AlarmsService } from './alarms.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { UpdateAlarmDto } from './dto/update-alarm.dto';
export declare class AlarmsController {
    private readonly alarmsService;
    constructor(alarmsService: AlarmsService);
    create(createAlarmDto: CreateAlarmDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAlarmDto: UpdateAlarmDto): string;
    remove(id: string): string;
}
