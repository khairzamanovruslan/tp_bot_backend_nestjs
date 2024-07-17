import { Module } from '@nestjs/common';
import { UserTgModule } from './app/user-tg';
import { configModule } from './config/configModule';
import { telegrafModule } from './config/telegrafModule';
import { sequelizeModule } from './config/sequelizeModule';
import { SubstationModule } from './app/substation';
import { MainModule } from './app/main/main.module';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import { UserTg } from './app/user-tg';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserTgService, UserTgAccess } from './app/user-tg';

@Module({
  imports: [
    configModule(),
    telegrafModule(),
    sequelizeModule(),
    UserTgModule,
    SubstationModule,
    MainModule,
    SequelizeModule.forFeature([UserTg, UserTgAccess]),
  ],
  controllers: [],
  providers: [AppUpdate, AppService, UserTgService],
})
export class AppModule {}
