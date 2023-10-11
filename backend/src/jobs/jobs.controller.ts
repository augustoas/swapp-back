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
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { User } from 'src/database/entities/user.entity';

@Controller('jobs')
@UseGuards(AuthGuard())
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto, @CurrentUser() user: User) {
    const data = await this.jobsService.create(createJobDto, user);
    return { message: 'Creado exitosamente', payload: data };
  }

  @Get()
  async findAll() {
    const data = await this.jobsService.findAll();
    return { message: '', payload: data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.jobsService.findOne(+id);
    return { message: '', payload: data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    const data = await this.jobsService.update(+id, updateJobDto);
    return { message: 'Editado exitosamente', payload: data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.jobsService.remove(+id);
    return { message: 'Eliminado exitosamente', payload: data };
  }
}
