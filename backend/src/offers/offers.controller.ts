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
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/database/entities/user.entity';

@Controller('offers')
@UseGuards(AuthGuard())
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async create(@Body() createOfferDto: CreateOfferDto, @CurrentUser() user: User) {
    const data = await this.offersService.create(createOfferDto, user);
    return { message: 'Creado exitosamente', payload: data };
  }

  @Get()
  async findAll() {
    const data = await this.offersService.findAll();
    return { message: '', payload: data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.offersService.findOne(+id);
    return { message: '', payload: data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    const data = await this.offersService.update(+id, updateOfferDto);
    return { message: 'Editado exitosamente', payload: data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.offersService.remove(+id);
    return { message: 'Eliminado exitosamente', payload: data };
  }
}
