import { NotFoundException, BadRequestException } from '@nestjs/common';
export declare class CommentNotFoundException extends NotFoundException {
    constructor();
}
export declare class CommentPermissionException extends NotFoundException {
    constructor();
}
export declare class EmptyCommentException extends BadRequestException {
    constructor();
}
export declare class CommentLengthExceededException extends BadRequestException {
    constructor();
}
