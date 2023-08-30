import { IsNotEmpty, IsString, IsOptional, IsNumberString } from 'class-validator';

// defines the shape of the data required
export class CreateReplyDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsNumberString()
  offerId: string;

  @IsOptional()
  @IsNumberString()
  questionId: string;
}
