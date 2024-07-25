import { Module } from '@nestjs/common';
import { AreaCodeController } from './area-code.controller';
import { AreaCodeService } from './area-code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaCode } from './entities/area-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreaCode])],
  controllers: [AreaCodeController],
  providers: [AreaCodeService],
})
export default class AreaCodeModule {}
