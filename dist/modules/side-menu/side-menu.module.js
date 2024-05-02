"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideMenuModule = void 0;
const side_menu_service_1 = require("./side-menu.service");
const side_menu_controller_1 = require("./side-menu.controller");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const end_screen_entity_1 = require("../../database/entities/end-screen.entity");
const menu_entity_1 = require("../../database/entities/menu.entity");
const auth_module_1 = require("../auth/auth.module");
const user_entity_1 = require("../../database/entities/user.entity");
const utils_service_1 = require("../utils/utils.service");
let SideMenuModule = class SideMenuModule {
};
SideMenuModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([end_screen_entity_1.EndScreen, menu_entity_1.Menu, user_entity_1.User]), auth_module_1.AuthModule],
        controllers: [side_menu_controller_1.SideMenuController],
        providers: [side_menu_service_1.SideMenuService, utils_service_1.UtilsService],
        exports: [side_menu_service_1.SideMenuService],
    })
], SideMenuModule);
exports.SideMenuModule = SideMenuModule;
//# sourceMappingURL=side-menu.module.js.map