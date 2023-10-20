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
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '../database/entities/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { IApiResponse } from 'src/types/Api.interface';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { OptionalJwt } from 'src/decorators/OptionalJwt.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(new ValidationPipe()) signUpDto: SignUpDto,
  ): Promise<IApiResponse<User>> {
    const data = await this.authService.signUp(signUpDto);
    return { message: 'Usuario creado exitosamente', payload: data };
  }

  @Post('/signin')
  async signIn(
    @Body(new ValidationPipe()) signInDto: SignInDto,
  ): Promise<IApiResponse<{ token: string; user: User }>> {
    const data = await this.authService.signIn(signInDto);
    return { message: 'Inicio de sesión exitoso', payload: data };
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @Post('/forgotpassword')
  async forgotPassword(@Body() body: { email: string }) {
    const data = await this.authService.generateResetToken(body.email);
    return {
      message:
        'Se ha enviado un correo con las indicaciones para recuperar su contraseña.',
      payload: data,
    };
  }

  @Post('/resetpassword')
  async resetPassword(
    @Body(new ValidationPipe()) resetPasswordDto: ResetPasswordDto,
    @OptionalJwt() user?: User,
  ) {
    const data = await this.authService.resetPassword(resetPasswordDto, user);
    return { message: 'Cambio de contraseña exitoso.', payload: data };
  }
}
