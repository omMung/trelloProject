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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardLabelsController = void 0;
const common_1 = require("@nestjs/common");
const card_labels_service_1 = require("./card-labels.service");
const create_card_label_dto_1 = require("./dto/create-card-label.dto");
const update_card_label_dto_1 = require("./dto/update-card-label.dto");
let CardLabelsController = class CardLabelsController {
    constructor(cardLabelsService) {
        this.cardLabelsService = cardLabelsService;
    }
    create(createCardLabelDto) {
        return this.cardLabelsService.create(createCardLabelDto);
    }
    findAll() {
        return this.cardLabelsService.findAll();
    }
    update(id, updateCardLabelDto) {
        return this.cardLabelsService.update(+id, updateCardLabelDto);
    }
    remove(id) {
        return this.cardLabelsService.remove(+id);
    }
};
exports.CardLabelsController = CardLabelsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_card_label_dto_1.CreateCardLabelDto]),
    __metadata("design:returntype", void 0)
], CardLabelsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CardLabelsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_card_label_dto_1.UpdateCardLabelDto]),
    __metadata("design:returntype", void 0)
], CardLabelsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CardLabelsController.prototype, "remove", null);
exports.CardLabelsController = CardLabelsController = __decorate([
    (0, common_1.Controller)('/card-labels'),
    __metadata("design:paramtypes", [card_labels_service_1.CardLabelsService])
], CardLabelsController);
//# sourceMappingURL=card-labels.controller.js.map