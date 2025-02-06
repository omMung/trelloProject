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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const list_entity_1 = require("../lists/entities/list.entity");
const card_entity_1 = require("./entities/card.entity");
const member_entity_1 = require("../members/entities/member.entity");
let CardsService = class CardsService {
    constructor(cardsRepository, listsRepository, memberRepository) {
        this.cardsRepository = cardsRepository;
        this.listsRepository = listsRepository;
        this.memberRepository = memberRepository;
    }
    async findLastPosition() {
        const lastCard = await this.cardsRepository.find({
            order: {
                position: 'DESC',
            },
            take: 1,
        });
        return lastCard[0]?.position ?? 0;
    }
    async createCard(req, createCardDto) {
        const { listId, title, description, color, status } = createCardDto;
        const verifyListId = await this.listsRepository.findOne({
            where: { id: Number(listId) },
        });
        if (lodash_1.default.isNil(verifyListId)) {
            throw new common_1.NotFoundException('리스트 아이디가 존재하지 않습니다.');
        }
        const userId = await this.memberRepository.findOne({
            where: { userId: req.user.id, boardId: verifyListId.boardId },
        });
        if (lodash_1.default.isNil(userId)) {
            throw new common_1.NotFoundException('보드에 소속되지 않아 생성이 불가합니다.');
        }
        const lastPosition = await this.findLastPosition();
        const card = this.cardsRepository.create({
            listId: Number(listId),
            title: title,
            description: description,
            color: color,
            position: lastPosition + 1,
            status,
        });
        await this.cardsRepository.save(card);
        return card;
    }
    async findOne(id, findCardDto) {
        const byCard = await this.cardsRepository.findOneBy({ id });
        if (findCardDto.listId !== byCard.listId) {
            throw new common_1.NotFoundException('리스트 아이디가 존재하지 않습니다.');
        }
        return byCard;
    }
    async updateCard(req, id, updateCardDto) {
        const { listId, title, description, color, status } = updateCardDto;
        const verifyListId = await this.listsRepository.findOne({
            where: { id: Number(listId) },
        });
        if (lodash_1.default.isNil(verifyListId)) {
            throw new common_1.NotFoundException('리스트 아이디가 존재하지 않습니다.');
        }
        const userId = await this.memberRepository.findOne({
            where: { userId: req.user.id, boardId: verifyListId.boardId },
        });
        if (lodash_1.default.isNil(userId)) {
            throw new common_1.NotFoundException('보드에 소속되지 않아 생성이 불가합니다.');
        }
        await this.verifyCards(id);
        await this.cardsRepository.update({ id }, {
            listId: Number(listId),
            title: title,
            description: description,
            color: color,
            status,
        });
    }
    async deleteCard(req, id, deleteCardDto) {
        const verifyListId = await this.listsRepository.findOne({
            where: { id: Number(deleteCardDto.listId) },
        });
        if (lodash_1.default.isNil(verifyListId)) {
            throw new common_1.NotFoundException('리스트 아이디가 존재하지 않습니다.');
        }
        const userId = await this.memberRepository.findOne({
            where: { userId: req.user.id, boardId: verifyListId.boardId },
        });
        if (lodash_1.default.isNil(userId)) {
            throw new common_1.NotFoundException('보드에 소속되지 않아 생성이 불가합니다.');
        }
        await this.verifyCards(id);
        await this.cardsRepository.delete({ id });
    }
    async verifyCards(id) {
        const pickCard = await this.cardsRepository.findOneBy({
            id,
        });
        if (lodash_1.default.isNil(pickCard)) {
            throw new common_1.NotFoundException('해당 카드를 찾을 수 없습니다.');
        }
    }
    async updatePositions(updateCardPositionsDto) {
        const { listId, cards } = updateCardPositionsDto;
        const DBCards = await this.cardsRepository.find({
            where: { listId },
            select: ['id', 'position'],
        });
        if (cards.length !== DBCards.length) {
            throw new common_1.BadRequestException('전송된 카드의 수가 리스트에 속한 카드의 수와 일치하지 않습니다.');
        }
        const DBIds = DBCards.map((card) => card.id);
        const providedIds = cards.map((card) => card.id);
        const allIdsMatch = providedIds.every((id) => DBIds.includes(id));
        if (!allIdsMatch) {
            throw new common_1.BadRequestException('일부 card ID가 지정된 리스트에 속해 있지 않습니다.');
        }
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].position !== i + 1) {
                throw new common_1.BadRequestException('잘못된 요청입니다');
            }
        }
        const updatePromises = cards.map((card) => {
            console.log(card);
            return this.cardsRepository.update(card.id, { position: card.position });
        });
        await Promise.all(updatePromises);
    }
};
exports.CardsService = CardsService;
exports.CardsService = CardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(card_entity_1.Card)),
    __param(1, (0, typeorm_1.InjectRepository)(list_entity_1.List)),
    __param(2, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CardsService);
//# sourceMappingURL=cards.service.js.map