import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { Offer } from 'src/database/entities/offer.entity';
import { Job } from 'src/database/entities/job.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>
  ) {}
  
  async create(createOfferDto: CreateOfferDto, user: User): Promise<Offer> {
    const { jobId, ...offerDto } = createOfferDto
    const newOffer = this.offerRepository.create(offerDto)
    newOffer.user = { id: +user.id } as User;
    newOffer.job = { id: +jobId } as Job;
    return this.offerRepository.save(newOffer);
  }

  async findAll(): Promise<Array<Offer>> {
    return this.offerRepository.find();
  }

  async findOne(id: number): Promise<Offer> {
    return this.offerRepository.findOne({where: {id: id}});
  }

  async update(id: number, updateOfferDto: UpdateOfferDto): Promise<Offer> {
    const thisOffer = await this.offerRepository.findOne({where: {id: id}});
    if (updateOfferDto.jobId) thisOffer.job = { id: +updateOfferDto.jobId } as Job;
    await this.offerRepository.update(id, thisOffer);
    return this.offerRepository.findOne({where: {id: id}});
  }

  async remove(id: number): Promise<void> {
    await this.offerRepository.delete(id);
  }
}
