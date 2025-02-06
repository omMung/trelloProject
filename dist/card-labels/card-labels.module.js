"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardLabelsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const card_label_entity_1 = require("./entities/card-label.entity");
const card_labels_service_1 = require("./card-labels.service");
const card_labels_controller_1 = require("./card-labels.controller");
const label_entity_1 = require("../labels/entities/label.entity");
const card_entity_1 = require("../cards/entities/card.entity");
let CardLabelsModule = class CardLabelsModule {
};
exports.CardLabelsModule = CardLabelsModule;
exports.CardLabelsModule = CardLabelsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([card_label_entity_1.CardLabel, label_entity_1.Label, card_entity_1.Card])],
        controllers: [card_labels_controller_1.CardLabelsController],
        providers: [card_labels_service_1.CardLabelsService],
    })
], CardLabelsModule);
//# sourceMappingURL=card-labels.module.js.map