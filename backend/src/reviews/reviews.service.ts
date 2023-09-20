import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from 'src/database/entities/review.entity';
import { User } from 'src/database/entities/user.entity';
import { Job } from 'src/database/entities/job.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) { }

  async create(createReviewDto: CreateReviewDto, user: User): Promise<Review> {
    const { jobId, reviewReceiverId, ...createReviewData } = createReviewDto
    const newReview = this.reviewRepository.create(createReviewData);
    newReview.job = { id: +jobId } as Job;
    newReview.reviewCreator = { id: +user.id } as User;
    newReview.reviewReceiver = { id: +reviewReceiverId } as User;
    return this.reviewRepository.save(newReview);
  }

  async findAll(): Promise<Array<Review>> {
    return this.reviewRepository.find();
  }

  async findOne(id: number): Promise<Review> {
    return this.reviewRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const thisReview = await this.reviewRepository.findOne({ where: { id: id } });
    if (updateReviewDto.jobId)
      thisReview.job = { id: +updateReviewDto.jobId } as Job;
    if (updateReviewDto.reviewReceiverId)
      thisReview.reviewReceiver = { id: +updateReviewDto.reviewReceiverId } as User;

    await this.reviewRepository.update(id, thisReview);
    return this.reviewRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}
