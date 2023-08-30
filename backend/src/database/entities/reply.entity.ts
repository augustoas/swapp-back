import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Offer } from './offer.entity';
import { Question } from './question.entity';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => Offer, (offer) => offer.replies, {nullable: true})
  offer: Offer;

  @ManyToOne(() => Question, (question) => question.replies, {nullable: true})
  question: Question;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;
}
