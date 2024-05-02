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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleAuthGuard = void 0;
const common_1 = require("@nestjs/common");
let RoleAuthGuard = class RoleAuthGuard {
    constructor(requiredRoles) {
        this.requiredRoles = requiredRoles;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const userRoles = user.roles;
        if (!userRoles || userRoles.length === 0) {
            throw new common_1.UnauthorizedException('User has no roles');
        }
        const hasRequiredRole = userRoles.some((role) => this.requiredRoles.includes(role.role_name));
        if (!hasRequiredRole) {
            throw new common_1.UnauthorizedException('Insufficient permissions');
        }
        return true;
    }
};
RoleAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Array])
], RoleAuthGuard);
exports.RoleAuthGuard = RoleAuthGuard;
//# sourceMappingURL=role-auth.guard.js.map