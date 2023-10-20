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
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { User } from 'src/database/entities/user.entity';
import { IApiResponse } from 'src/types/Api.interface';

@Controller('reviews')
@UseGuards(AuthGuard())
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() user: User,
  ) {
    const data = await this.reviewsService.create(createReviewDto, user);
    return { message: 'Creado exitosamente', payload: data };
  }

  @Get()
  async findAll() {
    const data = await this.reviewsService.findAll();
    return { message: '', payload: data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.reviewsService.findOne(+id);
    return { message: '', payload: data };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const data = await this.reviewsService.update(+id, updateReviewDto);
    return { message: 'Editado exitosamente', payload: data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.reviewsService.remove(+id);
    return { message: 'Eliminado exitosamente', payload: data };
  }
}
