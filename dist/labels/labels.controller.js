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
exports.LabelsController = void 0;
const common_1 = require("@nestjs/common");
const labels_service_1 = require("./labels.service");
const create_label_dto_1 = require("./dto/create-label.dto");
const update_label_dto_1 = require("./dto/update-label.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let LabelsController = class LabelsController {
    constructor(labelsService) {
        this.labelsService = labelsService;
    }
    async create(req, createLabelDto) {
        const user = req.user;
        const { title, color, boardId } = createLabelDto;
        return this.labelsService.create(user.id, title, color, boardId);
    }
    findAll() {
        return this.labelsService.findAll();
    }
    findOne(id) {
        return this.labelsService.findOne(+id);
    }
    update(id, updateLabelDto) {
        return this.labelsService.update(+id, updateLabelDto);
    }
    remove(id) {
        return this.labelsService.remove(+id);
    }
};
exports.LabelsController = LabelsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_label_dto_1.CreateLabelDto]),
    __metadata("design:returntype", Promise)
], LabelsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LabelsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LabelsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_label_dto_1.UpdateLabelDto]),
    __metadata("design:returntype", void 0)
], LabelsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LabelsController.prototype, "remove", null);
exports.LabelsController = LabelsController = __decorate([
    (0, common_1.Controller)('/labels'),
    __metadata("design:paramtypes", [labels_service_1.LabelsService])
], LabelsController);
//# sourceMappingURL=labels.controller.js.map