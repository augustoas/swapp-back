import { Injectable } from '@nestjs/common';
import { CreateJobCategoryDto } from './dto/create-job-category.dto';
import { UpdateJobCategoryDto } from './dto/update-job-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { Category } from 'src/database/entities/category.entity';
import { Job } from 'src/database/entities/job.entity';
import { JobCategory } from 'src/database/entities/jobCategory.entity';

@Injectable()
export class JobCategoriesService {
  constructor(
    @InjectRepository(JobCategory)
    private readonly jobCategoryRepository: Repository<JobCategory>,
  ) {}

  async create(
    createJobCategoryDto: CreateJobCategoryDto,
  ): Promise<JobCategory> {
    const { jobId, categoryId } = createJobCategoryDto;
    const newJobCategory = this.jobCategoryRepository.create();
    newJobCategory.job = { id: +jobId } as Job;
    newJobCategory.category = { id: +categoryId } as Category;

    return this.jobCategoryRepository.save(newJobCategory);
  }

  async findAll(): Promise<Array<JobCategory>> {
    return this.jobCategoryRepository.find();
  }

  async findOne(id: number): Promise<JobCategory> {
    return this.jobCategoryRepository.findOne({ where: { id: id } });
  }

  async findAllByJobId(jobId: number): Promise<Array<JobCategory>> {
    return this.jobCategoryRepository.find({ where: { job: { id: jobId } } });
  }

  async update(
    id: number,
    updateJobCategoryDto: UpdateJobCategoryDto,
  ): Promise<JobCategory> {
    const thisJobCategory = await this.jobCategoryRepository.findOne({
      where: { id: id },
    });
    if (updateJobCategoryDto.jobId) thisJobCategory.job = { id: +updateJobCategoryDto.jobId } as Job;
    if (updateJobCategoryDto.categoryId) thisJobCategory.category = { id: +updateJobCategoryDto.categoryId } as Category;
    await this.jobCategoryRepository.update(id, thisJobCategory);
    return this.jobCategoryRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.jobCategoryRepository.delete(id);
  }
}
