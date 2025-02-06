import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alarm } from './entities/alarm.entity';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AlarmsListener {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepository: Repository<Alarm>,
  ) {
    console.log('✅ AlarmsListener 인스턴스 생성됨');
  }

  // ✅ list.created 이벤트 발생 시 알람 저장
  @OnEvent('list.created')
  async handleListCreatedEvent(payload: {
    senderId: number;
    boardId: number;
    members: number[];
    message: string;
  }) {
    console.log('list.created 이벤트 감지됨! (AlarmsListener)', payload);

    // senderId 제외 (자기 자신에게 알람 안 보냄)
    const membersToNotify = payload.members.filter(
      (id) => id !== payload.senderId,
    );

    if (membersToNotify.length === 0) {
      console.log('알람을 받을 멤버가 없음.');
      return;
    }

    console.log('알람을 DB에 저장 중... 대상 멤버:', membersToNotify);

    // 각 멤버에 대해 알람 저장
    const alarms = membersToNotify.map((memberId) =>
      this.alarmRepository.create({
        userId: memberId,
        message: payload.message, // 이벤트에서 가져온 메시지 사용
        isRead: false,
        createdAt: new Date(),
      }),
    );

    try {
      await this.alarmRepository.save(alarms);
      console.log('모든 알람이 성공적으로 저장됨');
    } catch (error) {
      console.error('알람 저장 실패:', error);
    }
  }
}
