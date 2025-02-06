import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMyInfo(req: any): Promise<import("./entities/user.entity").User>;
    updateMyInfo(req: any, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    deleteMyAccount(req: any): Promise<{
        message: string;
    }>;
}
