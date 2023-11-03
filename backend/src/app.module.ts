import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './helpers/globalException.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { CategoriesModule } from './categories/categories.module';
import { JobCategoriesModule } from './job-categories/job-categories.module';
import { OffersModule } from './offers/offers.module';
import { QuestionsModule } from './questions/questions.module';
import { RepliesModule } from './replies/replies.module';
import { ReviewsModule } from './reviews/reviews.module';
import { MailModule } from './mail/mail.module';
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [__dirname + '/database/entities/*.entity{.ts,.js}'], // naming convention: {[table]}.entity.ts
      migrations: [__dirname + '/database/migrations/*.migration{.ts,.js}'], // naming convention: YYYYMMDD-{[action]_[description]}.migration.ts
      migrationsTableName: 'migrations',
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    JobsModule,
    CategoriesModule,
    JobCategoriesModule,
    OffersModule,
    QuestionsModule,
    RepliesModule,
    ReviewsModule,
    MailModule,
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule { }
