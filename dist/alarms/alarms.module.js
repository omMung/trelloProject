"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const alarms_service_1 = require("./alarms.service");
const alarms_controller_1 = require("./alarms.controller");
const alarm_entity_1 = require("./entities/alarm.entity");
const alarms_gateway_1 = require("./alarms.gateway");
const event_emitter_1 = require("@nestjs/event-emitter");
const alarms_listener_1 = require("./alarms.listener");
let AlarmsModule = class AlarmsModule {
};
exports.AlarmsModule = AlarmsModule;
exports.AlarmsModule = AlarmsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([alarm_entity_1.Alarm]), event_emitter_1.EventEmitterModule],
        controllers: [alarms_controller_1.AlarmsController],
        providers: [alarms_service_1.AlarmsService, alarms_gateway_1.AlarmsGateway, alarms_listener_1.AlarmsListener],
        exports: [alarms_service_1.AlarmsService],
    })
], AlarmsModule);
//# sourceMappingURL=alarms.module.js.map