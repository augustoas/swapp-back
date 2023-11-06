import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { FindAllChatDto } from './dto/findall-chat.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) { }

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    const data = this.chatService.create(createChatDto);
    console.log("holi soy create del evento createChat")
    return { message: 'createChat creado', payload: data };
  }

  @SubscribeMessage('findAllChat')
  findAll(@MessageBody() findAllChatDto: FindAllChatDto) {
    const data = this.chatService.findAll(findAllChatDto);
    console.log("holi soy findAll del evento findAllChat")
    return { message: 'findAllChat done', payload: data };
  }

  // @SubscribeMessage('findOneChat')
  // findOne(@MessageBody() id: number) {
  //   return this.chatService.findOne(id);
  // }

  // @SubscribeMessage('updateChat')
  // update(@MessageBody() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(updateChatDto.id, updateChatDto);
  // }

  // @SubscribeMessage('removeChat')
  // remove(@MessageBody() id: number) {
  //   return this.chatService.remove(id);
  // }
}
