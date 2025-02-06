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
  constructor(private readonly alarmService: AlarmsService) {}

  @Post()
  create(@Body() createAlarmDto: CreateAlarmDto) {
    return this.alarmService.create(createAlarmDto);
  }

  @Get(':userId')
  findByUserId(@Param('userId') userId: number) {
    return this.alarmService.findByUserId(+userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alarmService.remove(+id);
  }

  @Delete(':userId')
  removeAll(@Param('userId') id: string) {
    return this.alarmService.remove(+id);
  }
}
