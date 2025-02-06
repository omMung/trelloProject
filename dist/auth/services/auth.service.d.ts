import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { VerifyEmailDto } from '../dto/verify-email.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { RedisService } from 'src/redis/redis.service';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    private redisService;
    private configService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, redisService: RedisService, configService: ConfigService);
    sendVerificationEmail(email: string, verifyCode: string): Promise<void>;
    validateUser(email: string, password: string): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            name: string;
        };
    }>;
    verifyEmail(verifyEmailDto: VerifyEmailDto): Promise<{
        message: string;
    }>;
    logout(userId: number, accessToken: string): Promise<void>;
    isTokenBlacklisted(token: string): Promise<boolean>;
    validateRefreshToken(userId: number, refreshToken: string): Promise<boolean>;
    refreshToken(req: Request): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
