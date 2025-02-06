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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alarm = void 0;
const card_entity_1 = require("../../cards/entities/card.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let Alarm = class Alarm {
};
exports.Alarm = Alarm;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Alarm.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: false }),
    __metadata("design:type", Number)
], Alarm.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: false }),
    __metadata("design:type", Number)
], Alarm.prototype, "cardId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: false }),
    __metadata("design:type", String)
], Alarm.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Alarm.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.alarms, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Alarm.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => card_entity_1.Card, (card) => card.alarm),
    (0, typeorm_1.JoinColumn)({ name: 'card_id' }),
    __metadata("design:type", card_entity_1.Card)
], Alarm.prototype, "card", void 0);
exports.Alarm = Alarm = __decorate([
    (0, typeorm_1.Entity)({
        name: 'Alarm',
    })
], Alarm);
//# sourceMappingURL=alarm.entity.js.map