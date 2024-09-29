import { Module } from '@nestjs/common';
import { UsersTgModule } from './app/users-tg/users-tg.module';
import { configModule } from './config/config.module';
import { telegrafModule } from './config/telegraf.module';
import { sequelizeModule } from './config/sequelize.module';
import { SubstationsModule } from './app/substations/substations.module';
import { MainModule } from './app/main/main.module';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { RolesModule } from './app/roles/roles.module';

@Module({
  imports: [
    configModule(),
    telegrafModule(),
    sequelizeModule(),
    UsersTgModule,
    SubstationsModule,
    UsersModule,
    RolesModule,
    MainModule,
  ],
  controllers: [],
  providers: [AppUpdate, AppService],
})
export class AppModule {}
