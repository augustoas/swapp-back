import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Job } from './job.entity';
import { Location } from './location.entity';

@Entity()
@Unique(['location', 'job']) // no se puede repetir la location para un job
export class JobLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;

  @ManyToOne(() => Job, (job) => job.jobLocations)
  job: Job;

  @ManyToOne(() => Location, (location) => location.jobLocations)
  location: Location;
}
