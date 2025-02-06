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
exports.CreateCardLabelDto = void 0;
const class_validator_1 = require("class-validator");
class CreateCardLabelDto {
}
exports.CreateCardLabelDto = CreateCardLabelDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '카드를 선택해주세요.' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCardLabelDto.prototype, "cardId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '라벨을 선택해주세요.' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCardLabelDto.prototype, "labelId", void 0);
//# sourceMappingURL=create-card-label.dto.js.map