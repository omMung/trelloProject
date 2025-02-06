import { CreateCardMemberDto } from './dto/create-card-member.dto';
import { UpdateCardMemberDto } from './dto/update-card-member.dto';
export declare class CardMembersService {
    create(createCardMemberDto: CreateCardMemberDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCardMemberDto: UpdateCardMemberDto): string;
    remove(id: number): string;
}
