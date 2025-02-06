"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lists_service_1 = require("./lists.service");
const lists_controller_1 = require("./lists.controller");
const list_entity_1 = require("./entities/list.entity");
const member_entity_1 = require("../members/entities/member.entity");
const user_entity_1 = require("../users/entities/user.entity");
const members_module_1 = require("../members/members.module");
const users_module_1 = require("../users/users.module");
let ListsModule = class ListsModule {
};
exports.ListsModule = ListsModule;
exports.ListsModule = ListsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([list_entity_1.List, user_entity_1.User, member_entity_1.Member]),
            members_module_1.MembersModule,
            users_module_1.UsersModule,
        ],
        controllers: [lists_controller_1.ListsController],
        providers: [lists_service_1.ListsService],
        exports: [typeorm_1.TypeOrmModule],
    })
], ListsModule);
//# sourceMappingURL=lists.module.js.map