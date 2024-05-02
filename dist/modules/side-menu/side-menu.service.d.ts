import { CreateEndScreenDto } from './dto/create-end-screen.dto';
import { EndScreen } from 'src/database/entities/end-screen.entity';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { UpdateEndScreenDto } from './dto/update-end-screen.dto';
import { Menu } from 'src/database/entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { EditMenuDto } from './dto/edit-menu.dto';
export declare class SideMenuService {
    private readonly endScreenRepository;
    private readonly menuRepository;
    private readonly userRepository;
    constructor(endScreenRepository: Repository<EndScreen>, menuRepository: Repository<Menu>, userRepository: Repository<User>);
    createEndScreen(data: CreateEndScreenDto, currentUser: User): Promise<EndScreen>;
    updateEndScreen(id: number, data: UpdateEndScreenDto, currentUser: User): Promise<EndScreen>;
    deleteEndScreen(id: number): Promise<EndScreen>;
    createMenu(data: CreateMenuDto): Promise<Menu>;
    editMenu(id: number, data: EditMenuDto): Promise<Menu>;
    deleteMenu(id: number): Promise<Menu>;
    getMenu(currentUser: User): Promise<any[]>;
    private constructMenu;
}
