import { Injectable } from '@nestjs/common';
import { CreateJobDto, LocationDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from 'src/database/entities/job.entity';
import { JobLocation } from 'src/database/entities/jobLocation.entity';
import { Location } from 'src/database/entities/location.entity';
import { User } from 'src/database/entities/user.entity';
import { createHash } from 'crypto';
import { JobCategoriesService } from 'src/job-categories/job-categories.service';

/**
 * Service responsible for managing jobs.
 */
export class JobsService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobLocation) private readonly jobLocationRepository: Repository<JobLocation>,
    @InjectRepository(Location) private readonly locationRepository: Repository<Location>,
    private readonly jobCategoriesService: JobCategoriesService,
  ) {}

  /**
   * Creates a new job.
   * 
   * @param createJobDto - The data for creating the job.
   * @param user - The user creating the job.
   * @returns A promise that resolves to the created job.
   */
  /**
   * Creates a new job.
   * 
   * @param createJobDto - The data for creating the job.
   * @param user - The user creating the job.
   * @returns A promise that resolves to the created job.
   */
  async create(createJobDto: CreateJobDto, user: User): Promise<Job> {
    const { location, jobCategories, ...jobDto } = createJobDto; // Destructure the DTO to get the location and job categories.
    const newJob = this.jobRepository.create(jobDto);
    newJob.jobCreator = { id: +user.id } as User;
    const savedJob = await this.jobRepository.save(newJob);

    for (const jobCategory of jobCategories) { // For each job category, add the job category to the job.
      this.jobCategoriesService.create({jobId: savedJob.id.toString(), categoryId: jobCategory});
    }
    
    if (!jobDto.is_remote && location) { // If the job is not remote and a location is provided, add the location to the job.
      const locationHash = this.createLocationHash(location);
      const savedLocation = await this.locationRepository.save({location, hash: locationHash});
      this.jobLocationRepository.save({
        job: savedJob,
        location: savedLocation,
      });
    }
    return savedJob;
  }

  /**
   * Creates a hash value for a given location object.
   * @param location - The location object to be hashed.
   * @returns The hashed location value.
   */
  private createLocationHash(location: LocationDto): string {
    const hash = createHash('sha256');
    const locationString = JSON.stringify(location);
    hash.update(locationString);
    const hashedLocation = hash.digest('hex');
    return hashedLocation;
  }
  /**
   * Retrieves all jobs.
   * 
   * @returns A promise that resolves to an array of jobs.
   */
  async findAll(): Promise<Array<Job>> {
    return this.jobRepository.find({ // Find all jobs and include the job categories, job creator, and job locations.
      relations: ['jobCategories', 'jobCreator', 'jobLocations', 'jobLocations.location'],
    });
  }

  /**
   * Retrieves a job by its ID.
   * 
   * @param id - The ID of the job.
   * @returns A promise that resolves to the found job.
   */
  async findOne(id: number): Promise<Job> {
    return this.jobRepository.findOne({ // Find the job by its ID and include the job categories, job creator, and job locations. 
      where: { id: id },
      relations: ['jobCategories', 'jobCreator', 'jobLocations', 'jobLocations.location'],
    });
  }

  /**
   * Updates a job.
   * 
   * @param id - The ID of the job to update.
   * @param updateJobDto - The data for updating the job.
   * @returns A promise that resolves to the updated job.
   */
  async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    const { location, jobCategories, ...jobDto } = updateJobDto; // Destructure the DTO to get the location and job categories.
    await this.jobRepository.update(id, jobDto);
    // update job location
    // If the job is remote, remove the job location.
    if (jobDto.is_remote) await this.jobLocationRepository.delete({ job: { id: id } });
    else { // If the job is not remote, update the job location.
      const thisLocationHash = this.createLocationHash(location);
      let newOrSavedLocation = await this.locationRepository.findOne({ where: { hash: thisLocationHash } });
      if (!newOrSavedLocation) newOrSavedLocation = await this.locationRepository.save({location, hash: thisLocationHash});
      await this.jobLocationRepository.update({ job: { id: id } }, { location: newOrSavedLocation });
    }
    // remove all categories from the job if jobCategories exists
    if (jobCategories && jobCategories.length > 0) { 
      await this.jobCategoriesService.findAllByJobId(id).then((jobCategories) => {
        for (const jobCategory of jobCategories) this.jobCategoriesService.remove(jobCategory.id);
      });
      // add all categories to the job if jobCategories exists
      for (const jobCategory of jobCategories) this.jobCategoriesService.create({jobId: id.toString(), categoryId: jobCategory});
    }
    
    
    const job = await this.jobRepository.findOne({ where: { id: id }, relations: ['jobLocations', 'jobCategories'] });
    return job;
  }


  /**
   * Removes a job.
   * 
   * @param id - The ID of the job to remove.
   * @returns A promise that resolves when the job is removed.
   */
  async remove(id: number): Promise<void> {
    await this.jobRepository.delete(id);
  }
}
