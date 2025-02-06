"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_exception_filter_1 = require("./common/exceptions/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.use((0, cookie_parser_1.default)());
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    await app.listen(3000);
    console.log('🚀 서버 실행 중: http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map