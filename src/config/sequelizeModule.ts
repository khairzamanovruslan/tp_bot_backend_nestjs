import { SequelizeModule } from '@nestjs/sequelize';

export function sequelizeModule() {
  return SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    autoLoadModels: true,
    /* synchronize: true,
    sync: { alter: true }, */
  });
}
