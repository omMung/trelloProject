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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("./file.service");
const file_interceptor_1 = require("./interceptor/file.interceptor");
const delete_file_dto_1 = require("./dto/delete-file.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async uploadFile(req, cardId, file) {
        const user = req.user;
        return this.fileService.uploadFile(user.id, cardId, file);
    }
    async findFiles(req, cardId) {
        const user = req.user;
        return this.fileService.findFiles(user.id, cardId);
    }
    async deleteFile(req, cardId, deleteFileDto) {
        const { fileName } = deleteFileDto;
        const user = req.user;
        return this.fileService.deleteFile(user.id, cardId, fileName);
    }
    async downloadFile(req, cardId, fileName, res) {
        const user = req.user;
        return this.fileService.downloadFile(user.id, cardId, fileName, res);
    }
};
exports.FileController = FileController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)(file_interceptor_1.FileUploadInterceptor),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [new common_1.MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 })],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "findFiles", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(''),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, delete_file_dto_1.DeleteFileDto]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "deleteFile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('download/:fileName'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('fileName')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "downloadFile", null);
exports.FileController = FileController = __decorate([
    (0, common_1.Controller)('cards/:id/file'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
//# sourceMappingURL=file.controller.js.map