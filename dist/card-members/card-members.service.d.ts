import { JoinMember } from './entities/card-member.entity';
import { Repository } from 'typeorm';
export declare class CardMembersService {
    private joinMemberRepository;
    constructor(joinMemberRepository: Repository<JoinMember>);
    create(authId: number, userId: number, cardId: number): Promise<{
        userId: number;
        cardId: number;
    } & JoinMember>;
    findAll(authId: number, cardId: number): Promise<JoinMember[]>;
    findOne(id: number): string;
    remove(authId: number, cardId: number, userId: number): Promise<string>;
}
