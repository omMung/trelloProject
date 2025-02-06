"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCardLabelDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_card_label_dto_1 = require("./create-card-label.dto");
class UpdateCardLabelDto extends (0, mapped_types_1.PartialType)(create_card_label_dto_1.CreateCardLabelDto) {
}
exports.UpdateCardLabelDto = UpdateCardLabelDto;
//# sourceMappingURL=update-card-label.dto.js.map