import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from 'src/database/entities/reply.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RepliesController],
  providers: [RepliesService],
  imports: [AuthModule, TypeOrmModule.forFeature([Reply])],
})
export class RepliesModule {}
