"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_exception_filter_1 = require("./common/exceptions/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, cookie_parser_1.default)());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    console.log('서버가 정상적으로 시작 되었습니다');
    await app.listen(3000);
    console.log('🚀 서버 실행 중: http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map