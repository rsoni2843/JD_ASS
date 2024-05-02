import {
  Controller,
  Body,
  Get,
  Put,
  Post,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateEndScreenDto } from './dto/create-end-screen.dto';
import { SideMenuService } from '../side-menu/side-menu.service';
import { CurrentUser } from '../auth/user.decorator';
import { UpdateEndScreenDto } from '../side-menu/dto/update-end-screen.dto';
import { CreateMenuDto } from '../side-menu/dto/create-menu.dto';
import { EditMenuDto } from '../side-menu/dto/edit-menu.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/database/entities/user.entity';

@Controller('side-menu')
export class SideMenuController {
  constructor(private readonly sideMenuService: SideMenuService) {}

  @UseGuards(JwtAuthGuard)
  @Post('end-screen')
  async createEndScreen(
    @Body() data: CreateEndScreenDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.sideMenuService.createEndScreen(data, currentUser);
  }

  @Put('end-screen/:id')
  async updateEndScreen(
    @Param('id') id: number,
    @Body() data: UpdateEndScreenDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.sideMenuService.updateEndScreen(id, data, currentUser);
  }

  @Delete('end-screen/:id')
  async deleteEndScreen(@Param('id') id: number) {
    return this.sideMenuService.deleteEndScreen(id);
  }

  @Post('menu')
  async createMenu(@Body() data: CreateMenuDto) {
    return this.sideMenuService.createMenu(data);
  }

  @Put('menu/:id')
  async editMenu(@Param('id') id: number, @Body() data: EditMenuDto) {
    return this.sideMenuService.editMenu(id, data);
  }

  @Delete('menu/:id')
  async deleteMenu(@Param('id') id: number) {
    return this.sideMenuService.deleteMenu(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('side-menu')
  async getMenu(@CurrentUser() currentUser: User) {
    return this.sideMenuService.getMenu(currentUser);
  }
}
