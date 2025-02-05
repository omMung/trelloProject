import { Controller, Get, Delete, Param } from '@nestjs/common';
import { AlarmsService } from './alarms.service';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Get(':userId')
  async getUserAlarms(@Param('userId') userId: number) {
    return this.alarmsService.getAlarmsByUser(userId);
  }

  @Delete(':userId')
  async clearUserAlarms(@Param('userId') userId: number) {
    await this.alarmsService.clearAlarms(userId);
    return { message: '알람이 삭제되었습니다.' };
  }
}
