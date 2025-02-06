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
exports.Label = void 0;
const card_label_entity_1 = require("../../card-labels/entities/card-label.entity");
const typeorm_1 = require("typeorm");
let Label = class Label {
};
exports.Label = Label;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Label.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: false }),
    __metadata("design:type", String)
], Label.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: false }),
    __metadata("design:type", String)
], Label.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => card_label_entity_1.CardLabel, (cardLabel) => cardLabel.label),
    __metadata("design:type", Array)
], Label.prototype, "cardLabels", void 0);
exports.Label = Label = __decorate([
    (0, typeorm_1.Entity)({
        name: 'Label',
    }),
    (0, typeorm_1.Unique)(['title', 'color'])
], Label);
//# sourceMappingURL=label.entity.js.map