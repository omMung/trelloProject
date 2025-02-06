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
let AlarmsListener = class AlarmsListener {
    constructor(alarmRepository) {
        this.alarmRepository = alarmRepository;
        console.log('✅ AlarmsListener 인스턴스 생성됨');
    }
    async handleListCreatedEvent(payload) {
        console.log('list.created 이벤트 감지됨! (AlarmsListener)', payload);
        const membersToNotify = payload.members.filter((id) => id !== payload.senderId);
        if (membersToNotify.length === 0) {
            console.log('알람을 받을 멤버가 없음.');
            return;
        }
        console.log('알람을 DB에 저장 중... 대상 멤버:', membersToNotify);
        const alarms = membersToNotify.map((memberId) => this.alarmRepository.create({
            userId: memberId,
            message: payload.message,
            isRead: false,
            createdAt: new Date(),
        }));
        try {
            await this.alarmRepository.save(alarms);
            console.log('모든 알람이 성공적으로 저장됨');
        }
        catch (error) {
            console.error('알람 저장 실패:', error);
        }
    }
};
exports.AlarmsListener = AlarmsListener;
__decorate([
    (0, event_emitter_1.OnEvent)('list.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AlarmsListener.prototype, "handleListCreatedEvent", null);
exports.AlarmsListener = AlarmsListener = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alarm_entity_1.Alarm)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AlarmsListener);
//# sourceMappingURL=alarms.listener.js.map