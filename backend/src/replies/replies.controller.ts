import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { User } from 'src/database/entities/user.entity';

@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  create(@Body() createReplyDto: CreateReplyDto, @CurrentUser() user: User) {
    return this.repliesService.create(createReplyDto, user);
  }

  @Get()
  findAll() {
    return this.repliesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repliesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReplyDto: UpdateReplyDto) {
    return this.repliesService.update(+id, updateReplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repliesService.remove(+id);
  }
}
