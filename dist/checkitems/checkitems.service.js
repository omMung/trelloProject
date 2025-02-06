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
exports.CheckitemsService = void 0;
const common_1 = require("@nestjs/common");
const checkitem_entity_1 = require("./entities/checkitem.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const checklists_service_1 = require("../checklists/checklists.service");
let CheckitemsService = class CheckitemsService {
    constructor(checkitemsRepository, checklistsService) {
        this.checkitemsRepository = checkitemsRepository;
        this.checklistsService = checklistsService;
    }
    async create(createCheckitemDto) {
        try {
            const { checkListId, title } = createCheckitemDto;
            const checkListExists = await this.checklistsService.exists(checkListId);
            if (!checkListExists) {
                throw new common_1.NotFoundException('존재하지 않는 체크리스트입니다.');
            }
            const checkitems = await this.checkitemsRepository.find({
                where: { checkListId },
                select: ['position'],
            });
            const maxPosition = checkitems.length > 0
                ? Math.max(...checkitems.map((list) => list.position))
                : 0;
            const newCheckitem = this.checkitemsRepository.create({
                checkListId,
                title,
                position: maxPosition + 1,
            });
            return this.checkitemsRepository.save(newCheckitem);
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException('서버에 오류가 발생하였습니다.');
        }
    }
    async update(id, updateCheckitemDto) {
        const { checklistId, title, status, position, memberId } = updateCheckitemDto;
        try {
            const checkitem = await this.checkitemsRepository.findOneBy({ id });
            if (!checkitem) {
                throw new common_1.NotFoundException('체크리스트 항목을 찾을 수 없습니다.');
            }
            if (checkitem.checkListId !== checklistId) {
                throw new common_1.BadRequestException('체크리스트의 ID가 일치하지 않습니다.');
            }
            Object.assign(checkitem, updateCheckitemDto);
            return this.checkitemsRepository.save(checkitem);
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException ||
                err instanceof common_1.BadRequestException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException('서버에 오류가 발생하였습니다.');
        }
    }
    async remove(id, updateCheckitemDto) {
        const { checklistId } = updateCheckitemDto;
        try {
            const checkitem = await this.checkitemsRepository.findOneBy({
                id,
            });
            if (!checkitem) {
                throw new common_1.NotFoundException('항목이 없어용.');
            }
            if (checkitem.checkListId !== checklistId) {
                throw new common_1.BadRequestException('체크리스트의 ID가 일치하지 않습니다.');
            }
            await this.checkitemsRepository.remove(checkitem);
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException ||
                err instanceof common_1.BadRequestException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException('서버에 오류가 발생하였습니다.');
        }
    }
};
exports.CheckitemsService = CheckitemsService;
exports.CheckitemsService = CheckitemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(checkitem_entity_1.CheckItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        checklists_service_1.ChecklistsService])
], CheckitemsService);
//# sourceMappingURL=checkitems.service.js.map