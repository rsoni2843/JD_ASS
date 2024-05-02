import { SideMenuService } from './side-menu.service';
import { SideMenuController } from './side-menu.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndScreen } from 'src/database/entities/end-screen.entity';
import { Menu } from 'src/database/entities/menu.entity';
import { AuthModule } from '../auth/auth.module';
import { User } from 'src/database/entities/user.entity';
import { UtilsService } from '../utils/utils.service';

@Module({
  imports: [TypeOrmModule.forFeature([EndScreen, Menu, User]), AuthModule],
  controllers: [SideMenuController],
  providers: [SideMenuService, UtilsService],
  exports: [SideMenuService],
})
export class SideMenuModule {}
