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
let CardLabelsService = class CardLabelsService {
    constructor(cardLabelRepository, cardRepository, labelRepository) {
        this.cardLabelRepository = cardLabelRepository;
        this.cardRepository = cardRepository;
        this.labelRepository = labelRepository;
    }
    async create(createCardLabelDto) {
        try {
            const { cardId, labelId } = createCardLabelDto;
            const card = await this.cardRepository.findOneBy({ id: cardId });
            if (!card) {
                throw new common_1.BadRequestException(`해당하는 카드가 존재하지 않습니다.`);
            }
            const label = await this.labelRepository.findOneBy({ id: labelId });
            if (!label) {
                throw new common_1.BadRequestException(`해당하는 라벨이 존재하지 않습니다.`);
            }
            const cardLabel = this.cardLabelRepository.create(createCardLabelDto);
            return await this.cardLabelRepository.save(cardLabel);
        }
        catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new common_1.ConflictException(`이미 지정되어 있는 라벨입니다.`);
            }
            throw new common_1.InternalServerErrorException('서버에 오류가 발생하였습니다.');
        }
    }
    async findAll() {
        try {
            return await this.cardLabelRepository.find();
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('서버에 오류가 발생하였습니다.');
        }
    }
    async update(id, updateCardLabelDto) {
        const { cardId, labelId } = updateCardLabelDto;
        const cardLabel = await this.cardLabelRepository.findOneBy({ id: cardId });
        if (!cardLabel) {
            throw new common_1.NotFoundException(`해당하는 카드 라벨이 존재하지 않습니다.`);
        }
        const label = await this.labelRepository.findOneBy({ id: labelId });
        if (!label) {
            throw new common_1.BadRequestException(`해당하는 라벨이 존재하지 않습니다.`);
        }
        Object.assign(cardLabel, updateCardLabelDto);
        return await this.cardLabelRepository.save(cardLabel);
    }
    async remove(id) {
        const cardLabel = await this.cardLabelRepository.findOneBy({ id });
        if (!cardLabel) {
            throw new common_1.NotFoundException(`해당하는 지정 라벨이 존재하지 않습니다.`);
        }
        await this.cardLabelRepository.delete(id);
        return `지정 라벨을 삭제하였습니다.`;
    }
};
exports.CardLabelsService = CardLabelsService;
exports.CardLabelsService = CardLabelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(card_label_entity_1.CardLabel)),
    __param(1, (0, typeorm_2.InjectRepository)(card_entity_1.Card)),
    __param(2, (0, typeorm_2.InjectRepository)(label_entity_1.Label)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], CardLabelsService);
//# sourceMappingURL=card-labels.service.js.map