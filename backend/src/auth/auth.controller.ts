import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  @HttpCode(200)
  signIn(
    @Body(new ValidationPipe()) signInDto: SignInDto,
  ): Promise<any> {
    return this.authService.signIn(signInDto);
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
