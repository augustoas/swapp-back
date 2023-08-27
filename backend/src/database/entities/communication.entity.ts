import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Job } from './job.entity';
import { Inquiry } from './inquiry.entity';
import { Answer } from './answer.entity';

@Entity()
export class Communication {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Job, (job) => job.communications)
  job: Job;

  @ManyToOne(() => Inquiry, (inquiry) => inquiry.communications)
  inquiry: Inquiry;

  @ManyToOne(() => Answer, (answer) => answer.communications)
  answer: Answer;
}
