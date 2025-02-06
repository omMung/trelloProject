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
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const board_entity_1 = require("./entities/board.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let BoardsService = class BoardsService {
    constructor(BoardRepository) {
        this.BoardRepository = BoardRepository;
    }
    async create(createBoardDto) {
        const { title, visibility, color, userId } = createBoardDto;
        const newBoard = this.BoardRepository.create({
            userId,
            title,
            visibility,
            color
        });
        try {
            await this.BoardRepository.save(newBoard);
            return { message: "보드를 성공적으로 생성했습니다." };
        }
        catch (error) {
            throw new Error("보드 생성에 실패했습니다.");
        }
    }
    async findAll() {
        try {
            const allBoard = await this.BoardRepository.find({
                select: ['id', 'visibility', 'color', 'title']
            });
            return { message: "모든 보드를 성공적으로 조회했습니다",
                data: allBoard
            };
        }
        catch (error) {
            throw new common_1.NotFoundException("보드 전체 조회중에 에러가 발생했습니다.");
        }
    }
    async findOne(id) {
        try {
            const Board = await this.BoardRepository.findOne({
                where: { id: id },
                select: ['id', 'visibility', 'color', 'title']
            });
            if (!Board) {
                throw new common_1.NotFoundException("해당 보드를 찾을수 없습니다");
            }
            return { message: "하나의 보드를 성공적으로 조회했습니다",
                data: Board
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.NotFoundException("보드 상세 조회중에 에러가 발생했습니다.");
        }
    }
    async update(id, updateBoardDto) {
        const { title, visibility, color } = updateBoardDto;
        try {
            const board = await this.BoardRepository.findOne({ where: { id } });
            if (!board) {
                throw new common_1.NotFoundException('보드를 찾을 수 없습니다.');
            }
            await this.BoardRepository.update(id, {
                title,
                visibility,
                color
            });
            const newboard = await this.BoardRepository.findOne({ where: { id } });
            return {
                message: "보드를 성공적으로 수정했습니다",
                data: newboard
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.NotFoundException('보드 수정에 에러가 발생했습니다.');
            }
        }
    }
    async remove(id) {
        try {
            const board = await this.BoardRepository.findOne({
                where: { id }
            });
            if (!board) {
                throw new common_1.NotFoundException("삭제할 대상 보드를 찾을수 없습니다");
            }
            await this.BoardRepository.remove(board);
            return { message: "보드를 성공적으로 삭제했습니다" };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.NotFoundException('보드 삭제에 에러가 발생했습니다.');
            }
        }
    }
};
exports.BoardsService = BoardsService;
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_entity_1.Board)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BoardsService);
//# sourceMappingURL=boards.service.js.map