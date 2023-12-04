import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../entities/job.entity';
import { JobLocation } from '../entities/jobLocation.entity';
import { Location } from '../entities/location.entity';
import { Seeder, DataFactory } from 'nestjs-seeder';

@Injectable()
export class JobLocationSeeder implements Seeder {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobLocation) private readonly jobLocationRepository: Repository<JobLocation>,
    @InjectRepository(Location) private readonly locationRepository: Repository<Location>,
  ) {}

  async seed(): Promise<any> {
    const jobs = await this.jobRepository.find();
    const locations = await this.locationRepository.find();
    for (const index in jobs) {
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      const newJobLocation = this.jobLocationRepository.create({
        job: jobs[index],
        location: randomLocation
      });
      await this.jobLocationRepository.save(newJobLocation);
    }
  }

  async drop(): Promise<any> {}
}
