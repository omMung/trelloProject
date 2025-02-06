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
exports.LabelsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const label_entity_1 = require("./entities/label.entity");
const typeorm_2 = require("typeorm");
let LabelsService = class LabelsService {
    constructor(labelRepository) {
        this.labelRepository = labelRepository;
    }
    async create(createLabelDto) {
        if (!/^#([0-9A-F]{3}){1,2}$/i.test(createLabelDto.color)) {
            throw new common_1.BadRequestException('유효한 색상 코드(#RRGGBB)를 입력하세요.');
        }
        const label = this.labelRepository.create(createLabelDto);
        return await this.labelRepository.save(label);
    }
    async findAll() {
        return await this.labelRepository.find();
    }
    async findOne(id) {
        const label = await this.labelRepository.findOneBy({ id });
        if (!label) {
            throw new common_1.NotFoundException(`해당하는 라벨을 찾을 수 없습니다.`);
        }
        return label;
    }
    async update(id, updateLabelDto) {
        const label = await this.labelRepository.findOneBy({ id });
        if (!label) {
            throw new common_1.NotFoundException(`해당하는 라벨이 존재하지 않습니다.`);
        }
        if (updateLabelDto.color &&
            !/^#([0-9A-F]{3}){1,2}$/i.test(updateLabelDto.color)) {
            throw new common_1.BadRequestException('유효한 색상 코드(#RRGGBB)를 입력하세요.');
        }
        Object.assign(label, updateLabelDto);
        return await this.labelRepository.save(label);
    }
    async remove(id) {
        const label = await this.labelRepository.findOneBy({ id });
        if (!label) {
            throw new common_1.NotFoundException(`ID ${id}에 해당하는 라벨이 존재하지 않습니다.`);
        }
        await this.labelRepository.delete(id);
        return { message: '라벨이 성공적으로 삭제되었습니다.' };
    }
};
exports.LabelsService = LabelsService;
exports.LabelsService = LabelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(label_entity_1.Label)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LabelsService);
//# sourceMappingURL=labels.service.js.map