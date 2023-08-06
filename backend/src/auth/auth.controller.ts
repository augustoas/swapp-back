import { Controller, Post, Body, ValidationPipe, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.entity';
import { SignInDto } from './dto/signin.dto';
import { LoginResponse } from '../types/AuthTypes';

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
}
  