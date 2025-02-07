import { Repository } from 'typeorm';
import { Alarm } from './entities/alarm.entity';
import { AlarmsGateway } from './alarms.gateway';
export declare class AlarmsListener {
    private readonly alarmRepository;
    private readonly alarmsGateway;
    constructor(alarmRepository: Repository<Alarm>, alarmsGateway: AlarmsGateway);
    private createAndNotifyAlarms;
    private readonly SUPPORTED_EVENTS;
    handleDynamicEvent(event: string, payload: {
        senderId: number;
        boardId: number;
        members: number[];
        message: string;
    }): Promise<void>;
}
