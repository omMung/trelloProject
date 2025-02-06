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
        const { cardId, title } = createChecklistDto;
        try {
            const cards = await this.checklistRepository.find({
                where: { cardId },
                select: ['position'],
            });
            const maxPosition = cards.length > 0 ? Math.max(...cards.map((list) => list.position)) : 0;
            const newChecklist = this.checklistRepository.create({
                cardId,
                title,
                position: maxPosition + 1,
            });
            return await this.checklistRepository.save(newChecklist);
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('서버에 오류가 발생하였습니다.');
        }
    }
    async findAllByCardId(updateChecklistDto) {
        const { cardId } = updateChecklistDto;
        return await this.checklistRepository.findBy({ cardId });
    }
    async update(id, updateChecklistDto) {
        const { cardId, title, position } = updateChecklistDto;
        try {
            const checklist = await this.checklistRepository.findOneBy({ id });
            if (!checklist) {
                throw new common_1.NotFoundException('체크리스트를 찾을 수 없습니다.');
            }
            if (checklist.cardId !== cardId) {
                throw new common_1.BadRequestException('체크리스트의 카드 ID가 일치하지 않습니다.');
            }
            Object.assign(checklist, updateChecklistDto);
            return await this.checklistRepository.save(checklist);
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException ||
                err instanceof common_1.BadRequestException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException('서버에 오류가 발생하였습니다.');
        }
    }
    async remove(id, updateChecklistDto) {
        const { cardId } = updateChecklistDto;
        try {
            const checklist = await this.checklistRepository.findOneBy({ id });
            if (!checklist) {
                throw new common_1.NotFoundException('체크리스트를 찾을 수 없습니다.');
            }
            if (checklist.cardId !== cardId) {
                throw new common_1.BadRequestException('체크리스트의 카드 ID가 일치하지 않습니다.');
            }
            const result = await this.checklistRepository.delete({ id });
            if (result.affected === 0) {
                throw new common_1.NotFoundException('이 아이디에 해당하는 체크리스트가 없어용.');
            }
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException ||
                err instanceof common_1.BadRequestException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException('서버에 오류가 발생하였습니다.');
        }
    }
    async exists(checkListId) {
        const count = await this.checklistRepository.count({
            where: { id: checkListId },
        });
        return count > 0;
    }
};
exports.ChecklistsService = ChecklistsService;
exports.ChecklistsService = ChecklistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(checklist_entity_1.CheckList)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChecklistsService);
//# sourceMappingURL=checklists.service.js.map