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
exports.AuthService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const redis_service_1 = require("../../redis/redis.service");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, redisService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.redisService = redisService;
        this.configService = configService;
    }
    async sendVerificationEmail(email, verifyCode) {
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: '이메일 인증 코드',
            text: `인증 코드: ${verifyCode}`,
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('이메일 발송 성공:', info.response);
        }
        catch (error) {
            console.error('이메일 발송 실패:', error);
        }
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
        if (!user.isVerified) {
            throw new common_1.UnauthorizedException('이메일 인증이 완료되지 않았습니다.');
        }
        return user;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        const payload = { sub: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('ACCESS_SECRET_KEY'),
            expiresIn: this.configService.get('ACCESS_EXPIRES_IN', '1m'),
        });
        const refreshToken = this.jwtService.sign({ sub: user.id }, {
            secret: this.configService.get('REFRESH_SECRET_KEY'),
            expiresIn: '2m',
        });
        await this.redisService.set(`refresh:${user.id}`, refreshToken, 2 * 60);
        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
    async verifyEmail(verifyEmailDto) {
        const { email, verifyCode } = verifyEmailDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.BadRequestException('해당 이메일의 사용자가 존재하지 않습니다.');
        }
        if (user.verifyCode !== verifyCode) {
            throw new common_1.BadRequestException('인증 코드가 올바르지 않습니다.');
        }
        user.isVerified = true;
        user.verifyCode = null;
        await this.userRepository.save(user);
        return { message: '이메일 인증이 완료되었습니다.' };
    }
    async logout(userId, accessToken) {
        await this.redisService.del(`refresh:${userId}`);
        const decoded = this.jwtService.decode(accessToken);
        const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
        await this.redisService.set(`blacklist:${accessToken}`, 'blacklisted', expiresIn);
    }
    async isTokenBlacklisted(token) {
        const result = await this.redisService.get(`blacklist:${token}`);
        return !!result;
    }
    async validateRefreshToken(userId, refreshToken) {
        const storedToken = await this.redisService.get(`refresh:${userId}`);
        return storedToken === refreshToken;
    }
    async refreshToken(req) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('리프레시 토큰이 제공되지 않았습니다.');
        }
        const payload = this.jwtService.verify(refreshToken, {
            secret: this.configService.get('REFRESH_SECRET_KEY'),
        });
        const userId = payload.sub;
        const isValid = await this.validateRefreshToken(userId, refreshToken);
        if (!isValid) {
            throw new common_1.UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
        }
        const newAccessToken = this.jwtService.sign({ sub: userId }, {
            secret: this.configService.get('ACCESS_SECRET_KEY'),
            expiresIn: '1m',
        });
        const newRefreshToken = this.jwtService.sign({ sub: userId }, {
            secret: this.configService.get('REFRESH_SECRET_KEY'),
            expiresIn: '2m',
        });
        await this.redisService.set(`refresh:${userId}`, newRefreshToken, 2 * 60);
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService,
        redis_service_1.RedisService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map