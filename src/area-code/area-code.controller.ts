import { Body, Controller, Get, Post } from '@nestjs/common';
import { AreaCodeService } from './area-code.service';
import { CreateAreaCodeDto } from './dto/area-code.dto';

@Controller('area-code')
export class AreaCodeController {
  constructor(private readonly areaCodeService: AreaCodeService) {}
  @Get()
  findAll() {
    return this.areaCodeService.findAll();
  }

  @Post()
  create(@Body() data: CreateAreaCodeDto) {
    return this.areaCodeService.create(data);
  }
}
