"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAlarmDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_alarm_dto_1 = require("./create-alarm.dto");
class UpdateAlarmDto extends (0, mapped_types_1.PartialType)(create_alarm_dto_1.CreateAlarmDto) {
}
exports.UpdateAlarmDto = UpdateAlarmDto;
//# sourceMappingURL=update-alarm.dto.js.map