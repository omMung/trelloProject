import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from './alarms.controller';
import { Alarm } from './entities/alarm.entity';
import { AlarmsGateway } from './alarms.gateway';
import { AlarmsListener } from './alarms.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Alarm])],
  controllers: [AlarmsController],
  providers: [AlarmsService, AlarmsGateway, AlarmsListener],
  exports: [AlarmsService],
})
export class AlarmsModule {}
