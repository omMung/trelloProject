import { NotFoundException, ConflictException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
export declare class CardNotFoundException extends NotFoundException {
    constructor();
}
export declare class LabelNotFoundException extends NotFoundException {
    constructor();
}
export declare class CardLabelNotFoundException extends NotFoundException {
    constructor();
}
export declare class CardLabelConflictException extends ConflictException {
    constructor();
}
export declare class CardLabelInternalServerErrorException extends InternalServerErrorException {
    constructor();
}
export declare class BoardMembersForbiddenException extends ForbiddenException {
    constructor();
}
