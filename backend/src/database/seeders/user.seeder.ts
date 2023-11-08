import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Seeder, DataFactory } from 'nestjs-seeder';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async seed(): Promise<any> {
    const users = DataFactory.createForClass(User).generate(25);
    for (const index in users) {
      let newUser = this.userRepository.create(users[index]);
      console.log(`email: ${newUser.email} \npassword: ${newUser.password}\n`);
      const hashedPassword = await bcrypt.hash(newUser.password, 12);
      newUser.password = hashedPassword;
      await this.userRepository.save(newUser);
    }
  }

  async drop(): Promise<any> {}
}
