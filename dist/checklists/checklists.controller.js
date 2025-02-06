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
exports.ChecklistsController = void 0;
const common_1 = require("@nestjs/common");
const checklists_service_1 = require("./checklists.service");
const create_checklist_dto_1 = require("./dto/create-checklist.dto");
const update_checklist_dto_1 = require("./dto/update-checklist.dto");
let ChecklistsController = class ChecklistsController {
    constructor(checklistsService) {
        this.checklistsService = checklistsService;
    }
    async create(createChecklistDto) {
        return this.checklistsService.create(createChecklistDto);
    }
    async findAll(req) {
        const userId = req.body.userId;
        return this.checklistsService.findAllByUserId(userId);
    }
    async update(id, updateChecklistDto) {
        return this.checklistsService.update(id, updateChecklistDto);
    }
    async remove(id, cardId) {
        return this.checklistsService.remove(id, cardId);
    }
};
exports.ChecklistsController = ChecklistsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_checklist_dto_1.CreateChecklistDto]),
    __metadata("design:returntype", Promise)
], ChecklistsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChecklistsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_checklist_dto_1.UpdateChecklistDto]),
    __metadata("design:returntype", Promise)
], ChecklistsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ChecklistsController.prototype, "remove", null);
exports.ChecklistsController = ChecklistsController = __decorate([
    (0, common_1.Controller)('checklists'),
    __metadata("design:paramtypes", [checklists_service_1.ChecklistsService])
], ChecklistsController);
//# sourceMappingURL=checklists.controller.js.map