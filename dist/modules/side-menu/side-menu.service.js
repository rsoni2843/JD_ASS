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
exports.SideMenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const end_screen_entity_1 = require("../../database/entities/end-screen.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../database/entities/user.entity");
const menu_entity_1 = require("../../database/entities/menu.entity");
let SideMenuService = class SideMenuService {
    constructor(endScreenRepository, menuRepository, userRepository) {
        this.endScreenRepository = endScreenRepository;
        this.menuRepository = menuRepository;
        this.userRepository = userRepository;
    }
    async createEndScreen(data, currentUser) {
        const existingEndScreen = await this.endScreenRepository.findOne({
            where: [
                {
                    form_name: data.form_name,
                },
                {
                    form_number: data.form_number,
                },
            ],
        });
        if (existingEndScreen) {
            throw new common_1.ConflictException('end screen with this form name or number already exist !');
        }
        const newEndScreen = this.endScreenRepository.create(Object.assign(Object.assign({}, data), { is_active: true, created_by: currentUser.username }));
        await this.endScreenRepository.save(newEndScreen);
        return newEndScreen;
    }
    async updateEndScreen(id, data, currentUser) {
        const existingEndScreen = await this.endScreenRepository.findOne({
            where: { id },
        });
        if (!existingEndScreen) {
            throw new common_1.NotFoundException('end screen with this id does not exist !');
        }
        const updatedEndScreen = Object.assign(Object.assign(Object.assign({}, existingEndScreen), data), { updated_by: currentUser.username });
        await this.endScreenRepository.save(updatedEndScreen);
        return updatedEndScreen;
    }
    async deleteEndScreen(id) {
        const existingEndScreen = await this.endScreenRepository.findOne({
            where: { id },
        });
        if (!existingEndScreen) {
            throw new common_1.NotFoundException('end screen with this id does not exist !');
        }
        await this.endScreenRepository.remove(existingEndScreen);
        return existingEndScreen;
    }
    async createMenu(data) {
        const exisitngMenu = await this.menuRepository.findOne({
            where: { name: data.name },
        });
        if (exisitngMenu) {
            throw new common_1.ConflictException('menu with this name already exist !');
        }
        const endScreen = await this.endScreenRepository.findOne({
            where: { id: data.end_screen_id },
        });
        if (!endScreen) {
            throw new common_1.ConflictException('end screen with this id does not exist !');
        }
        const newMenu = this.menuRepository.create({
            name: data.name,
            icon_location: data === null || data === void 0 ? void 0 : data.icon_location,
            endScreen,
        });
        if (data.parent_id) {
            const parentMenu = await this.menuRepository.findOne({
                where: { id: data.parent_id },
            });
            if (!parentMenu)
                throw new common_1.BadRequestException('invalid parent menu');
            newMenu.parent = parentMenu;
        }
        await this.menuRepository.save(newMenu);
        return newMenu;
    }
    async editMenu(id, data) {
        const exisitngMenu = await this.menuRepository.findOne({
            where: { id },
            relations: ['parent', 'endScreen'],
        });
        if (!exisitngMenu) {
            throw new common_1.NotFoundException('menu with this id does not exist !');
        }
        const updatedMenu = Object.assign(Object.assign({}, exisitngMenu), { name: data.name, icon_location: data.icon_location });
        if (data.end_screen_id !== exisitngMenu.endScreen.id) {
            const newEndScreen = await this.endScreenRepository.findOne({
                where: { id: data.end_screen_id },
            });
            if (!newEndScreen)
                throw new common_1.NotFoundException('end screen with this id does not exist !');
            updatedMenu.endScreen = newEndScreen;
        }
        if (data.parent_id && exisitngMenu.parent.id !== data.parent_id) {
            const newParent = await this.menuRepository.findOne({
                where: { id: data.parent_id },
            });
            if (!newParent)
                throw new common_1.NotFoundException('menu with this id does not exist !');
            updatedMenu.parent = newParent;
        }
        await this.menuRepository.save(updatedMenu);
        return updatedMenu;
    }
    async deleteMenu(id) {
        const exisitngMenu = await this.menuRepository.findOne({
            where: { id },
            relations: ['parent', 'endScreen'],
        });
        if (!exisitngMenu) {
            throw new common_1.NotFoundException('menu with this id does not exist !');
        }
        await this.menuRepository.remove(exisitngMenu);
        return exisitngMenu;
    }
    async getMenu(currentUser) {
        const menus = await this.userRepository.findOne({
            relations: ['endScreens.menu.parent'],
            where: {
                id: currentUser.id,
                endScreens: {
                    menu: {
                        parent: null,
                    },
                },
            },
        });
        return this.constructMenu(menus.endScreens);
    }
    constructMenu(endScreens) {
        const parentObj = {};
        for (let screen of endScreens) {
            if (!parentObj[screen.menu.id] && !screen.menu.parent) {
                parentObj[screen.menu.id] = Object.assign(Object.assign({}, screen.menu), { location: screen.location, path: screen.path });
            }
            if (screen.menu.parent) {
                if (!parentObj[screen.menu.parent.id].children)
                    parentObj[screen.menu.parent.id].children = [
                        Object.assign(Object.assign({}, screen.menu), { parent: undefined, location: screen.location, path: screen.path }),
                    ];
                else
                    parentObj[screen.menu.parent.id].children.push(Object.assign(Object.assign({}, screen.menu), { parent: undefined, location: screen.location, path: screen.path }));
            }
        }
        return Object.values(parentObj);
    }
};
SideMenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(end_screen_entity_1.EndScreen)),
    __param(1, (0, typeorm_1.InjectRepository)(menu_entity_1.Menu)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SideMenuService);
exports.SideMenuService = SideMenuService;
//# sourceMappingURL=side-menu.service.js.map