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
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/database/entities/user.entity';

@Controller('questions')
@UseGuards(AuthGuard())
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
    @CurrentUser() user: User,
  ) {
    const data = await this.questionsService.create(createQuestionDto, user);
    return { message: 'Creado exitosamente', payload: data };
  }

  @Get()
  async findAll() {
    const data = await this.questionsService.findAll();
    return { message: '', payload: data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.questionsService.findOne(+id);
    return { message: '', payload: data };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    const data = await this.questionsService.update(+id, updateQuestionDto);
    return { message: 'Editado exitosamente', payload: data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.questionsService.remove(+id);
    return { message: 'Eliminado exitosamente', payload: data };
  }
}
