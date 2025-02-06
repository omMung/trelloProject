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
const card_entity_1 = require("./entities/card.entity");
let CardsService = class CardsService {
    constructor(cardsRepository) {
        this.cardsRepository = cardsRepository;
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
    async createCard(createCardDto) {
        const { listId, title, description, color, status } = createCardDto;
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
    async findOne(id, listId) {
        return await this.cardsRepository.findOneBy({ id });
    }
    async updateCard(id, updateCardDto) {
        const { listId, title, description, color, status } = updateCardDto;
        await this.verifyCards(id, updateCardDto);
        await this.cardsRepository.update({ id }, {
            listId: Number(listId),
            title: title,
            description: description,
            color: color,
            status,
        });
    }
    async deleteCard(id, listId) {
        await this.cardsRepository.delete({ id });
    }
    async verifyCards(id, updateCardDto) {
        const pickCard = await this.cardsRepository.findOneBy({
            id,
        });
        if (lodash_1.default.isNil(pickCard) || pickCard.listId !== updateCardDto.listId) {
            throw new common_1.NotFoundException('메시지를 찾을 수 없거나 수정/삭제할 권한이 없습니다.');
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
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CardsService);
//# sourceMappingURL=cards.service.js.map