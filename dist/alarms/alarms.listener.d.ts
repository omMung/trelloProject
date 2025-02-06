import { Repository } from 'typeorm';
import { Alarm } from './entities/alarm.entity';
export declare class AlarmsListener {
    private readonly alarmRepository;
    constructor(alarmRepository: Repository<Alarm>);
    handleListCreatedEvent(payload: {
        senderId: number;
        boardId: number;
        members: number[];
        message: string;
    }): Promise<void>;
}
