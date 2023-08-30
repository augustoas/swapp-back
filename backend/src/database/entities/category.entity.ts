import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { JobCategory } from './jobCategory.entity';

@Entity()
@Unique(['name'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => JobCategory, (jobCategories) => jobCategories.category)
  jobCategories: JobCategory[];
}
