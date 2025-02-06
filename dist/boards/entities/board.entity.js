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
exports.Board = void 0;
const class_validator_1 = require("class-validator");
const list_entity_1 = require("../../lists/entities/list.entity");
const member_entity_1 = require("../../members/entities/member.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const visibility_enum_1 = require("../dto/visibility.enum");
const typeorm_1 = require("typeorm");
const label_entity_1 = require("../../labels/entities/label.entity");
let Board = class Board {
};
exports.Board = Board;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Board.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: false }),
    __metadata("design:type", Number)
], Board.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: visibility_enum_1.visibEnum }),
    __metadata("design:type", String)
], Board.prototype, "visibility", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)('varchar', {}),
    __metadata("design:type", String)
], Board.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)('varchar', { length: 10, nullable: false }),
    __metadata("design:type", String)
], Board.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Board.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Board.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.boards, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Board.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => list_entity_1.List, (list) => list.board),
    __metadata("design:type", Array)
], Board.prototype, "lists", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => member_entity_1.Member, (member) => member.board),
    __metadata("design:type", Array)
], Board.prototype, "members", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => label_entity_1.Label, (label) => label.board),
    __metadata("design:type", Array)
], Board.prototype, "label", void 0);
exports.Board = Board = __decorate([
    (0, typeorm_1.Entity)({
        name: 'Board',
    })
], Board);
//# sourceMappingURL=board.entity.js.map