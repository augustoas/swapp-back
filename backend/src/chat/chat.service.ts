import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { FindAllChatDto } from './dto/findall-chat.dto';
import { Redis } from "ioredis";

@Injectable()
export class ChatService {
  private readonly redis;

  constructor() {
    this.redis = new Redis();
  }


  async create(createChatDto: CreateChatDto) {
    return await this.redis.lpush(`chat-${createChatDto.emailJobCreator}-${createChatDto.emailJobWorker}`, JSON.stringify(createChatDto));
  }

  async findAll(findAllChatDto: FindAllChatDto) {
    // (llave, inicio, fin)
    const messages = await this.redis.lrange(`chat-${findAllChatDto.emailJobCreator}-${findAllChatDto.emailJobWorker}`, 0, -1);
    
    return messages.map((message) => JSON.parse(message));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} chat`;
  // }

  // update(id: number, updateChatDto: UpdateChatDto) {
  //   return `This action updates a #${id} chat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} chat`;
  // }
}
