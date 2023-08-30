import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { Job } from 'src/database/entities/job.entity';
import { Question } from 'src/database/entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(
    createQuestionDto: CreateQuestionDto,
    user: User,
  ): Promise<Question> {
    const { jobId, ...questionDto } = createQuestionDto;
    const newQuestion = this.questionRepository.create(questionDto);
    newQuestion.user = { id: +user.id } as User;
    newQuestion.job = { id: +jobId } as Job;
    return this.questionRepository.save(newQuestion);
  }

  async findAll(): Promise<Array<Question>> {
    return this.questionRepository.find();
  }

  async findOne(id: number): Promise<Question> {
    return this.questionRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const thisQuestion = await this.questionRepository.findOne({
      where: { id: id },
    });
    if (updateQuestionDto.jobId)
      thisQuestion.job = { id: +updateQuestionDto.jobId } as Job;
    await this.questionRepository.update(id, thisQuestion);
    return this.questionRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.questionRepository.delete(id);
  }
}
