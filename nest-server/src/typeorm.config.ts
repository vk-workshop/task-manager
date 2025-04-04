import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DB_PATH } from './config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: DB_PATH,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
};