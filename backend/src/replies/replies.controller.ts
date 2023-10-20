import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/database/entities/user.entity';

@Controller('replies')
@UseGuards(AuthGuard())
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  async create(
    @Body() createReplyDto: CreateReplyDto,
    @CurrentUser() user: User,
  ) {
    const data = await this.repliesService.create(createReplyDto, user);
    return { message: 'Creado exitosamente', payload: data };
  }

  @Get()
  async findAll() {
    const data = await this.repliesService.findAll();
    return { message: '', payload: data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.repliesService.findOne(+id);
    return { message: '', payload: data };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReplyDto: UpdateReplyDto,
  ) {
    const data = await this.repliesService.update(+id, updateReplyDto);
    return { message: 'Editado exitosamente', payload: data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.repliesService.remove(+id);
    return { message: 'Eliminado exitosamente', payload: data };
  }
}
