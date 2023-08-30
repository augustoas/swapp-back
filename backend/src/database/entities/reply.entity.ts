import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Offer } from './offer.entity';
import { Question } from './question.entity';
import { User } from './user.entity';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => Offer, (offer) => offer.replies, { nullable: true })
  offer: Offer;

  @ManyToOne(() => Question, (question) => question.replies, { nullable: true })
  question: Question;

  @ManyToOne(() => User, (user) => user.replies, { nullable: true })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;
}
