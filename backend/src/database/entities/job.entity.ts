import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Job_Status } from '../../types/Status.enum';
import { Currency } from '../../types/Currency.enum';
import { User } from './user.entity';
import { Review } from './review.entity';
import { Offer } from './offer.entity';
import { Question } from './question.entity';
import { JobCategory } from './jobCategory.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  budget: number;

  @Column()
  accepted_budget: number;

  @Column()
  details: number;

  @Column({
    type: 'enum',
    enum: Job_Status,
    nullable: true,
  })
  status: Job_Status;

  @Column({
    type: 'enum',
    enum: Currency,
    nullable: true,
  })
  currency: Currency;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;

  @ManyToOne(() => User, (jobCreator) => jobCreator.createdJobs)
  jobCreator: User;

  @ManyToOne(() => User, (jobWorker) => jobWorker.acceptedJobs, {nullable: true})
  jobWorker: User;

  @OneToMany(() => Offer, (offers) => offers.job)
  offers: Offer[];

  @OneToMany(() => Question, (questions) => questions.job)
  questions: Question[];

  @OneToMany(() => Review, (reviews) => reviews.job)
  reviews: Review[];

  @OneToMany(() => JobCategory, (jobCategories) => jobCategories.job)
  jobCategories: JobCategory[];
}
