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
exports.CommentsService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const lodash_1 = __importDefault(require("lodash"));
const comment_entity_1 = require("./entities/comment.entity");
let CommentsService = class CommentsService {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async createComment(cardId, userId, content) {
        if (lodash_1.default.isEmpty(content.trim())) {
            throw new common_1.BadRequestException('댓글 내용을 비울 수 없습니다.');
        }
        if (content.length > 50) {
            throw new common_1.BadRequestException('댓글 내용은 50자를 넘길 수 없습니다.');
        }
        const newComment = this.commentRepository.create({
            cardId,
            userId,
            content,
        });
        return await this.commentRepository.save(newComment);
    }
    async getCommentByCardId(cardId) {
        return await this.commentRepository.findBy({
            cardId: cardId,
        });
    }
    async getCommentById(id) {
        const comment = await this.commentRepository.findOneBy({ id });
        if (lodash_1.default.isNil(comment)) {
            throw new common_1.NotFoundException('댓글을 찾을 수 없습니다.');
        }
        return comment;
    }
    async updateComment(id, userId, content) {
        if (lodash_1.default.isEmpty(content.trim())) {
            throw new common_1.BadRequestException('댓글 내용을 비울 수 없습니다.');
        }
        if (content.length > 50) {
            throw new common_1.BadRequestException('댓글 내용은 50자를 넘길 수 없습니다.');
        }
        await this.verifyComment(id, userId);
        await this.commentRepository.update({ id }, { content });
        return await this.commentRepository.findOneBy({ id });
    }
    async deleteComment(id, userId) {
        await this.verifyComment(id, userId);
        await this.commentRepository.delete({ id });
        return { id, message: '삭제되었습니다.' };
    }
    async verifyComment(id, userId) {
        const comment = await this.commentRepository.findOneBy({
            id,
        });
        if (lodash_1.default.isNil(comment) || comment.userId !== userId) {
            throw new common_1.NotFoundException('댓글을 찾을 수 없거나 수정/삭제할 권한이 없습니다.');
        }
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map