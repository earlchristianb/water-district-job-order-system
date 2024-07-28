import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaCode } from './area-code/entities/area-code.entity';
import AreaCodeModule from './area-code/area-code.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { ConfigifyModule } from '@itgorillaz/configify';
import { DBConfig } from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ConfigifyModule.forRootAsync(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigifyModule],
      inject: [DBConfig],
      useFactory: (dbConfig: DBConfig) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: dbConfig.dbUser,
        password: dbConfig.dbPassword,
        database: dbConfig.dbName,
        logging: true,
        entities: [AreaCode],
        synchronize: false,
      }),
    }),

    AreaCodeModule,
  ],
})
export class AppModule {}
