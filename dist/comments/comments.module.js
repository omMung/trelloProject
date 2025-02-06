"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const comments_service_1 = require("./comments.service");
const comments_controller_1 = require("./comments.controller");
const comment_entity_1 = require("./entities/comment.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const users_module_1 = require("../users/users.module");
let CommentsModule = class CommentsModule {
};
exports.CommentsModule = CommentsModule;
exports.CommentsModule = CommentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([comment_entity_1.Comment]),
            jwt_1.JwtModule.register({}),
            users_module_1.UsersModule,
        ],
        controllers: [comments_controller_1.CommentsController],
        providers: [comments_service_1.CommentsService, jwt_auth_guard_1.JwtAuthGuard],
    })
], CommentsModule);
//# sourceMappingURL=comments.module.js.map