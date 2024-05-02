"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const otp_service_1 = require("../otp/otp.service");
const utils_service_1 = require("./utils.service");
const common_1 = require("@nestjs/common");
const otp_entity_1 = require("../../database/entities/otp.entity");
const user_entity_1 = require("../../database/entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const token_entity_1 = require("../../database/entities/token.entity");
let UtilsModule = class UtilsModule {
};
UtilsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, otp_entity_1.Otp, token_entity_1.Token])],
        controllers: [],
        providers: [utils_service_1.UtilsService, otp_service_1.OtpService, jwt_1.JwtService],
        exports: [utils_service_1.UtilsService],
    })
], UtilsModule);
exports.UtilsModule = UtilsModule;
//# sourceMappingURL=utils.module.js.map