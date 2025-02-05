import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post()
  async createAlarm(@Body() createAlarmDto: CreateAlarmDto) {
    return this.alarmsService.createAlarm(createAlarmDto);
  }

  @Get(':userId')
  async getUserAlarms(@Param('userId') userId: number) {
    return this.alarmsService.getAlarmsByUser(userId);
  }

  @Delete(':userId')
  async clearUserAlarms(@Param('userId') userId: number) {
    await this.alarmsService.clearAlarms(userId);
    return { message: '알림이 삭제되었습니다.' };
  }
}
