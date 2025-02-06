import { CreateAlarmDto } from './dto/create-alarm.dto';
import { Repository } from 'typeorm';
import { Alarm } from './entities/alarm.entity';
export declare class AlarmsService {
    private alarmRepository;
    constructor(alarmRepository: Repository<Alarm>);
    create(createAlarmDto: CreateAlarmDto): string;
    findByUserId(userId: number): Promise<Alarm[]>;
    remove(id: number): string;
}
