import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from 'src/database/entities/reply.entity';

@Module({
  controllers: [RepliesController],
  providers: [RepliesService],
  imports: [TypeOrmModule.forFeature([Reply])],
})
export class RepliesModule {}
