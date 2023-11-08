import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Gender } from '../../types/Gender.enum';
import { Job } from './job.entity';
import { Review } from './review.entity';
import { Offer } from './offer.entity';
import { Question } from './question.entity';
import { Reply } from './reply.entity';
import { Factory } from 'nestjs-seeder';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Factory((faker) => faker.person.firstName())
  firstname: string;

  @Column()
  @Factory((faker) => faker.person.lastName())
  lastname: string;

  @Column()
  @Factory((faker) => faker.internet.email())
  email: string;

  @Column()
  @Factory((faker) => faker.internet.password())
  password: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column({ nullable: true }) // Allow the resetToken to be nullable
  resetToken: string;

  @Column({ nullable: true }) // Allow the resetTokenExpiration to be nullable
  resetTokenExpiration: Date;

  @Column({ type: 'date', nullable: true }) // Specify the type and nullable option for birthdate column
  birthdate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;

  @OneToMany(() => Offer, (offers) => offers.user, { nullable: true })
  offers: Offer[];

  @OneToMany(() => Question, (questions) => questions.user, { nullable: true })
  questions: Question[];

  @OneToMany(() => Job, (createdJobs) => createdJobs.jobCreator, {
    nullable: true,
  })
  createdJobs: Job[];

  @OneToMany(() => Job, (acceptedJobs) => acceptedJobs.jobWorker, {
    nullable: true,
  })
  acceptedJobs: Job[];

  @OneToMany(() => Review, (createdReviews) => createdReviews.reviewCreator, {
    nullable: true,
  })
  createdReviews: Review[];

  @OneToMany(
    () => Review,
    (receivedReviews) => receivedReviews.reviewReceiver,
    { nullable: true },
  )
  receivedReviews: Review[];

  @OneToMany(() => Reply, (replies) => replies.user, { nullable: true })
  replies: Reply[];
}
