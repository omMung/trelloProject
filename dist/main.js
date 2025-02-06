"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    console.log("서버가 정상적으로 시작 되었습니다");
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map