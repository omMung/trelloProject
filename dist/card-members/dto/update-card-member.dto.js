"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCardMemberDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_card_member_dto_1 = require("./create-card-member.dto");
class UpdateCardMemberDto extends (0, mapped_types_1.PartialType)(create_card_member_dto_1.CreateCardMemberDto) {
}
exports.UpdateCardMemberDto = UpdateCardMemberDto;
//# sourceMappingURL=update-card-member.dto.js.map