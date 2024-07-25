import { Module } from '@nestjs/common';
import { AreaCodeController } from './area-code.controller';
import { AreaCodeService } from './area-code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaCode } from 'src/area-code/entities/area-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreaCode])],
  controllers: [AreaCodeController],
  providers: [AreaCodeService],
})
export default class AreaCodeModule {}
