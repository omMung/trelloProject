import { Repository } from 'typeorm';
import { Member } from 'src/members/entities/member.entity';
import { Comment } from './entities/comment.entity';
import { Card } from 'src/cards/entities/card.entity';
import { User } from 'src/users/entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class CommentsService {
    private commentRepository;
    private membersRepository;
    private cardsRepository;
    private usersRepository;
    private readonly eventEmitter;
    constructor(commentRepository: Repository<Comment>, membersRepository: Repository<Member>, cardsRepository: Repository<Card>, usersRepository: Repository<User>, eventEmitter: EventEmitter2);
    private getBoardMembersByBoardId;
    private getBoardMembersByCardId;
    createComment(cardId: number, userId: number, content: string): Promise<Comment>;
    getCommentByCardId(cardId: number): Promise<Comment[]>;
    getCommentById(id: number): Promise<Comment>;
    updateComment(id: number, userId: number, content: string): Promise<Comment>;
    deleteComment(id: number, userId: number): Promise<{
        id: number;
        message: string;
    }>;
    private verifyComment;
}
