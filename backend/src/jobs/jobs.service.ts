import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from 'src/database/entities/job.entity';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>
  ) {}
  
  async create(createJobDto: CreateJobDto, user: User): Promise<Job> {
    const newJob = this.jobRepository.create(createJobDto)
    newJob.jobCreator = { id: +user.id } as User;
    return this.jobRepository.save(newJob);
  }

  async findAll(): Promise<Array<Job>> {
    return this.jobRepository.find();
  }

  async findOne(id: number): Promise<Job> {
    return this.jobRepository.findOne({where: {id: id}});
  }

  async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    await this.jobRepository.update(id, updateJobDto);
    return this.jobRepository.findOne({where: {id: id}});
  }

  async remove(id: number): Promise<void> {
    await this.jobRepository.delete(id);
  }
}
