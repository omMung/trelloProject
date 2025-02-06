import { Injectable } from '@nestjs/common';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alarm } from './entities/alarm.entity';

@Injectable()
export class AlarmsService {
  constructor(
    @InjectRepository(Alarm) private alarmRepository: Repository<Alarm>,
  ) {}

  create(createAlarmDto: CreateAlarmDto) {
    return 'This action adds a new alarm';
  }

  async findByUserId(userId: number) {
    const alarmsByUser = await this.alarmRepository.find({
      where: { userId: userId },
    });

    return alarmsByUser;
  }

  remove(id: number) {
    return `This action removes a #${id} alarm`;
  }
}
