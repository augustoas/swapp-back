import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TycService } from './tyc.service';
import { CreateTycDto } from './dto/create-tyc.dto';
import { UpdateTycDto } from './dto/update-tyc.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { User } from 'src/database/entities/user.entity';

@Controller('tyc')
@UseGuards(AuthGuard())
export class TycController {
  constructor(private readonly tycService: TycService) {}

  @Post()
  async create(@Body() createTycDto: CreateTycDto) {
    const data = await this.tycService.create(createTycDto);
    return { message: 'Creado exitosamente', payload: data };
  }

  @Get()
  async findAll() {
    const data = await this.tycService.findAll();
    return { message: '', payload: data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.tycService.findOne(+id);
    return { message: '', payload: data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTycDto: UpdateTycDto) {
    const data = await this.tycService.update(+id, updateTycDto);
    return { message: 'Editado exitosamente', payload: data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.tycService.remove(+id);
    return { message: 'Eliminado exitosamente', payload: data };
  }
}
