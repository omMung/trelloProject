"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const file_entity_1 = require("./entities/file.entity");
const member_entity_1 = require("../members/entities/member.entity");
const card_entity_1 = require("../cards/entities/card.entity");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let FileService = class FileService {
    constructor(fileRepository, memberRepository, cardRepository) {
        this.fileRepository = fileRepository;
        this.memberRepository = memberRepository;
        this.cardRepository = cardRepository;
    }
    async isMember(userId, cardId, path) {
        const card = await this.cardRepository.findOne({
            where: { id: cardId },
            relations: ['list', 'list.board'],
        });
        if (!card) {
            if (path)
                await this.deleteUploadedFile(path);
            throw new common_1.NotFoundException('카드를 찾을 수 없습니다.');
        }
        const isMember = await this.memberRepository.findOne({
            where: {
                userId,
                boardId: card.list.board.id,
            },
        });
        if (!isMember) {
            if (path)
                await this.deleteUploadedFile(path);
            throw new common_1.ForbiddenException('해당 보드에 대한 접근 권한이 없습니다.');
        }
    }
    async deleteUploadedFile(filePath) {
        try {
            await fs.promises.unlink(filePath);
        }
        catch (error) {
            console.error('파일 삭제 중 오류 발생:', error);
        }
    }
    async uploadFile(userId, cardId, file) {
        console.log(file);
        await this.isMember(userId, +cardId, file.path);
        if (!file) {
            throw new common_1.BadRequestException('파일이 업로드되지 않았습니다.');
        }
        try {
            await this.fileRepository.save({
                cardId: +cardId,
                fileName: file.filename,
            });
            return { message: `${file.filename} 파일이 업로드 되었습니다.` };
        }
        catch (error) {
            await this.deleteUploadedFile(file.path);
            throw new common_1.BadRequestException('파일 업로드 중 오류가 발생했습니다.');
        }
    }
    async findFiles(userId, cardId) {
        await this.isMember(userId, +cardId);
        try {
            return await this.fileRepository.find({
                where: {
                    cardId: +cardId,
                },
                select: ['fileName'],
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('파일 조회 중 오류가 발생했습니다.');
        }
    }
    async deleteFile(userId, cardId, fileName) {
        await this.isMember(userId, +cardId);
        const existFile = await this.fileRepository.findOne({
            where: {
                cardId: +cardId,
                fileName,
            },
        });
        if (!existFile) {
            throw new common_1.BadRequestException('해당 파일이 존재하지 않습니다.');
        }
        try {
            await this.fileRepository.delete({
                cardId: +cardId,
                fileName,
            });
            await this.deleteUploadedFile(`cardfiles/${fileName}`);
            return { message: `${fileName} 파일이 삭제되었습니다.` };
        }
        catch (error) {
            throw new common_1.BadRequestException('파일 삭제 중 오류가 발생했습니다.');
        }
    }
    async downloadFile(userId, cardId, fileName, res) {
        await this.isMember(userId, +cardId);
        const file = await this.fileRepository.findOne({
            where: {
                cardId: +cardId,
                fileName,
            },
        });
        if (!file) {
            throw new common_1.NotFoundException('파일을 찾을 수 없습니다.');
        }
        const filePath = path.join(process.cwd(), 'cardfiles', fileName);
        try {
            await fs.promises.access(filePath);
        }
        catch {
            throw new common_1.NotFoundException('파일을 찾을 수 없습니다.');
        }
        return res.download(filePath, fileName, (error) => {
            if (error) {
                throw new common_1.BadRequestException('파일 다운로드 중 오류가 발생했습니다.');
            }
        });
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __param(1, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(2, (0, typeorm_1.InjectRepository)(card_entity_1.Card)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FileService);
//# sourceMappingURL=file.service.js.map