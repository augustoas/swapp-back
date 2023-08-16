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
import { Answer } from './answer.entity';
import { Inquiry } from './inquiry.entity';
import { Job } from './job.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
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

  @OneToMany(() => Answer, (answers) => answers.user)
  answers: Answer[];

  @OneToMany(() => Inquiry, (inquiries) => inquiries.user)
  inquiries: Inquiry[];

  @OneToMany(() => Job, (posts) => posts.poster)
  posts: Job[];

  @OneToMany(() => Job, (tasks) => tasks.tasker)
  tasks: Job[];
}
