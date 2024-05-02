import { CreateEndScreenDto } from './dto/create-end-screen.dto';
import { SideMenuService } from '../side-menu/side-menu.service';
import { UpdateEndScreenDto } from '../side-menu/dto/update-end-screen.dto';
import { CreateMenuDto } from '../side-menu/dto/create-menu.dto';
import { EditMenuDto } from '../side-menu/dto/edit-menu.dto';
import { User } from 'src/database/entities/user.entity';
export declare class SideMenuController {
    private readonly sideMenuService;
    constructor(sideMenuService: SideMenuService);
    createEndScreen(data: CreateEndScreenDto, currentUser: User): Promise<import("../../database/entities/end-screen.entity").EndScreen>;
    updateEndScreen(id: number, data: UpdateEndScreenDto, currentUser: User): Promise<import("../../database/entities/end-screen.entity").EndScreen>;
    deleteEndScreen(id: number): Promise<import("../../database/entities/end-screen.entity").EndScreen>;
    createMenu(data: CreateMenuDto): Promise<import("../../database/entities/menu.entity").Menu>;
    editMenu(id: number, data: EditMenuDto): Promise<import("../../database/entities/menu.entity").Menu>;
    deleteMenu(id: number): Promise<import("../../database/entities/menu.entity").Menu>;
    getMenu(currentUser: User): Promise<any[]>;
}
