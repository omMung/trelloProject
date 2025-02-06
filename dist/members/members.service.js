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
exports.MembersService = void 0;
const common_1 = require("@nestjs/common");
const member_entity_1 = require("./entities/member.entity");
const board_entity_1 = require("../boards/entities/board.entity");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let MembersService = class MembersService {
    constructor(MemberRepo, UserRepo, BoardRepo) {
        this.MemberRepo = MemberRepo;
        this.UserRepo = UserRepo;
        this.BoardRepo = BoardRepo;
    }
    async create(authId, createMemberDto) {
        const { userId, boardId } = createMemberDto;
        try {
            const result_board = await this.BoardRepo.findOne({
                where: { id: boardId }
            });
            const result_user = await this.UserRepo.findOne({
                where: { id: userId },
                select: ['name', 'email', 'phoneNumber']
            });
            if (!result_user) {
                throw new common_1.NotFoundException("해당 유저를 찾을수 없습니다");
            }
            if (!result_board) {
                throw new common_1.NotFoundException("해당 보드를 찾을수 없습니다");
            }
            if (result_board.userId !== authId) {
                throw new common_1.ForbiddenException("자신이 만든 보드에서만 멤버 초대가 가능합니다");
            }
            await this.MemberRepo.save({
                userId,
                boardId,
            });
            return { message: `Trello 보드(${boardId})에 유저(${userId}) 등록 성공`,
                data: result_user
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('보드 유저 등록 중 에러가 발생');
        }
    }
    async findAll(getMemberDto) {
        const { boardId } = getMemberDto;
        try {
            const members = await this.MemberRepo.find({
                where: { boardId: boardId },
                select: ['userId']
            });
            if (members.length === 0) {
                throw new Error("보드에 해당하는 유저를 찾을수가 없습니다");
            }
            const userIds = members.map(value => Number(value.userId));
            const users = await this.UserRepo.find({
                where: { id: (0, typeorm_2.In)(userIds) },
                select: ['name']
            });
            if (!users || users.length === 0) {
                throw new Error("유저들을 찾을 수 없습니다.");
            }
            return { message: `Trello 보드(${boardId})에  멤버 조회 성공`,
                names: users
            };
        }
        catch (error) {
            if (error.message == "보드에 해당하는 유저를 찾을수가 없습니다") {
                throw error;
            }
            else if (error.message === "유저들을 찾을 수 없습니다") {
                throw error;
            }
            throw new common_1.InternalServerErrorException("보드 멤버 전체 조회중 에러가 발생");
        }
    }
    async findOne(id, detailgetMemberDto) {
        try {
            const { boardId } = detailgetMemberDto;
            const members = await this.MemberRepo.find({
                where: { boardId },
                select: ['userId']
            });
            const userIds = members.map(value => value.userId);
            if (!(userIds.includes(id))) {
                throw new common_1.NotFoundException("보드에 해당하는 유저를 찾을수가 없습니다");
            }
            const users = await this.UserRepo.findOne({
                where: { id: +id },
                select: ['name', 'email', 'phoneNumber']
            });
            return { message: `Trello 보드(${boardId})에  멤버(${id}) 상세 조회 성공`,
                data: users
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException("보드 멤버 상세 조회중 에러가 발생");
            }
        }
    }
    async remove(authId, deleteMemberDto) {
        try {
            const { userId, boardId } = deleteMemberDto;
            const result_board = await this.BoardRepo.findOne({
                where: { id: boardId }
            });
            const result_user = await this.UserRepo.findOne({
                where: { id: userId },
                select: ['name']
            });
            if (!result_user) {
                throw new common_1.NotFoundException("해당 유저를 찾을수 없습니다");
            }
            if (!result_board) {
                throw new common_1.NotFoundException("해당 보드를 찾을수 없습니다");
            }
            if (result_board.userId !== authId) {
                throw new common_1.ForbiddenException("자신이 만든 보드에서만 멤버 삭제가 가능합니다");
            }
            const users = result_user.name;
            const find = await this.MemberRepo.findOne({
                where: { userId, boardId }
            });
            if (!find) {
                throw new common_1.NotFoundException("보드안에 해당 멤버를 찾을수 없습니다");
            }
            const remove = await this.MemberRepo.delete({
                userId,
                boardId
            });
            return { message: `Trello 보드(${boardId})에  멤버 '${users}' (${userId})  삭제 성공` };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ForbiddenException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException("보드 멤버 삭제중 에러가 발생");
            }
        }
    }
};
exports.MembersService = MembersService;
exports.MembersService = MembersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(board_entity_1.Board)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MembersService);
//# sourceMappingURL=members.service.js.map