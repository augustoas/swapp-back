import { Injectable } from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { Job } from 'src/database/entities/job.entity';
import { Question } from 'src/database/entities/question.entity';
import { Offer } from 'src/database/entities/offer.entity';
import { Reply } from 'src/database/entities/reply.entity';

@Injectable()
export class RepliesService {
  constructor(
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>
  ) {}
  
  async create(createReplyDto: CreateReplyDto, user: User): Promise<Reply> {
    const { questionId, offerId, ...replyDto } = createReplyDto
    const newReply = this.replyRepository.create(replyDto)
    newReply.user = { id: +user.id } as User;
    if (questionId) newReply.question = { id: +questionId } as Question;
    if (offerId) newReply.offer = { id: +offerId } as Offer;
    return this.replyRepository.save(newReply);
  }

  async findAll(): Promise<Array<Reply>> {
    return this.replyRepository.find();
  }

  async findOne(id: number): Promise<Reply> {
    return this.replyRepository.findOne({where: {id: id}});
  }

  async update(id: number, updateReplyDto: UpdateReplyDto): Promise<Reply> {
    const thisReply = await this.replyRepository.findOne({where: {id: id}});
    if (updateReplyDto.questionId) thisReply.question = { id: +updateReplyDto.questionId } as Question;
    if (updateReplyDto.offerId) thisReply.offer = { id: +updateReplyDto.offerId } as Offer;
    await this.replyRepository.update(id, thisReply);
    return this.replyRepository.findOne({where: {id: id}});
  }

  async remove(id: number): Promise<void> {
    await this.replyRepository.delete(id);
  }
}
