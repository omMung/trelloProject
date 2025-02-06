import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetMemberDto } from './dto/get-member.dto';
export declare class MembersController {
    private readonly membersService;
    constructor(membersService: MembersService);
    create(createMemberDto: CreateMemberDto): Promise<{
        message: string;
        data: import("../users/entities/user.entity").User[];
    }>;
    findAll(getMemberDto: GetMemberDto): Promise<{
        message: string;
        names: import("../users/entities/user.entity").User[];
    }>;
    findOne(id: string, getMemberDto: GetMemberDto): Promise<{
        message: string;
        data: import("../users/entities/user.entity").User;
    }>;
    remove(id: string, getMemberDto: GetMemberDto): Promise<{
        message: string;
    }>;
}
