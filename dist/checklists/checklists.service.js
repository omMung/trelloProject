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
exports.ChecklistsService = void 0;
const common_1 = require("@nestjs/common");
const checklist_entity_1 = require("./entities/checklist.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ChecklistsService = class ChecklistsService {
    constructor(checklistRepository) {
        this.checklistRepository = checklistRepository;
    }
    async create(createChecklistDto) {
        try {
            const newChecklist = this.checklistRepository.create(createChecklistDto);
            return await this.checklistRepository.save(newChecklist);
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('서버에 오류가 발생하였습니다.');
        }
    }
    async findAllByUserId(userId) {
        return this.checklistRepository.find({ where: { id: userId } });
    }
    async update(id, updateChecklistDto) {
        try {
            const checklist = await this.checklistRepository.findOneBy({ id });
            if (!checklist) {
                throw new common_1.NotFoundException('체크리스트를 찾을 수 없습니다.');
            }
            Object.assign(checklist, updateChecklistDto);
            return await this.checklistRepository.save(checklist);
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('서버에 오류가 발생하였습니다.');
        }
    }
    async remove(id, cardId) {
        try {
            const result = await this.checklistRepository.delete({ id });
            if (result.affected === 0) {
                throw new common_1.NotFoundException('이 아이디에 해당하는 체크리스트가 없어용.');
            }
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('서버에 오류가 발생하였습니다.');
        }
    }
};
exports.ChecklistsService = ChecklistsService;
exports.ChecklistsService = ChecklistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(checklist_entity_1.CheckList)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChecklistsService);
//# sourceMappingURL=checklists.service.js.map