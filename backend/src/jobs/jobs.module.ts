import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/database/entities/job.entity';
import { JobLocation } from 'src/database/entities/jobLocation.entity';
import { Location } from 'src/database/entities/location.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
  imports: [AuthModule, TypeOrmModule.forFeature([Job, JobLocation, Location])],
})
export class JobsModule {}
