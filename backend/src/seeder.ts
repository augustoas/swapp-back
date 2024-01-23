import { seeder } from 'nestjs-seeder';
import { User } from './database/entities/user.entity';
import { Job } from './database/entities/job.entity';
import { TermsAndConditions } from './database/entities/termsAndConditions.entity';
import { UserSeeder } from './database/seeders/user.seeder';
import { JobSeeder } from './database/seeders/job.seeder';
import { TYCSeeder } from './database/seeders/tyc.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';

seeder({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      synchronize: false,
      entities: [__dirname + '/database/entities/*.entity{.ts,.js}'],
    }),
    TypeOrmModule.forFeature([User, Job, TermsAndConditions]),
  ],
}).run([UserSeeder, JobSeeder, TYCSeeder]);
