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
import { JobCategoriesService } from './job-categories.service';
import { CreateJobCategoryDto } from './dto/create-job-category.dto';
import { UpdateJobCategoryDto } from './dto/update-job-category.dto';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/database/entities/user.entity';

@Controller('job-categories')
@UseGuards(AuthGuard())
export class JobCategoriesController {
  constructor(private readonly jobCategoriesService: JobCategoriesService) {}

  @Post()
  async create(@Body() createJobCategoryDto: CreateJobCategoryDto) {
    const data = await this.jobCategoriesService.create(createJobCategoryDto);
    return { message: 'Creado exitosamente', payload: data };
  }

  @Get()
  async findAll() {
    const data = await this.jobCategoriesService.findAll();
    return { message: '', payload: data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.jobCategoriesService.findOne(+id);
    return { message: '', payload: data };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateJobCategoryDto: UpdateJobCategoryDto,
  ) {
    const data = await this.jobCategoriesService.update(
      +id,
      updateJobCategoryDto,
    );
    return { message: 'Editado exitosamente', payload: data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.jobCategoriesService.remove(+id);
    return { message: 'Eliminado exitosamente', payload: data };
  }
}
