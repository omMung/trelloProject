"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const boards_module_1 = require("./boards/boards.module");
const lists_module_1 = require("./lists/lists.module");
const cards_module_1 = require("./cards/cards.module");
const comments_module_1 = require("./comments/comments.module");
const checklists_module_1 = require("./checklists/checklists.module");
const alarms_module_1 = require("./alarms/alarms.module");
const members_module_1 = require("./members/members.module");
const card_members_module_1 = require("./card-members/card-members.module");
const labels_module_1 = require("./labels/labels.module");
const checkitems_module_1 = require("./checkitems/checkitems.module");
const card_labels_module_1 = require("./card-labels/card-labels.module");
const file_module_1 = require("./files/file.module");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("./auth/auth.module");
const redis_module_1 = require("./redis/redis.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const joi_1 = __importDefault(require("joi"));
const typeOrmModuleOptions = {
    useFactory: async (configService) => ({
        namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/entities/*.{ts,js}'],
        synchronize: configService.get('DB_SYNC'),
        logging: true,
    }),
    inject: [config_1.ConfigService],
};
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: joi_1.default.object({
                    DB_USERNAME: joi_1.default.string().required(),
                    DB_PASSWORD: joi_1.default.string().required(),
                    DB_HOST: joi_1.default.string().required(),
                    DB_PORT: joi_1.default.number().required(),
                    DB_NAME: joi_1.default.string().required(),
                    DB_SYNC: joi_1.default.boolean().required(),
                    ACCESS_SECRET_KEY: joi_1.default.string().required(),
                    ACCESS_EXPIRES_IN: joi_1.default.string().default('1m'),
                }),
            }),
            event_emitter_1.EventEmitterModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync(typeOrmModuleOptions),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('ACCESS_SECRET_KEY'),
                    signOptions: {
                        expiresIn: configService.get('ACCESS_EXPIRES_IN'),
                    },
                }),
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'dist', 'public'),
                serveRoot: '/',
            }),
            users_module_1.UsersModule,
            boards_module_1.BoardsModule,
            lists_module_1.ListsModule,
            cards_module_1.CardsModule,
            comments_module_1.CommentsModule,
            checklists_module_1.ChecklistsModule,
            alarms_module_1.AlarmsModule,
            members_module_1.MembersModule,
            card_members_module_1.CardMembersModule,
            labels_module_1.LabelsModule,
            checkitems_module_1.CheckitemsModule,
            card_labels_module_1.CardLabelsModule,
            file_module_1.FileModule,
            auth_module_1.AuthModule,
            redis_module_1.RedisModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
        exports: [jwt_1.JwtModule, auth_module_1.AuthModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map