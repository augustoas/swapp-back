import { Controller, Get, Post, Body, ValidationPipe, HttpCode, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { User } from '../database/entities/user.entity';
import { SignInDto } from './dto/signin.dto';
import { LoginResponse } from '../types/Auth.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  @HttpCode(200)
  signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<LoginResponse> {
    return this.authService.signIn(signInDto);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req)
  }
}
  