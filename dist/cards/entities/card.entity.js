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
exports.Card = void 0;
const alarm_entity_1 = require("../../alarms/entities/alarm.entity");
const typeorm_1 = require("typeorm");
const comment_entity_1 = require("../../comments/entities/comment.entity");
const card_member_entity_1 = require("../../card-members/entities/card-member.entity");
const checklist_entity_1 = require("../../checklists/entities/checklist.entity");
const card_label_entity_1 = require("../../card-labels/entities/card-label.entity");
const list_entity_1 = require("../../lists/entities/list.entity");
let Card = class Card {
};
exports.Card = Card;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Card.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: false }),
    __metadata("design:type", Number)
], Card.prototype, "listId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: false }),
    __metadata("design:type", String)
], Card.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('int', {}),
    __metadata("design:type", Number)
], Card.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { default: '#FFFFFF' }),
    __metadata("design:type", String)
], Card.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Card.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => alarm_entity_1.Alarm, (alarm) => alarm.card),
    __metadata("design:type", Array)
], Card.prototype, "alarm", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.card),
    __metadata("design:type", Array)
], Card.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => card_member_entity_1.JoinMember, (joinMember) => joinMember.card),
    __metadata("design:type", Array)
], Card.prototype, "joinMember", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => checklist_entity_1.CheckList, (checkList) => checkList.card),
    __metadata("design:type", Array)
], Card.prototype, "checkList", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => card_label_entity_1.CardLabel, (cardLabel) => cardLabel.card),
    __metadata("design:type", Array)
], Card.prototype, "cardLabel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => list_entity_1.List, (list) => list.cards, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'list_id' }),
    __metadata("design:type", list_entity_1.List)
], Card.prototype, "list", void 0);
exports.Card = Card = __decorate([
    (0, typeorm_1.Entity)({
        name: 'Card',
    })
], Card);
//# sourceMappingURL=card.entity.js.map