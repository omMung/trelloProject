import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    createComment(req: any, cardId: number, createCommentDto: CreateCommentDto): Promise<{
        data: import("./entities/comment.entity").Comment;
    }>;
    findAllComment(cardId: number): Promise<{
        data: import("./entities/comment.entity").Comment[];
    }>;
    findOneComment(id: number): Promise<import("./entities/comment.entity").Comment>;
    updateComment(req: any, id: number, updateCommentDto: UpdateCommentDto): Promise<{
        data: import("./entities/comment.entity").Comment;
    }>;
    deleteComment(req: any, id: number): Promise<{
        data: {
            id: number;
            message: string;
        };
    }>;
}
