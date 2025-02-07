import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alarm } from './entities/alarm.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { AlarmsGateway } from './alarms.gateway';

@Injectable()
export class AlarmsListener {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepository: Repository<Alarm>,
    private readonly alarmsGateway: AlarmsGateway,
  ) {}

  // 알람 생성 후 웹소켓 전송 공통 메서드
  private async createAndNotifyAlarms(
    senderId: number, // 이벤트 발생시킨 유저(알람 대상 제외)
    boardId: number, // 알람이 발생한 보드 ID
    members: number[], // 알림 대상인 멤버들의 ID
    message: string, // 전송될 알림 메시지
  ) {
    // members 배열에서 senderId 유저 제외한 새로운 배열 생성
    // ID가 senderId가 아닌 사람만 남긴 배열 생성
    const membersToNotify = members.filter((id) => id !== senderId);
    // 알림 대상이 없을 경우 처리
    if (membersToNotify.length === 0) {
      console.log(`[알람] 전송할 대상이 없음 (보드 ${boardId})`);
      return;
    }

    console.log(`[알람] 저장 중... 대상 멤버:`, membersToNotify);
    // membersToNotify의 id가 memberId 자리에 매개변수로 들어감
    // map을 사용하여 id별로 순회하며 알람 생성
    const alarms = membersToNotify.map((memberId) =>
      this.alarmRepository.create({
        userId: memberId,
        message,
        isRead: false,
        createdAt: new Date(),
      }),
    );

    try {
      // 알람 db에 저장 및 로그 전송
      await this.alarmRepository.save(alarms);
      console.log(`[알람] 성공적으로 저장됨 (보드 ${boardId})`);

      membersToNotify.forEach((userId) => {
        this.alarmsGateway.notifyUser(userId);
      });
    } catch (error) {
      console.error(`[알람] 저장 실패:`, error);
    }
  }

  // 동적 이벤트 핸들러
  private readonly SUPPORTED_EVENTS = [
    'list.created',
    'comment.created',
    'comment.updated',
    'comment.deleted',
  ];

  @OnEvent('*') // 모든 이벤트 감지
  async handleDynamicEvent(
    event: string,
    payload: {
      senderId: number;
      boardId: number;
      members: number[];
      message: string;
    },
  ) {
    // SUPPORTED_EVENTS에 포함되는 조건이 true라면 감지
    if (this.SUPPORTED_EVENTS.includes(event)) {
      console.log(`[이벤트] ${event} 감지됨:`, payload);
      await this.createAndNotifyAlarms(
        payload.senderId,
        payload.boardId,
        payload.members,
        payload.message,
      );
    }
  }
}
