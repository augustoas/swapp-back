import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse, UserWithoutSensitiveData } from '../types/Auth.types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { username, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 12);
    // try to save this user
    try {
      const newUser = await this.userRepository.save({
        username, 
        email, 
        password: hashedPassword
      });
      return newUser;
    } catch (error) {
      throw new ConflictException('Cannot create a duplicate user');
    }
  }

  // Send token as obj
  async signIn(signInDto: SignInDto): Promise<LoginResponse> {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOne({ 
      where: {
        email: email
      }
    })
    if (!user) {
      console.log('Email is not valid')
      throw new UnauthorizedException('Invalid credentials')
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      console.log('Password is incorrect')
      throw new UnauthorizedException('Invalid credentials')
    }
    const payload = { id: user.id.toString(), username: user.username, email };
    const token = await this.jwtService.sign(payload);
    const safeUser: UserWithoutSensitiveData = {
      username: user.username,
      email: user.email
    }
    const response: LoginResponse = {
      token: token,
      user: safeUser
    }
    return response;
  }

  googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google'
    }
    return {
      message: 'User information from google',
      user: req.user
    }
  }
}
