import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Job } from '../entities/job.entity';
import { Seeder, DataFactory } from 'nestjs-seeder';

@Injectable()
export class JobSeeder implements Seeder {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
  ) {}

  async seed(): Promise<any> {
    const jobs = DataFactory.createForClass(Job).generate(100);
    const users = await this.userRepository.find();
    for (const index in jobs) {
      const newJob = this.jobRepository.create(jobs[index]);
      const randomUser = users[Math.floor(Math.random() * users.length)];
      newJob.jobCreator = { id: +randomUser.id } as User;
      await this.jobRepository.save(newJob);
    }
  }

  async drop(): Promise<any> {}
}
