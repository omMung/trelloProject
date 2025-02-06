import { CreateMemberDto } from './dto/create-member.dto';
import { GetMemberDto } from './dto/get-member.dto';
import { DeleteMemberDto } from './dto/delete-member.dto';
import { DetailGetMemberDto } from './dto/detailget-member.dto';
import { Member } from './entities/member.entity';
import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class MembersService {
    private MemberRepo;
    private UserRepo;
    private BoardRepo;
    constructor(MemberRepo: Repository<Member>, UserRepo: Repository<User>, BoardRepo: Repository<Board>);
    create(authId: number, createMemberDto: CreateMemberDto): Promise<{
        message: string;
        data: User;
    }>;
    findAll(getMemberDto: GetMemberDto): Promise<{
        message: string;
        names: User[];
    }>;
    findOne(id: number, detailgetMemberDto: DetailGetMemberDto): Promise<{
        message: string;
        data: User;
    }>;
    remove(authId: number, deleteMemberDto: DeleteMemberDto): Promise<{
        message: string;
    }>;
}
