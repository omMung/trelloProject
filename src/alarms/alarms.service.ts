import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alarm } from './entities/alarm.entity';

@Injectable()
export class AlarmsService {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepository: Repository<Alarm>,
  ) {}

  async createAlarm(userId: number, message: string): Promise<Alarm> {
    const alarm = this.alarmRepository.create({ userId, message });
    return await this.alarmRepository.save(alarm);
  }

  async getAlarmsByUser(userId: number): Promise<Alarm[]> {
    return await this.alarmRepository.find({ where: { userId } });
  }

  async clearAlarms(userId: number): Promise<void> {
    await this.alarmRepository.delete({ userId });
  }
}
