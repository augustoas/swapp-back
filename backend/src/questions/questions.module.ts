import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/database/entities/question.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [AuthModule, TypeOrmModule.forFeature([Question])],
})
export class QuestionsModule {}
