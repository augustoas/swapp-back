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
import { Communication } from './communication.entity';

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

  @ManyToOne(() => User, (poster) => poster.posts)
  poster: User;

  @ManyToOne(() => User, (tasker) => tasker.tasks)
  tasker: User;

  @OneToMany(() => Communication, (communications) => communications.inquiry)
  communications: Communication[];
}
