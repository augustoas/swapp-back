import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from 'src/database/entities/offer.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OffersController],
  providers: [OffersService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Offer])
  ],
})
export class OffersModule { }
