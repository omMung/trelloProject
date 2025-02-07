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
const member_entity_1 = require("../members/entities/member.entity");
const comment_entity_1 = require("./entities/comment.entity");
const card_entity_1 = require("../cards/entities/card.entity");
const comment_exception_1 = require("../common/exceptions/comment.exception");
const user_entity_1 = require("../users/entities/user.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
let CommentsService = class CommentsService {
    constructor(commentRepository, membersRepository, cardsRepository, usersRepository, eventEmitter) {
        this.commentRepository = commentRepository;
        this.membersRepository = membersRepository;
        this.cardsRepository = cardsRepository;
        this.usersRepository = usersRepository;
        this.eventEmitter = eventEmitter;
    }
    async getBoardMembersByBoardId(boardId, userId) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('유저 정보를 찾을 수 없습니다.');
        }
        const members = await this.membersRepository.find({
            where: { boardId },
            select: ['userId'],
        });
        if (!members.length) {
            throw new common_1.NotFoundException('해당 보드에 소속된 멤버가 없습니다.');
        }
        return { user, members: members.map((m) => m.userId) };
    }
    async getBoardMembersByCardId(cardId, userId) {
        const card = await this.cardsRepository.findOne({
            where: { id: cardId },
            relations: ['list'],
        });
        if (!card) {
            throw new common_1.NotFoundException('해당 카드를 찾을 수 없습니다.');
        }
        const boardId = card.list.boardId;
        return this.getBoardMembersByBoardId(boardId, userId);
    }
    async createComment(cardId, userId, content) {
        if (lodash_1.default.isEmpty(content.trim())) {
            throw new comment_exception_1.EmptyCommentException();
        }
        if (content.length > 50) {
            throw new comment_exception_1.CommentLengthExceededException();
        }
        const newComment = this.commentRepository.create({
            cardId,
            userId,
            content,
        });
        const savedComment = await this.commentRepository.save(newComment);
        const { user, members } = await this.getBoardMembersByCardId(cardId, userId);
        this.eventEmitter.emit('comment.created', {
            senderId: user.id,
            cardId,
            members: members.filter((id) => id !== user.id),
            message: `(${user.name})님이 새로운 댓글을 작성했습니다.`,
        });
        return savedComment;
    }
    async getCommentByCardId(cardId) {
        return await this.commentRepository.findBy({
            cardId: cardId,
        });
    }
    async getCommentById(id) {
        const comment = await this.commentRepository.findOneBy({ id });
        if (lodash_1.default.isNil(comment)) {
            throw new comment_exception_1.CommentNotFoundException();
        }
        return comment;
    }
    async updateComment(id, userId, content) {
        if (lodash_1.default.isEmpty(content.trim())) {
            throw new comment_exception_1.EmptyCommentException();
        }
        if (content.length > 50) {
            throw new comment_exception_1.CommentLengthExceededException();
        }
        await this.verifyComment(id, userId);
        await this.commentRepository.update({ id }, { content });
        const updatedComment = await this.commentRepository.findOneBy({ id });
        const { user, members } = await this.getBoardMembersByCardId(updatedComment.cardId, userId);
        this.eventEmitter.emit('comment.updated', {
            senderId: user.id,
            cardId: updatedComment.cardId,
            members: members.filter((id) => id !== user.id),
            message: `(${user.name})님이 댓글을 수정했습니다.`,
        });
        return updatedComment;
    }
    async deleteComment(id, userId) {
        const comment = await this.commentRepository.findOneBy({ id });
        if (!comment) {
            throw new comment_exception_1.CommentNotFoundException();
        }
        await this.verifyComment(id, userId);
        await this.commentRepository.delete({ id });
        const { user, members } = await this.getBoardMembersByCardId(comment.cardId, userId);
        this.eventEmitter.emit('comment.deleted', {
            senderId: user.id,
            cardId: comment.cardId,
            members: members.filter((id) => id !== user.id),
            message: `(${user.name})님이 댓글을 삭제했습니다.`,
        });
        return { id, message: '삭제되었습니다.' };
    }
    async verifyComment(id, userId) {
        const comment = await this.commentRepository.findOneBy({ id });
        if (lodash_1.default.isNil(comment) || comment.userId !== userId) {
            throw new comment_exception_1.CommentPermissionException();
        }
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, typeorm_2.InjectRepository)(member_entity_1.Member)),
    __param(2, (0, typeorm_2.InjectRepository)(card_entity_1.Card)),
    __param(3, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        event_emitter_1.EventEmitter2])
], CommentsService);
//# sourceMappingURL=comments.service.js.map