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

  async remove(id: number) {
    const result = await this.alarmRepository.delete(id);

    if (result.affected === 0) {
      throw new Error(`이미 존재하지 않는 알람입니다.`);
    }

    console.log(`알람 ID ${id} 삭제 완료`);
  }
}
