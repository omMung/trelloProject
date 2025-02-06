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
exports.ListsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const list_entity_1 = require("./entities/list.entity");
let ListsService = class ListsService {
    constructor(listsRepository) {
        this.listsRepository = listsRepository;
    }
    async create(createListDto) {
        const { boardId, title } = createListDto;
        const lists = await this.listsRepository.find({
            where: { boardId },
            select: ['position'],
        });
        const maxPosition = lists.length > 0 ? Math.max(...lists.map((list) => list.position)) : 0;
        const newPosition = maxPosition + 1;
        const list = this.listsRepository.create({
            boardId,
            position: newPosition,
            title,
        });
        return this.listsRepository.save(list);
    }
    async update(id, updateListDto) {
        const list = await this.listsRepository.findOne({ where: { id } });
        if (!list) {
            throw new common_1.NotFoundException(`리스트를 찾을 수 없습니다.`);
        }
        const { title } = updateListDto;
        if (title !== undefined) {
            list.title = title;
        }
        return this.listsRepository.save(list);
    }
    async remove(id) {
        const list = await this.listsRepository.findOne({ where: { id } });
        if (!list) {
            throw new common_1.NotFoundException(`List with ID ${id} not found`);
        }
        await this.listsRepository.remove(list);
    }
    async updatePositions(updateListPositionsDto) {
        const { boardId, lists } = updateListPositionsDto;
        const DBLists = await this.listsRepository.find({
            where: { boardId },
            select: ['id', 'position'],
        });
        if (lists.length !== DBLists.length) {
            throw new common_1.BadRequestException('전송된 리스트의 수가 보드에 속한 리스트의 수와 일치하지 않습니다.');
        }
        const DBIds = DBLists.map((list) => list.id);
        const providedIds = lists.map((list) => list.id);
        const allIdsMatch = providedIds.every((id) => DBIds.includes(id));
        if (!allIdsMatch) {
            throw new common_1.BadRequestException('일부 리스트 ID가 지정된 보드에 속해 있지 않습니다.');
        }
        for (let i = 0; i < lists.length; i++) {
            if (lists[i].position !== i + 1) {
                throw new common_1.BadRequestException('잘못된 요청입니다');
            }
        }
        const updatePromises = lists.map((list) => {
            console.log(list);
            return this.listsRepository.update(list.id, { position: list.position });
        });
        await Promise.all(updatePromises);
    }
};
exports.ListsService = ListsService;
exports.ListsService = ListsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(list_entity_1.List)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ListsService);
//# sourceMappingURL=lists.service.js.map