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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../services/auth.service");
const login_dto_1 = require("../dto/login.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const create_user_dto_1 = require("../../users/dto/create-user.dto");
const users_service_1 = require("../../users/users.service");
const verify_email_dto_1 = require("../dto/verify-email.dto");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async signUp(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async verifyEmail(verifyEmailDto) {
        return this.authService.verifyEmail(verifyEmailDto);
    }
    async login(loginDto, res) {
        const data = await this.authService.login(loginDto);
        const { accessToken, refreshToken, user } = data;
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 2 * 60 * 1000,
        });
        return res.json({
            message: '로그인 되었습니다.',
        });
    }
    async logout(req) {
        const userId = req.user.id;
        const accessToken = req.headers.authorization.split(' ')[1];
        await this.authService.logout(userId, accessToken);
        return { message: '로그아웃 되었습니다.' };
    }
    async refreshToken(req, res) {
        const data = await this.authService.refreshToken(req);
        const { accessToken, refreshToken } = data;
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 2 * 60 * 1000,
        });
        return res.json({
            message: '리프레시 토큰 -> 액세스 토큰 재발급 되었습니다.',
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('verify-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_email_dto_1.VerifyEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map