import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [ConfigModule.forRoot()],
})
export class ChatModule {}
