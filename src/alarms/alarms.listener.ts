import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AlarmsService } from './alarms.service';
import { AlarmsGateway } from './alarms.gateway';

@Injectable()
export class AlarmsListener {
  constructor(
    private readonly alarmsService: AlarmsService,
    private readonly alarmsGateway: AlarmsGateway,
  ) {}

  @OnEvent('list.created')
  async handleListCreatedEvent(event: {
    senderId: number;
    boardId: number;
    members: number[];
    message: string;
  }) {
    for (const memberId of event.members) {
      if (memberId !== event.senderId) {
        // 본인 제외
        const alarm = await this.alarmsService.createAlarm(
          memberId,
          event.message,
        );
        this.alarmsGateway.server
          .to(`user-${memberId}`)
          .emit('receiveAlarm', alarm);
      }
    }
  }
}
