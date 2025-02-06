"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentLengthExceededException = exports.EmptyCommentException = exports.CommentPermissionException = exports.CommentNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class CommentNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('댓글을 찾을 수 없습니다.');
    }
}
exports.CommentNotFoundException = CommentNotFoundException;
class CommentPermissionException extends common_1.NotFoundException {
    constructor() {
        super('댓글을 찾을 수 없거나 수정/삭제할 권한이 없습니다.');
    }
}
exports.CommentPermissionException = CommentPermissionException;
class EmptyCommentException extends common_1.BadRequestException {
    constructor() {
        super('댓글 내용을 비울 수 없습니다.');
    }
}
exports.EmptyCommentException = EmptyCommentException;
class CommentLengthExceededException extends common_1.BadRequestException {
    constructor() {
        super('댓글 내용은 50자를 넘길 수 없습니다.');
    }
}
exports.CommentLengthExceededException = CommentLengthExceededException;
//# sourceMappingURL=comment.exception.js.map