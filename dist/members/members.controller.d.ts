import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetMemberDto } from './dto/get-member.dto';
import { DeleteMemberDto } from './dto/delete-member.dto';
import { DetailGetMemberDto } from './dto/detailget-member.dto';
export declare class MembersController {
    private readonly membersService;
    constructor(membersService: MembersService);
    create(req: any, createMemberDto: CreateMemberDto): Promise<{
        message: string;
        data: import("../users/entities/user.entity").User;
    }>;
    findAll(getMemberDto: GetMemberDto): Promise<{
        message: string;
        names: import("../users/entities/user.entity").User[];
    }>;
    findOne(id: string, detailgetMemberDto: DetailGetMemberDto): Promise<{
        message: string;
        data: import("../users/entities/user.entity").User;
    }>;
    remove(req: any, deleteMemberDto: DeleteMemberDto): Promise<{
        message: string;
    }>;
}
