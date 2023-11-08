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
import { Factory } from 'nestjs-seeder';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Factory((faker) => faker.number.int({ min: 10000, max: 2000000 }))
  budget: number;

  @Column({ nullable: true })
  accepted_budget: number;

  @Column({ type: 'text' })
  @Factory((faker) => faker.lorem.lines())
  details: string;

  @Column({
    type: 'enum',
    enum: Job_Status,
    nullable: true,
  })
  @Factory(() => Job_Status.OPEN)
  status: Job_Status;

  @Column({
    type: 'enum',
    enum: Currency,
    nullable: true,
  })
  @Factory(() => Currency.CLP)
  currency: Currency;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;

  @ManyToOne(() => User, (jobCreator) => jobCreator.createdJobs)
  jobCreator: User;

  @ManyToOne(() => User, (jobWorker) => jobWorker.acceptedJobs, {
    nullable: true,
  })
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
