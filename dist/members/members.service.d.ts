import { CreateMemberDto } from './dto/create-member.dto';
import { GetMemberDto } from './dto/get-member.dto';
import { Member } from './entities/member.entity';
import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class MembersService {
    private MemberRepo;
    private UserRepo;
    private BoardRepo;
    constructor(MemberRepo: Repository<Member>, UserRepo: Repository<User>, BoardRepo: Repository<Board>);
    create(createMemberDto: CreateMemberDto): Promise<{
        message: string;
        data: User[];
    }>;
    findAll(getMemberDto: GetMemberDto): Promise<{
        message: string;
        names: User[];
    }>;
    findOne(id: number, getMemberDto: GetMemberDto): Promise<{
        message: string;
        data: User;
    }>;
    remove(id: number, getMemberDto: GetMemberDto): Promise<{
        message: string;
    }>;
}
