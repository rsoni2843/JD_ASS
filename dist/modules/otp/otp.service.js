"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const utils_service_1 = require("../utils/utils.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../database/entities/user.entity");
const typeorm_2 = require("typeorm");
const otp_entity_1 = require("../../database/entities/otp.entity");
const jwt_1 = require("@nestjs/jwt");
const token_entity_1 = require("../../database/entities/token.entity");
const env_1 = require("../../config/env");
let OtpService = class OtpService {
    constructor(utilsService, jwtService, userRepository, otpRepository, tokenRepository) {
        this.utilsService = utilsService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.otpRepository = otpRepository;
        this.tokenRepository = tokenRepository;
    }
    async sendOtp(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found!');
        }
        const otp = this.generateRandomNumber();
        const sentMail = await this.utilsService.sendEmail(email, `Otp for  ${user.firstname}`, otp);
        if (sentMail) {
            const newOtp = await this.otpRepository.create({
                type: otp_entity_1.OtpType.EMAIL,
                action_type: otp_entity_1.ActionType.LOGIN,
                code: otp,
                value: email,
            });
            await this.otpRepository.save(newOtp);
        }
        return {
            message: 'OTP Send Successfully!',
        };
    }
    async verifyOtp(otp, email) {
        const otpRecord = await this.otpRepository.findOne({
            where: { value: email },
            order: { createdAt: 'DESC' },
        });
        if (!otpRecord) {
            throw new common_1.BadRequestException('No OTP record!');
        }
        if (+otp !== +otpRecord.code) {
            throw new common_1.BadRequestException('Invalid OTP!');
        }
        const currentTime = new Date();
        const otpCreationTime = otpRecord.createdAt;
        const timeDifference = (currentTime.getTime() - otpCreationTime.getTime()) / (1000 * 60);
        if (timeDifference > 5) {
            throw new common_1.BadRequestException('OTP has expired!');
        }
        await this.otpRepository.delete(otpRecord.id);
        const user = await this.userRepository.findOne({ where: { email } });
        const payload = { username: user.username, sub: user.id };
        const accessToken = this.jwtService.sign(payload, {
            secret: env_1.default.jwt.access_token_secret,
        });
        if (accessToken) {
            const newToken = this.tokenRepository.create({
                token: accessToken,
                user: user,
            });
            this.tokenRepository.save(newToken);
        }
        return {
            accessToken,
        };
    }
    generateRandomNumber() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
};
OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(otp_entity_1.Otp)),
    __param(4, (0, typeorm_1.InjectRepository)(token_entity_1.Token)),
    __metadata("design:paramtypes", [utils_service_1.UtilsService,
        jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OtpService);
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map