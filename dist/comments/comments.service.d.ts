import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
export declare class CommentsService {
    private commentRepository;
    constructor(commentRepository: Repository<Comment>);
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
