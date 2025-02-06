import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alarm } from './entities/alarm.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { AlarmsGateway } from './alarms.gateway'; // 추가

@Injectable()
export class AlarmsListener {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepository: Repository<Alarm>,
    private readonly alarmsGateway: AlarmsGateway, // 추가
  ) {}

  @OnEvent('list.created')
  async handleListCreatedEvent(payload: {
    senderId: number;
    boardId: number;
    members: number[];
    message: string;
  }) {
    console.log('list.created 이벤트 감지됨! (AlarmsListener)', payload);

    const membersToNotify = payload.members.filter(
      (id) => id !== payload.senderId,
    );

    if (membersToNotify.length === 0) {
      console.log('알람을 받을 멤버가 없음.');
      return;
    }

    console.log('알람을 DB에 저장 중... 대상 멤버:', membersToNotify);

    const alarms = membersToNotify.map((memberId) =>
      this.alarmRepository.create({
        userId: memberId,
        message: payload.message,
        isRead: false,
        createdAt: new Date(),
      }),
    );

    try {
      await this.alarmRepository.save(alarms);
      console.log('모든 알람이 성공적으로 저장됨');

      // 저장된 알람 대상 유저들에게 웹소켓 알림 전송
      membersToNotify.forEach((userId) => {
        this.alarmsGateway.notifyUser(userId);
      });
    } catch (error) {
      console.error('알람 저장 실패:', error);
    }
  }
}
