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
import { MailService } from './../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private mailService: MailService,
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

  // envia token a email
  async generateResetToken(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new Error("Invalid credentials");
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = new Date(Date.now() + 3600000); // Token expires in 1 hour
    this.mailService.sendResetPassword(email, resetToken);
    await this.userRepository.save(user);
    
    return resetToken;
  }

  // recibe y valida token
  private async handleResetToken(token: string): Promise<User> {
    // token valido?
    const user = await this.userRepository.findOne({ where: { resetToken: token } });
    if (!user) throw new Error("Invalid token");
    // ha pasado 1 hr?
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    console.log("resetTokenExpiration => ", user.resetTokenExpiration)
    console.log("oneHourAgo => ", oneHourAgo)
    if (user.resetTokenExpiration < oneHourAgo) throw new Error("Expired token");
    return user
  }

  // cambia contraseña
  async resetPassword(resetPasswordDto: ResetPasswordDto, user?: User) {
    // Si viene dentro de la app, user está definido, si viene x token, es undefined
    let thisUser = user;
    const { newPassword, confirmPassword, resetToken } = resetPasswordDto;
    // Si viene el token, viene desde afuera y hay que validar token
    if (resetToken) thisUser = await this.handleResetToken(resetToken);
    if (!thisUser) throw new Error("Invalid credentials.");
    if (newPassword !== confirmPassword) throw new Error("Passwords must match.");
    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    return this.userRepository.update(thisUser.id, {password: hashedPassword});
  }
}
