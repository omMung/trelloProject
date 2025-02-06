import { CardMembersService } from './card-members.service';
import { CreateCardMemberDto } from './dto/create-card-member.dto';
import { UpdateCardMemberDto } from './dto/update-card-member.dto';
export declare class CardMembersController {
    private readonly cardMembersService;
    constructor(cardMembersService: CardMembersService);
    create(createCardMemberDto: CreateCardMemberDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCardMemberDto: UpdateCardMemberDto): string;
    remove(id: string): string;
}
