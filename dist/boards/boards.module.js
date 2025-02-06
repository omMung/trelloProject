"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsModule = void 0;
const common_1 = require("@nestjs/common");
const boards_service_1 = require("./boards.service");
const boards_controller_1 = require("./boards.controller");
const typeorm_1 = require("@nestjs/typeorm");
const board_entity_1 = require("./entities/board.entity");
const list_entity_1 = require("../lists/entities/list.entity");
const card_entity_1 = require("../cards/entities/card.entity");
const member_entity_1 = require("../members/entities/member.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const jwt_1 = require("@nestjs/jwt");
const users_module_1 = require("../users/users.module");
let BoardsModule = class BoardsModule {
};
exports.BoardsModule = BoardsModule;
exports.BoardsModule = BoardsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([member_entity_1.Member, board_entity_1.Board, list_entity_1.List, card_entity_1.Card]),
            jwt_1.JwtModule.register({}),
            users_module_1.UsersModule
        ],
        controllers: [boards_controller_1.BoardsController],
        providers: [boards_service_1.BoardsService, jwt_auth_guard_1.JwtAuthGuard],
    })
], BoardsModule);
//# sourceMappingURL=boards.module.js.map