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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt_1 = require("bcrypt");
const env_1 = require("../../config/env");
const typeorm_1 = require("typeorm");
const token_entity_1 = require("../../database/entities/token.entity");
const typeorm_2 = require("@nestjs/typeorm");
const token_service_1 = require("../token/token.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, tokenService, tokenRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.tokenService = tokenService;
        this.tokenRepository = tokenRepository;
    }
    async validateUser(username, password) {
        const user = await this.userService.findByUsername(username);
        if (user && (await (0, bcrypt_1.compare)(password, user.password_hash))) {
            return user;
        }
        return null;
    }
    async login(user) {
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
    async validateToken(token) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: env_1.default.jwt.access_token_secret,
            });
            return await this.userService.findById(payload.sub);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async revokeToken(token) {
        const tokenRecord = await this.tokenService.getToken(token);
        if (!tokenRecord)
            throw new common_1.NotFoundException('Token not found!');
        if (tokenRecord) {
            tokenRecord.revoked = true;
            await this.tokenRepository.save(tokenRecord);
        }
        return {
            message: 'User logged out successfully!',
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_2.InjectRepository)(token_entity_1.Token)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        token_service_1.TokenService,
        typeorm_1.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map