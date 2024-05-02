import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEndScreenDto } from './dto/create-end-screen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EndScreen } from 'src/database/entities/end-screen.entity';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { UpdateEndScreenDto } from './dto/update-end-screen.dto';
import { Menu } from 'src/database/entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { EditMenuDto } from './dto/edit-menu.dto';

@Injectable()
export class SideMenuService {
  constructor(
    @InjectRepository(EndScreen)
    private readonly endScreenRepository: Repository<EndScreen>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createEndScreen(data: CreateEndScreenDto, currentUser: User) {
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
      throw new ConflictException(
        'end screen with this form name or number already exist !',
      );
    }

    const newEndScreen = this.endScreenRepository.create({
      ...data,
      is_active: true,
      created_by: currentUser.username,
    });

    await this.endScreenRepository.save(newEndScreen);

    return newEndScreen;
  }

  async updateEndScreen(
    id: number,
    data: UpdateEndScreenDto,
    currentUser: User,
  ) {
    const existingEndScreen = await this.endScreenRepository.findOne({
      where: { id },
    });

    if (!existingEndScreen) {
      throw new NotFoundException('end screen with this id does not exist !');
    }

    const updatedEndScreen: EndScreen = {
      ...existingEndScreen,
      ...data,
      updated_by: currentUser.username,
    };

    await this.endScreenRepository.save(updatedEndScreen);

    return updatedEndScreen;
  }

  async deleteEndScreen(id: number) {
    const existingEndScreen = await this.endScreenRepository.findOne({
      where: { id },
    });
    if (!existingEndScreen) {
      throw new NotFoundException('end screen with this id does not exist !');
    }

    await this.endScreenRepository.remove(existingEndScreen);

    return existingEndScreen;
  }

  async createMenu(data: CreateMenuDto) {
    const exisitngMenu = await this.menuRepository.findOne({
      where: { name: data.name },
    });

    if (exisitngMenu) {
      throw new ConflictException('menu with this name already exist !');
    }

    const endScreen = await this.endScreenRepository.findOne({
      where: { id: data.end_screen_id },
    });

    if (!endScreen) {
      throw new ConflictException('end screen with this id does not exist !');
    }

    const newMenu = this.menuRepository.create({
      name: data.name,
      icon_location: data?.icon_location,
      endScreen,
    });

    if (data.parent_id) {
      const parentMenu = await this.menuRepository.findOne({
        where: { id: data.parent_id },
      });

      if (!parentMenu) throw new BadRequestException('invalid parent menu');

      newMenu.parent = parentMenu;
    }

    await this.menuRepository.save(newMenu);

    return newMenu;
  }

  async editMenu(id: number, data: EditMenuDto) {
    const exisitngMenu = await this.menuRepository.findOne({
      where: { id },
      relations: ['parent', 'endScreen'],
    });

    if (!exisitngMenu) {
      throw new NotFoundException('menu with this id does not exist !');
    }

    const updatedMenu: Menu = {
      ...exisitngMenu,
      name: data.name,
      icon_location: data.icon_location,
    };

    if (data.end_screen_id !== exisitngMenu.endScreen.id) {
      const newEndScreen = await this.endScreenRepository.findOne({
        where: { id: data.end_screen_id },
      });

      if (!newEndScreen)
        throw new NotFoundException('end screen with this id does not exist !');

      updatedMenu.endScreen = newEndScreen;
    }

    if (data.parent_id && exisitngMenu.parent.id !== data.parent_id) {
      const newParent = await this.menuRepository.findOne({
        where: { id: data.parent_id },
      });

      if (!newParent)
        throw new NotFoundException('menu with this id does not exist !');

      updatedMenu.parent = newParent;
    }

    await this.menuRepository.save(updatedMenu);

    return updatedMenu;
  }

  async deleteMenu(id: number) {
    const exisitngMenu = await this.menuRepository.findOne({
      where: { id },
      relations: ['parent', 'endScreen'],
    });

    if (!exisitngMenu) {
      throw new NotFoundException('menu with this id does not exist !');
    }

    await this.menuRepository.remove(exisitngMenu);

    return exisitngMenu;
  }

  async getMenu(currentUser: User) {
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

    // const menus = await this.menuRepository.find({
    //   relations: ['parent', 'endScreen', 'endScreen.users'],
    //   where: {
    //     endScreen: {
    //       menu: { parent: null },
    //       users: {
    //         id: currentUser.id,
    //       },
    //     },
    //   },
    // });

    // const menus = await this.menuRepository
    //   .createQueryBuilder('menu')
    //   .leftJoinAndSelect('menu.parent', 'parent')
    //   .leftJoinAndSelect('menu.endScreen', 'endScreen')
    //   // .leftJoinAndSelect('endScreen.users', 'user')
    //   // .where('user.id = :userId', { userId: currentUser.id })
    // .getMany();
    // return menus;
    return this.constructMenu(menus.endScreens);
  }

  private constructMenu(endScreens: EndScreen[]) {
    const parentObj: { [key: number]: any } = {};

    for (let screen of endScreens) {
      if (!parentObj[screen.menu.id] && !screen.menu.parent) {
        parentObj[screen.menu.id] = {
          ...screen.menu,
          location: screen.location,
          path: screen.path,
        };
      }
      if (screen.menu.parent) {
        if (!parentObj[screen.menu.parent.id].children)
          parentObj[screen.menu.parent.id].children = [
            {
              ...screen.menu,
              parent: undefined,
              location: screen.location,
              path: screen.path,
            },
          ];
        else
          parentObj[screen.menu.parent.id].children.push({
            ...screen.menu,
            parent: undefined,
            location: screen.location,
            path: screen.path,
          });
      }
    }

    return Object.values(parentObj);
  }

  // private constructMenuHierarchy(response: any[]) {
  //   const topLevelMenus = [];

  //   // Map the response to menus
  //   const menus = response.map((user) => ({
  //     id: user.endScreens[0].menu.id,
  //     name: user.endScreens[0].menu.name,
  //     icon_location: user.endScreens[0].menu.icon_location,
  //   }));

  //   // Group menus by their parent ID
  //   const menuMap = new Map<number, any>();
  //   menus.forEach((menu) => {
  //     const parentId = menu.id;
  //     if (!menuMap.has(parentId)) {
  //       menuMap.set(parentId, []);
  //     }
  //     menuMap.get(parentId)?.push(menu);
  //   });

  //   // Populate submenus recursively
  //   function populateSubmenus(menu) {
  //     const submenus = menuMap.get(menu.id) || [];
  //     if (submenus.length === 0) {
  //       return;
  //     }
  //     menu.submenus = [];
  //     submenus.forEach((submenu) => {
  //       populateSubmenus(submenu);
  //       menu.submenus?.push(submenu);
  //     });
  //   }

  //   // Find top-level menus (menus without parent)
  //   menus.forEach((menu) => {
  //     if (!menuMap.has(menu.id)) {
  //       topLevelMenus.push(menu);
  //     }
  //   });

  //   // Populate submenus for each top-level menu
  //   topLevelMenus.forEach((menu) => {
  //     populateSubmenus(menu);
  //   });

  //   return topLevelMenus;
  // }
}
