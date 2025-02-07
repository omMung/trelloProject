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
exports.AlarmsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const alarm_entity_1 = require("./entities/alarm.entity");
let AlarmsService = class AlarmsService {
    constructor(alarmRepository) {
        this.alarmRepository = alarmRepository;
    }
    create(createAlarmDto) {
        return 'This action adds a new alarm';
    }
    async findByUserId(userId) {
        const alarmsByUser = await this.alarmRepository.find({
            where: { userId: userId },
        });
        return alarmsByUser;
    }
    async remove(id) {
        const result = await this.alarmRepository.delete(id);
        if (result.affected === 0) {
            throw new Error(`이미 존재하지 않는 알람입니다.`);
        }
        console.log(`알람 ID ${id} 삭제 완료`);
    }
};
exports.AlarmsService = AlarmsService;
exports.AlarmsService = AlarmsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alarm_entity_1.Alarm)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AlarmsService);
//# sourceMappingURL=alarms.service.js.map