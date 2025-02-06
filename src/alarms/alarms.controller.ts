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

@Controller('alarm')
export class AlarmsController {
  constructor(private readonly alarmService: AlarmsService) {}

  @Post()
  create(@Body() createAlarmDto: CreateAlarmDto) {
    return this.alarmService.create(createAlarmDto);
  }

  @Get(':id')
  findByUserId(@Param('id') id: Number) {
    return this.alarmService.findByUserId(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alarmService.remove(+id);
  }
}
