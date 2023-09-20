import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '../database/entities/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { IDataPayload } from 'src/types/Api.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  async signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto): Promise<IDataPayload<User>> {
    const data = await this.authService.signUp(signUpDto);
    return { message: 'Usuario creado exitosamente', payload: data };
  }

  @Post('/signin')
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IDataPayload<{ token: string, user: User }>> {
    const data = await this.authService.signIn(signInDto);
    return { message: 'Inicio de sesión exitoso', payload: data };
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() { }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @Post('/forgotpassword')
  async forgotPassword(@Body() body: { email: string }) {
    const { email } = body;
    const response = await this.authService.generateResetToken(email);

    if (!response.status) {
      throw new HttpException(response.message, HttpStatus.NOT_FOUND);
    }
    // Send reset token to the user's email
    // Include a link with the token to the frontend
    // Handle this part in your application (e.g., using a third-party email service)
    // ...
    return response;
  }

  @Post('/resetpassword')
  async resetPassword(
    @Body(new ValidationPipe()) resetPasswordDto: ResetPasswordDto,
  ) {
    const response = await this.authService.resetPassword(resetPasswordDto);
    if (!response.status) {
      throw new HttpException(response.message, HttpStatus.BAD_REQUEST);
    }
    return response;
  }
}
