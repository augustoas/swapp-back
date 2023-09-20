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
import { IDataPayload } from 'src/types/Api.interface';

@Controller('job-categories')
@UseGuards(AuthGuard())
export class JobCategoriesController {
  constructor(private readonly jobCategoriesService: JobCategoriesService) {}

  @Post()
  create(@Body() createJobCategoryDto: CreateJobCategoryDto) {
    return this.jobCategoriesService.create(createJobCategoryDto);
  }

  @Get()
  findAll() {
    return this.jobCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobCategoryDto: UpdateJobCategoryDto,
  ) {
    return this.jobCategoriesService.update(+id, updateJobCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobCategoriesService.remove(+id);
  }
}
