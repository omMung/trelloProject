import { AlarmsService } from './alarms/alarms.service';
export declare class AppService {
    private readonly alarmsService;
    constructor(alarmsService: AlarmsService);
    getHello(): string;
    getStatus(): Record<string, any>;
}
