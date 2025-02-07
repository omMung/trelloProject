"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmsListener = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const alarm_entity_1 = require("./entities/alarm.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
const alarms_gateway_1 = require("./alarms.gateway");
let AlarmsListener = class AlarmsListener {
    constructor(alarmRepository, alarmsGateway) {
        this.alarmRepository = alarmRepository;
        this.alarmsGateway = alarmsGateway;
        this.SUPPORTED_EVENTS = [
            'list.created',
            'comment.created',
            'comment.updated',
            'comment.deleted',
        ];
    }
    async createAndNotifyAlarms(senderId, boardId, members, message) {
        const membersToNotify = members.filter((id) => id !== senderId);
        if (membersToNotify.length === 0) {
            console.log(`[알람] 전송할 대상이 없음 (보드 ${boardId})`);
            return;
        }
        console.log(`[알람] 저장 중... 대상 멤버:`, membersToNotify);
        const alarms = membersToNotify.map((memberId) => this.alarmRepository.create({
            userId: memberId,
            message,
            isRead: false,
            createdAt: new Date(),
        }));
        try {
            await this.alarmRepository.save(alarms);
            console.log(`[알람] 성공적으로 저장됨 (보드 ${boardId})`);
            membersToNotify.forEach((userId) => {
                this.alarmsGateway.notifyUser(userId);
            });
        }
        catch (error) {
            console.error(`[알람] 저장 실패:`, error);
        }
    }
    async handleDynamicEvent(event, payload) {
        if (this.SUPPORTED_EVENTS.includes(event)) {
            console.log(`[이벤트] ${event} 감지됨:`, payload);
            await this.createAndNotifyAlarms(payload.senderId, payload.boardId, payload.members, payload.message);
        }
    }
};
exports.AlarmsListener = AlarmsListener;
__decorate([
    (0, event_emitter_1.OnEvent)('*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AlarmsListener.prototype, "handleDynamicEvent", null);
exports.AlarmsListener = AlarmsListener = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alarm_entity_1.Alarm)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        alarms_gateway_1.AlarmsGateway])
], AlarmsListener);
//# sourceMappingURL=alarms.listener.js.map