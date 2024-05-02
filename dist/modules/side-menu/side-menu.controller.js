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
exports.SideMenuController = void 0;
const common_1 = require("@nestjs/common");
const create_end_screen_dto_1 = require("./dto/create-end-screen.dto");
const side_menu_service_1 = require("../side-menu/side-menu.service");
const user_decorator_1 = require("../auth/user.decorator");
const update_end_screen_dto_1 = require("../side-menu/dto/update-end-screen.dto");
const create_menu_dto_1 = require("../side-menu/dto/create-menu.dto");
const edit_menu_dto_1 = require("../side-menu/dto/edit-menu.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_entity_1 = require("../../database/entities/user.entity");
let SideMenuController = class SideMenuController {
    constructor(sideMenuService) {
        this.sideMenuService = sideMenuService;
    }
    async createEndScreen(data, currentUser) {
        return this.sideMenuService.createEndScreen(data, currentUser);
    }
    async updateEndScreen(id, data, currentUser) {
        return this.sideMenuService.updateEndScreen(id, data, currentUser);
    }
    async deleteEndScreen(id) {
        return this.sideMenuService.deleteEndScreen(id);
    }
    async createMenu(data) {
        return this.sideMenuService.createMenu(data);
    }
    async editMenu(id, data) {
        return this.sideMenuService.editMenu(id, data);
    }
    async deleteMenu(id) {
        return this.sideMenuService.deleteMenu(id);
    }
    async getMenu(currentUser) {
        return this.sideMenuService.getMenu(currentUser);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('end-screen'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_end_screen_dto_1.CreateEndScreenDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], SideMenuController.prototype, "createEndScreen", null);
__decorate([
    (0, common_1.Put)('end-screen/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_end_screen_dto_1.UpdateEndScreenDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], SideMenuController.prototype, "updateEndScreen", null);
__decorate([
    (0, common_1.Delete)('end-screen/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SideMenuController.prototype, "deleteEndScreen", null);
__decorate([
    (0, common_1.Post)('menu'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_menu_dto_1.CreateMenuDto]),
    __metadata("design:returntype", Promise)
], SideMenuController.prototype, "createMenu", null);
__decorate([
    (0, common_1.Put)('menu/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, edit_menu_dto_1.EditMenuDto]),
    __metadata("design:returntype", Promise)
], SideMenuController.prototype, "editMenu", null);
__decorate([
    (0, common_1.Delete)('menu/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SideMenuController.prototype, "deleteMenu", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('side-menu'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], SideMenuController.prototype, "getMenu", null);
SideMenuController = __decorate([
    (0, common_1.Controller)('side-menu'),
    __metadata("design:paramtypes", [side_menu_service_1.SideMenuService])
], SideMenuController);
exports.SideMenuController = SideMenuController;
//# sourceMappingURL=side-menu.controller.js.map