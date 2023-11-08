import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  IsDate,
} from 'class-validator';

// defines the shape of the data required for authentication
export class CreateChatDto {
  @IsNotEmpty()
  @IsEmail()
  readonly emailJobCreator: string;

  @IsNotEmpty()
  @IsEmail()
  readonly emailJobWorker: string;

  @IsNotEmpty()
  @IsString()
  readonly messageOwner: string;

  @IsNotEmpty()
  @IsString()
  readonly message: string;

  @IsNotEmpty()
  @IsDate()
  readonly timestamp: Date;
}
