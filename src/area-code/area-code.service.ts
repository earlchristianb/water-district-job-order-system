import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAreaCodeDto, UpdateAreaCodeDto } from './dto/area-code.dto';
import { AreaCode } from './entities/area-code.entity';

@Injectable()
export class AreaCodeService {
  constructor(
    @InjectRepository(AreaCode)
    private readonly areaCodeRepository: Repository<AreaCode>,
  ) {}

  async findOne(id: string): Promise<AreaCode> {
    const areaCode = await this.areaCodeRepository.findOne({
      where: { id },
    });
    if (!areaCode) {
      throw new NotFoundException('AreaCode not found');
    }
    return areaCode;
  }

  async findOneByCode(code: string): Promise<AreaCode> {
    return await this.areaCodeRepository.findOne({
      where: { code },
    });
  }

  async findAll(): Promise<AreaCode[]> {
    return await this.areaCodeRepository.find();
  }

  async validateCode(code: string): Promise<void> {
    const existingAreaCode = await this.areaCodeRepository.findOne({
      where: { code: code },
    });
    if (existingAreaCode) {
      throw new ConflictException('Duplicate record');
    }
  }

  async create(data: CreateAreaCodeDto): Promise<AreaCode> {
    await this.validateCode(data.code);
    const areaCode = this.areaCodeRepository.create(data);
    return await this.areaCodeRepository.save(areaCode);
  }

  async update(id: string, data: UpdateAreaCodeDto): Promise<AreaCode> {
    if (data.code) {
      await this.validateCode(data.code);
    }

    const areaCode = await this.areaCodeRepository.findOne({
      where: { id },
    });
    if (!areaCode) {
      throw new Error('AreaCode not found');
    }
    Object.assign(areaCode, data);
    return await this.areaCodeRepository.save(areaCode);
  }
}
