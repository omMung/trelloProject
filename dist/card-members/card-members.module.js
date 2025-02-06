"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardMembersModule = void 0;
const common_1 = require("@nestjs/common");
const card_members_service_1 = require("./card-members.service");
const card_members_controller_1 = require("./card-members.controller");
const typeorm_1 = require("@nestjs/typeorm");
const card_member_entity_1 = require("./entities/card-member.entity");
let CardMembersModule = class CardMembersModule {
};
exports.CardMembersModule = CardMembersModule;
exports.CardMembersModule = CardMembersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([card_member_entity_1.JoinMember])],
        controllers: [card_members_controller_1.CardMembersController],
        providers: [card_members_service_1.CardMembersService],
    })
], CardMembersModule);
//# sourceMappingURL=card-members.module.js.map