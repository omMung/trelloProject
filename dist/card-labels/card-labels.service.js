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
exports.CardLabelsService = void 0;
const common_1 = require("@nestjs/common");
const card_label_entity_1 = require("./entities/card-label.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const card_entity_1 = require("../cards/entities/card.entity");
const label_entity_1 = require("../labels/entities/label.entity");
const member_entity_1 = require("../members/entities/member.entity");
const card_label_exception_1 = require("../common/exceptions/card-label.exception");
let CardLabelsService = class CardLabelsService {
    constructor(cardLabelRepository, cardRepository, labelRepository, memberRepository) {
        this.cardLabelRepository = cardLabelRepository;
        this.cardRepository = cardRepository;
        this.labelRepository = labelRepository;
        this.memberRepository = memberRepository;
    }
    async create(userId, cardId, labelId) {
        const card = await this.cardRepository.findOne({
            where: { id: cardId },
            relations: ['list', 'list.board'],
        });
        if (!card || !card.list || !card.list.board) {
            throw new card_label_exception_1.CardNotFoundException();
        }
        const boardId = card.list.board.id;
        await this.isUserMember(userId, boardId);
        const label = await this.labelRepository.findOneBy({ id: labelId });
        if (!label) {
            throw new card_label_exception_1.LabelNotFoundException();
        }
        try {
            const cardLabel = this.cardLabelRepository.create({ cardId, labelId });
            return await this.cardLabelRepository.save(cardLabel);
        }
        catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new card_label_exception_1.CardLabelConflictException();
            }
            throw new card_label_exception_1.CardLabelInternalServerErrorException();
        }
    }
    async findAll(userId, cardId) {
        const card = await this.cardRepository.findOne({
            where: { id: cardId },
            relations: ['list', 'list.board'],
        });
        if (!card || !card.list || !card.list.board) {
            throw new card_label_exception_1.CardLabelNotFoundException();
        }
        const boardId = card.list.board.id;
        await this.isUserMember(userId, boardId);
        try {
            return await this.cardLabelRepository.find({
                where: { cardId: cardId },
            });
        }
        catch (err) {
            throw new card_label_exception_1.CardLabelInternalServerErrorException();
        }
    }
    async update(userId, cardId, labelId, id) {
        const card = await this.cardRepository.findOne({
            where: { id: cardId },
            relations: ['list', 'list.board'],
        });
        if (!card || !card.list || !card.list.board) {
            throw new card_label_exception_1.CardNotFoundException();
        }
        const boardId = card.list.board.id;
        await this.isUserMember(userId, boardId);
        const cardLabel = await this.cardLabelRepository.findOneBy({
            id: id,
        });
        if (!cardLabel) {
            throw new card_label_exception_1.CardLabelNotFoundException();
        }
        const label = await this.labelRepository.findOneBy({ id: labelId });
        if (!label) {
            throw new card_label_exception_1.LabelNotFoundException();
        }
        try {
            Object.assign(cardLabel, { cardId: cardId, labelId: labelId });
            return await this.cardLabelRepository.save(cardLabel);
        }
        catch (err) {
            throw new card_label_exception_1.CardLabelConflictException();
        }
    }
    async remove(id) {
        const cardLabel = await this.cardLabelRepository.findOneBy({ id });
        if (!cardLabel) {
            throw new card_label_exception_1.LabelNotFoundException();
        }
        await this.cardLabelRepository.delete(id);
        return `지정 라벨을 삭제하였습니다.`;
    }
    async isUserMember(userId, boardId) {
        const member = await this.memberRepository.findOne({
            where: { userId, boardId },
        });
        if (!member) {
            throw new card_label_exception_1.BoardMembersForbiddenException();
        }
    }
};
exports.CardLabelsService = CardLabelsService;
exports.CardLabelsService = CardLabelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(card_label_entity_1.CardLabel)),
    __param(1, (0, typeorm_2.InjectRepository)(card_entity_1.Card)),
    __param(2, (0, typeorm_2.InjectRepository)(label_entity_1.Label)),
    __param(3, (0, typeorm_2.InjectRepository)(member_entity_1.Member)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], CardLabelsService);
//# sourceMappingURL=card-labels.service.js.map