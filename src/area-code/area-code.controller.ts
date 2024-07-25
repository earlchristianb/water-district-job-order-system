import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AreaCodeService } from './area-code.service';
import { CreateAreaCodeDto, UpdateAreaCodeDto } from './dto/area-code.dto';

@Controller('area-code')
export class AreaCodeController {
  constructor(private readonly areaCodeService: AreaCodeService) {}
  @Get()
  findAll() {
    return this.areaCodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.areaCodeService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateAreaCodeDto) {
    return this.areaCodeService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateAreaCodeDto) {
    return this.areaCodeService.update(id, data);
  }
}
