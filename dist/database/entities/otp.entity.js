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
exports.Otp = exports.OtpType = exports.ActionType = void 0;
const typeorm_1 = require("typeorm");
var ActionType;
(function (ActionType) {
    ActionType["LOGIN"] = "login";
    ActionType["SIGNUP"] = "signup";
    ActionType["FORGOT_PASSWORD"] = "forgot_password";
    ActionType["EMAIL_UPDATE"] = "email_update";
    ActionType["MOBILE_UPDATE"] = "mobile_update";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
var OtpType;
(function (OtpType) {
    OtpType["MOBILE"] = "mobile";
    OtpType["EMAIL"] = "email";
})(OtpType = exports.OtpType || (exports.OtpType = {}));
let Otp = class Otp {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Otp.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: OtpType,
    }),
    __metadata("design:type", String)
], Otp.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Otp.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Otp.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ActionType,
    }),
    __metadata("design:type", String)
], Otp.prototype, "action_type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Otp.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Otp.prototype, "updatedAt", void 0);
Otp = __decorate([
    (0, typeorm_1.Entity)()
], Otp);
exports.Otp = Otp;
//# sourceMappingURL=otp.entity.js.map