"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardMembersForbiddenException = exports.CardLabelInternalServerErrorException = exports.CardLabelConflictException = exports.CardLabelNotFoundException = exports.LabelNotFoundException = exports.CardNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class CardNotFoundException extends common_1.NotFoundException {
    constructor() {
        super(`해당하는 카드가 존재하지 않거나 보드 정보를 찾을 수 없습니다.`);
    }
}
exports.CardNotFoundException = CardNotFoundException;
class LabelNotFoundException extends common_1.NotFoundException {
    constructor() {
        super(`해당하는 라벨 정보를 찾을 수 없습니다.`);
    }
}
exports.LabelNotFoundException = LabelNotFoundException;
class CardLabelNotFoundException extends common_1.NotFoundException {
    constructor() {
        super(`지정된 라벨을 찾을 수 없습니다.`);
    }
}
exports.CardLabelNotFoundException = CardLabelNotFoundException;
class CardLabelConflictException extends common_1.ConflictException {
    constructor() {
        super(`이미 지정되어 있는 라벨입니다.`);
    }
}
exports.CardLabelConflictException = CardLabelConflictException;
class CardLabelInternalServerErrorException extends common_1.InternalServerErrorException {
    constructor() {
        super('서버에 오류가 발생하였습니다.');
    }
}
exports.CardLabelInternalServerErrorException = CardLabelInternalServerErrorException;
class BoardMembersForbiddenException extends common_1.ForbiddenException {
    constructor() {
        super('보드 멤버가 아닙니다.');
    }
}
exports.BoardMembersForbiddenException = BoardMembersForbiddenException;
//# sourceMappingURL=card-label.exception.js.map