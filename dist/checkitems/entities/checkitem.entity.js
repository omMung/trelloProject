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
exports.CheckItem = void 0;
const checklist_entity_1 = require("../../checklists/entities/checklist.entity");
const typeorm_1 = require("typeorm");
let CheckItem = class CheckItem {
};
exports.CheckItem = CheckItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CheckItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: false }),
    __metadata("design:type", Number)
], CheckItem.prototype, "checkListId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], CheckItem.prototype, "memberId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: false }),
    __metadata("design:type", String)
], CheckItem.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: false, unique: true }),
    __metadata("design:type", Number)
], CheckItem.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { nullable: false }),
    __metadata("design:type", Boolean)
], CheckItem.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => checklist_entity_1.CheckList, (checkList) => checkList.checkItems, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'check_list_id' }),
    __metadata("design:type", checklist_entity_1.CheckList)
], CheckItem.prototype, "checkList", void 0);
exports.CheckItem = CheckItem = __decorate([
    (0, typeorm_1.Entity)({
        name: 'CheckItem',
    })
], CheckItem);
//# sourceMappingURL=checkitem.entity.js.map