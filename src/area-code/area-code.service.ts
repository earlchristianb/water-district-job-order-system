import { Injectable } from '@nestjs/common';
import { AreaCode } from 'src/entities/area-code.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAreaCodeDto } from './dto/area-code.dto';

@Injectable()
export class AreaCodeService {
  constructor(
    @InjectRepository(AreaCode)
    private readonly pollRepository: Repository<AreaCode>,
  ) {}

  async create(data: CreateAreaCodeDto): Promise<AreaCode> {
    return await this.pollRepository.save(data);
  }

  async findAll(): Promise<AreaCode[]> {
    return await this.pollRepository.find();
  }
}
