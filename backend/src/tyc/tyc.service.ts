import { Injectable } from '@nestjs/common';
import { CreateTycDto } from './dto/create-tyc.dto';
import { UpdateTycDto } from './dto/update-tyc.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TermsAndConditions } from 'src/database/entities/termsAndConditions.entity';

@Injectable()
export class TycService {
  constructor(
    @InjectRepository(TermsAndConditions)
    private readonly tycRepository: Repository<TermsAndConditions>,
  ) {}

  async create(createTycDto: CreateTycDto): Promise<TermsAndConditions> {
    const newTyc = this.tycRepository.create(createTycDto);
    return this.tycRepository.save(newTyc);
  }

  async findAll(): Promise<Array<TermsAndConditions>> {
    return this.tycRepository.find();
  }

  async findOne(id: number): Promise<TermsAndConditions> {
    return this.tycRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateTycDto: UpdateTycDto): Promise<TermsAndConditions> {
    await this.tycRepository.update(id, updateTycDto);
    return this.tycRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.tycRepository.delete(id);
  }
}
