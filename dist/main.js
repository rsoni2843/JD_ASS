"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const env_1 = require("./config/env");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        const appPort = env_1.default.app.port;
        app.enableCors({
            origin: (origin, cb) => {
                cb(null, true);
            },
            credentials: true,
        });
        await app.listen(appPort);
        console.log('App started on: ' + appPort);
    }
    catch (error) {
        console.log(error);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map