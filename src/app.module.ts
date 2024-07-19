import { Module } from '@nestjs/common';
import { UserTgModule } from './app/user-tg';
import { configModule } from './config/configModule';
import { telegrafModule } from './config/telegrafModule';
import { sequelizeModule } from './config/sequelizeModule';
import { SubstationModule } from './app/substation';
import { MainModule } from './app/main';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';

@Module({
  imports: [
    configModule(),
    telegrafModule(),
    sequelizeModule(),
    UserTgModule,
    SubstationModule,
    MainModule,
  ],
  controllers: [],
  providers: [AppUpdate, AppService],
})
export class AppModule {}
