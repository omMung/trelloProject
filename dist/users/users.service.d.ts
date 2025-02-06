import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/services/auth.service';
export declare class UsersService {
    private readonly userRepository;
    private readonly authService;
    constructor(userRepository: Repository<User>, authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    getUserById(userId: number): Promise<User>;
    update(userId: number, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    delete(userId: number): Promise<{
        message: string;
    }>;
}
