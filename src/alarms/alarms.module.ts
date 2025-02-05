import { Module } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from './alarms.controller';
import { AlarmsGateway } from './alarms.gateway';

@Module({
  controllers: [AlarmsController],
  providers: [AlarmsService, AlarmsGateway],
})
export class AlarmsModule {}
