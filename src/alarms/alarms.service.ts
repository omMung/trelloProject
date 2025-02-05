import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alarm } from './entities/alarm.entity';
import { CreateAlarmDto } from './dto/create-alarm.dto';

@Injectable()
export class AlarmsService {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepository: Repository<Alarm>,
  ) {}

  async createAlarm(createAlarmDto: CreateAlarmDto): Promise<Alarm> {
    const alarm = this.alarmRepository.create(createAlarmDto);
    return this.alarmRepository.save(alarm);
  }

  async getAlarmsByUser(userId: number): Promise<Alarm[]> {
    return this.alarmRepository.find({ where: { userId } });
  }

  async clearAlarms(userId: number): Promise<void> {
    await this.alarmRepository.delete({ userId });
  }
}
