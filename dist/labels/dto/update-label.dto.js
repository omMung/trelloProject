"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLabelDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_label_dto_1 = require("./create-label.dto");
class UpdateLabelDto extends (0, mapped_types_1.PartialType)(create_label_dto_1.CreateLabelDto) {
}
exports.UpdateLabelDto = UpdateLabelDto;
//# sourceMappingURL=update-label.dto.js.map