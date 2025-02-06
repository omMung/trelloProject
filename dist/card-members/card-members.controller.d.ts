import { CardMembersService } from './card-members.service';
import { CreateCardMemberDto } from './dto/create-card-member.dto';
export declare class CardMembersController {
    private readonly cardMembersService;
    constructor(cardMembersService: CardMembersService);
    create(req: any, createCardMemberDto: CreateCardMemberDto): Promise<{
        userId: number;
        cardId: number;
    } & import("./entities/card-member.entity").JoinMember>;
    findAll(req: any, body: {
        cardId: number;
    }): Promise<import("./entities/card-member.entity").JoinMember[]>;
    remove(req: any, body: {
        cardId: number;
    }, userId: string): Promise<string>;
}
