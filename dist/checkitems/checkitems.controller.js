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
exports.CheckitemsController = void 0;
const common_1 = require("@nestjs/common");
const checkitems_service_1 = require("./checkitems.service");
const create_checkitem_dto_1 = require("./dto/create-checkitem.dto");
const update_checkitem_dto_1 = require("./dto/update-checkitem.dto");
let CheckitemsController = class CheckitemsController {
    constructor(checkitemsService) {
        this.checkitemsService = checkitemsService;
    }
    async create(createCheckitemDto) {
        return this.checkitemsService.create(createCheckitemDto);
    }
    async update(id, updateCheckitemDto) {
        return this.checkitemsService.update(id, updateCheckitemDto);
    }
    async remove(id, UpdateCheckitemDto) {
        return this.checkitemsService.remove(id, UpdateCheckitemDto);
    }
};
exports.CheckitemsController = CheckitemsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_checkitem_dto_1.CreateCheckitemDto]),
    __metadata("design:returntype", Promise)
], CheckitemsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_checkitem_dto_1.UpdateCheckitemDto]),
    __metadata("design:returntype", Promise)
], CheckitemsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_checkitem_dto_1.UpdateCheckitemDto]),
    __metadata("design:returntype", Promise)
], CheckitemsController.prototype, "remove", null);
exports.CheckitemsController = CheckitemsController = __decorate([
    (0, common_1.Controller)('checkitems'),
    __metadata("design:paramtypes", [checkitems_service_1.CheckitemsService])
], CheckitemsController);
//# sourceMappingURL=checkitems.controller.js.map