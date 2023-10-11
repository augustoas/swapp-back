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
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/database/entities/user.entity';
import { IApiResponse } from 'src/types/Api.interface';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<IApiResponse<User>> {
    const data = await this.usersService.create(createUserDto);
    return { message: 'Usuario creado exitosamente', payload: data };
  }

  @Get()
  async findAll(): Promise<IApiResponse<User[]>> {
    const data = await this.usersService.findAll();
    return { message: '', payload: data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IApiResponse<User>> {
    const data = await this.usersService.findOne(+id);
    return { message: '', payload: data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<IApiResponse<User>> {
    const data = await this.usersService.update(+id, updateUserDto);
    return { message: 'Usuario editado exitosamente', payload: data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IApiResponse<any>> {
    const data = await this.usersService.remove(+id);
    return { message: 'Usuario eliminado exitosamente', payload: data };
  }
}
