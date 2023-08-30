import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { CategoryModule } from './category/category.module';
import { CategoriesModule } from './categories/categories.module';

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
    CategoryModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
