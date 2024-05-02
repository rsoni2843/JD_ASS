"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const side_menu_module_1 = require("./modules/side-menu/side-menu.module");
const customer_address_module_1 = require("./modules/customer-address/customer-address.module");
const utils_module_1 = require("./modules/utils/utils.module");
const customer_module_1 = require("./modules/customer/customer.module");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const role_module_1 = require("./modules/role/role.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const orm_config_1 = require("./database/orm-config");
const core_1 = require("@nestjs/core");
const filters_1 = require("./filters");
const token_module_1 = require("./modules/token/token.module");
const otp_module_1 = require("./modules/otp/otp.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            customer_address_module_1.CustomerAddressModule,
            utils_module_1.UtilsModule,
            customer_module_1.CustomerModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            role_module_1.RolesModule,
            token_module_1.TokenModule,
            otp_module_1.OtpModule,
            typeorm_1.TypeOrmModule.forRoot(Object.assign({}, orm_config_1.default)),
            side_menu_module_1.SideMenuModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_PIPE,
                useClass: common_1.ValidationPipe,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: filters_1.HttpExceptionFilter,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map