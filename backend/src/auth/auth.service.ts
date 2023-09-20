import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { password, ...signUpData } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await this.userRepository.create(signUpData);
    newUser.password = hashedPassword;
    return await this.userRepository.save(newUser);
  }

  // Send token as obj
  async signIn(signInDto: SignInDto): Promise<{ token: string; user: User }> {
    const user = await this.userRepository.findOne({
      where: { email: signInDto.email },
    });
    if (!user) {
      console.log('Email is not valid');
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordCorrect = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      console.log('Password is incorrect');
      throw new UnauthorizedException('Invalid credentials');
    }
    delete user.password;
    const payload = {
      id: user.id.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      email: signInDto.email,
    };
    const token = await this.jwtService.sign(payload);
    return { token, user };
  }

  googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async generateResetToken(
    email: string,
  ): Promise<{ status: boolean; message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return {
        status: false,
        message: 'User not found',
      };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = new Date(Date.now() + 3600000); // Token expires in 1 hour
    await this.userRepository.save(user);

    return {
      status: true,
      message: 'Reset token sent successfully',
    };
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<{ status: boolean; message: string }> {
    const { resetToken, newPassword, confirmPassword } = resetPasswordDto;
    const user = await this.userRepository.findOne({ where: { resetToken } });

    if (!user || user.resetTokenExpiration <= new Date()) {
      return {
        status: false,
        message: 'Invalid or expired reset token',
      };
    }
    if (newPassword !== confirmPassword) {
      return {
        status: false,
        message: 'New password and confirmed password must be equal',
      };
    }

    // Update the user's password
    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await this.userRepository.save(user);

    // Optionally, log the user in after resetting the password
    // This depends on your application's requirements
    return {
      status: true,
      message: 'Password reset successful',
    };
  }
}
