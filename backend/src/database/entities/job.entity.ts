import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { Job_Status } from '../../types/Status.enum';
import { Currency } from '../../types/Currency.enum';

@Entity()
@Unique(['poster_id'])
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tasker_id: number;

  @Column()
  poster_id: number;

  @Column()
  job_budget: number;

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
}
