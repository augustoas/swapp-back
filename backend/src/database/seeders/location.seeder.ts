import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';
import { Seeder, DataFactory } from 'nestjs-seeder';

@Injectable()
export class LocationSeeder implements Seeder {
  constructor(
    @InjectRepository(Location) private readonly locationRepository: Repository<Location>,
  ) {}

  async seed(): Promise<any> {
    const locations = DataFactory.createForClass(Location).generate(100);
    for (const index in locations) {
      const newLocation = this.locationRepository.create(locations[index]);
      await this.locationRepository.save(newLocation);
    }
  }

  async drop(): Promise<any> {}
}
