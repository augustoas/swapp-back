import { IsNotEmpty, IsEmail } from 'class-validator';

// defines the shape of the data required for authentication
export class FindAllChatDto {
  @IsNotEmpty()
  @IsEmail()
  readonly emailJobCreator: string;

  @IsNotEmpty()
  @IsEmail()
  readonly emailJobWorker: string;
}
