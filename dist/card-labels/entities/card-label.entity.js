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
exports.CardLabel = void 0;
const card_entity_1 = require("../../cards/entities/card.entity");
const label_entity_1 = require("../../labels/entities/label.entity");
const typeorm_1 = require("typeorm");
let CardLabel = class CardLabel {
};
exports.CardLabel = CardLabel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CardLabel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: false }),
    __metadata("design:type", Number)
], CardLabel.prototype, "labelId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'card_id', nullable: false }),
    __metadata("design:type", Number)
], CardLabel.prototype, "cardId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => card_entity_1.Card, (card) => card.cardLabel, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'card_id' }),
    __metadata("design:type", card_entity_1.Card)
], CardLabel.prototype, "card", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => label_entity_1.Label, (label) => label.cardLabels, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'label_id' }),
    __metadata("design:type", label_entity_1.Label)
], CardLabel.prototype, "label", void 0);
exports.CardLabel = CardLabel = __decorate([
    (0, typeorm_1.Entity)({
        name: 'CardLabel',
    }),
    (0, typeorm_1.Unique)(['cardId', 'labelId'])
], CardLabel);
//# sourceMappingURL=card-label.entity.js.map