import { AlarmsService } from './alarms.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';
export declare class AlarmsController {
    private readonly alarmService;
    constructor(alarmService: AlarmsService);
    create(createAlarmDto: CreateAlarmDto): string;
    findByUserId(userId: number): Promise<import("./entities/alarm.entity").Alarm[]>;
    remove(id: string): Promise<void>;
}
