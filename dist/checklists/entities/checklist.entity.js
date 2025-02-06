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
exports.CheckList = void 0;
const card_entity_1 = require("../../cards/entities/card.entity");
const checkitem_entity_1 = require("../../checkitems/entities/checkitem.entity");
const typeorm_1 = require("typeorm");
let CheckList = class CheckList {
};
exports.CheckList = CheckList;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CheckList.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: false }),
    __metadata("design:type", Number)
], CheckList.prototype, "cardId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: false, unique: true }),
    __metadata("design:type", Number)
], CheckList.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: false }),
    __metadata("design:type", String)
], CheckList.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => card_entity_1.Card, (card) => card.checkList, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'card_id' }),
    __metadata("design:type", card_entity_1.Card)
], CheckList.prototype, "card", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => checkitem_entity_1.CheckItem, (checkItem) => checkItem.checkList),
    __metadata("design:type", Array)
], CheckList.prototype, "checkItems", void 0);
exports.CheckList = CheckList = __decorate([
    (0, typeorm_1.Entity)({
        name: 'CheckList',
    })
], CheckList);
//# sourceMappingURL=checklist.entity.js.map