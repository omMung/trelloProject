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
exports.File = void 0;
const card_entity_1 = require("../../cards/entities/card.entity");
const typeorm_1 = require("typeorm");
let File = class File {
};
exports.File = File;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], File.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], File.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => card_entity_1.Card, (card) => card.files, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'card_id' }),
    __metadata("design:type", card_entity_1.Card)
], File.prototype, "card", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], File.prototype, "cardId", void 0);
exports.File = File = __decorate([
    (0, typeorm_1.Entity)({
        name: 'Files',
    })
], File);
//# sourceMappingURL=file.entity.js.map