import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/database/entities/review.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [AuthModule, TypeOrmModule.forFeature([Review])],
})
export class ReviewsModule {}
