"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const label_entity_1 = require("./entities/label.entity");
const labels_service_1 = require("./labels.service");
const labels_controller_1 = require("./labels.controller");
let LabelsModule = class LabelsModule {
};
exports.LabelsModule = LabelsModule;
exports.LabelsModule = LabelsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([label_entity_1.Label])],
        controllers: [labels_controller_1.LabelsController],
        providers: [labels_service_1.LabelsService],
    })
], LabelsModule);
//# sourceMappingURL=labels.module.js.map