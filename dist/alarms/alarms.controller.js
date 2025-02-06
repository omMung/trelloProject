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
exports.AlarmsController = void 0;
const common_1 = require("@nestjs/common");
const alarms_service_1 = require("./alarms.service");
const create_alarm_dto_1 = require("./dto/create-alarm.dto");
const update_alarm_dto_1 = require("./dto/update-alarm.dto");
let AlarmsController = class AlarmsController {
    constructor(alarmsService) {
        this.alarmsService = alarmsService;
    }
    create(createAlarmDto) {
        return this.alarmsService.create(createAlarmDto);
    }
    findAll() {
        return this.alarmsService.findAll();
    }
    findOne(id) {
        return this.alarmsService.findOne(+id);
    }
    update(id, updateAlarmDto) {
        return this.alarmsService.update(+id, updateAlarmDto);
    }
    remove(id) {
        return this.alarmsService.remove(+id);
    }
};
exports.AlarmsController = AlarmsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_alarm_dto_1.CreateAlarmDto]),
    __metadata("design:returntype", void 0)
], AlarmsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AlarmsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlarmsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_alarm_dto_1.UpdateAlarmDto]),
    __metadata("design:returntype", void 0)
], AlarmsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlarmsController.prototype, "remove", null);
exports.AlarmsController = AlarmsController = __decorate([
    (0, common_1.Controller)('alarms'),
    __metadata("design:paramtypes", [alarms_service_1.AlarmsService])
], AlarmsController);
//# sourceMappingURL=alarms.controller.js.map