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
import { IDataPayload } from 'src/types/Api.interface';

@Controller('jobs')
@UseGuards(AuthGuard())
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post()
  create(@Body() createJobDto: CreateJobDto, @CurrentUser() user: User) {
    return this.jobsService.create(createJobDto, user);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
