import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { VerifyEmailDto } from '../dto/verify-email.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
export declare class AuthService {
    private readonly jwtService;
    private readonly userRepository;
    private blacklistedTokens;
    constructor(jwtService: JwtService, userRepository: Repository<User>);
    sendVerificationEmail(email: string, verifyCode: string): Promise<void>;
    validateUser(email: string, password: string): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: number;
            email: string;
            name: string;
        };
    }>;
    verifyEmail(verifyEmailDto: VerifyEmailDto): Promise<{
        message: string;
    }>;
    logout(token: string): Promise<void>;
    isTokenBlacklisted(token: string): Promise<boolean>;
}
