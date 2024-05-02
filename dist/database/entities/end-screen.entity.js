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
exports.EndScreen = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const menu_entity_1 = require("./menu.entity");
let EndScreen = class EndScreen {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EndScreen.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EndScreen.prototype, "form_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EndScreen.prototype, "form_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EndScreen.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EndScreen.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], EndScreen.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EndScreen.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EndScreen.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.endScreens),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], EndScreen.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => menu_entity_1.Menu, (menu) => menu.endScreen, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", menu_entity_1.Menu)
], EndScreen.prototype, "menu", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EndScreen.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EndScreen.prototype, "updated_at", void 0);
EndScreen = __decorate([
    (0, typeorm_1.Entity)()
], EndScreen);
exports.EndScreen = EndScreen;
//# sourceMappingURL=end-screen.entity.js.map