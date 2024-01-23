import { seeder } from 'nestjs-seeder';
import { User } from './database/entities/user.entity';
import { Job } from './database/entities/job.entity';
import { TermsAndConditions } from './database/entities/termsAndConditions.entity';
import { UserSeeder } from './database/seeders/user.seeder';
import { JobSeeder } from './database/seeders/job.seeder';
import { TYCSeeder } from './database/seeders/tyc.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobLocation } from './database/entities/jobLocation.entity';
import { Location } from './database/entities/location.entity';
import { LocationSeeder } from './database/seeders/location.seeder';
import { JobLocationSeeder } from './database/seeders/jobLocation.seeder';
import { CategorySeeder } from './database/seeders/category.seeder';
import { JobCategorySeeder } from './database/seeders/jobCategory.seeder';
import { Category } from './database/entities/category.entity';
import { JobCategory } from './database/entities/jobCategory.entity';

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
<<<<<<< HEAD
    TypeOrmModule.forFeature([User, Job, TermsAndConditions]),
  ],
}).run([UserSeeder, JobSeeder, TYCSeeder]);
=======
    TypeOrmModule.forFeature([User, Location, Category, Job, JobCategory, JobLocation]),
  ],
}).run([UserSeeder, LocationSeeder, CategorySeeder, JobSeeder, JobCategorySeeder, JobLocationSeeder]);
>>>>>>> 3133a1ac0ff9133fba65e81778706d86787571a2
