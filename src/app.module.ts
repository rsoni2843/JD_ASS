import { SideMenuModule } from './modules/side-menu/side-menu.module';
import { CustomerAddressModule } from './modules/customer-address/customer-address.module';
import { UtilsModule } from './modules/utils/utils.module';
import { CustomerModule } from './modules/customer/customer.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RolesModule } from './modules/role/role.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from './database/orm-config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './filters';
import { TokenModule } from './modules/token/token.module';
import { OtpModule } from './modules/otp/otp.module';

@Module({
  imports: [
    CustomerAddressModule,
    UtilsModule,
    CustomerModule,
    AuthModule,
    UserModule,
    RolesModule,
    TokenModule,
    OtpModule,
    TypeOrmModule.forRoot({ ...ormConfig }),
    SideMenuModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
