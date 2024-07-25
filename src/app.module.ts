import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaCode } from './entities/area-code.entity';
import AreaCodeModule from './area-code/area-code.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: config().DB_USER,
      password: config().DB_PASSWORD,
      database: config().DB_NAME,
      entities: [AreaCode],
      synchronize: true,
    }),
    AreaCodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
