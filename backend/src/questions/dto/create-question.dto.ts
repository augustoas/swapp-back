import { IsNotEmpty, IsString, IsNumber, IsNumberString } from 'class-validator';

// defines the shape of the data required
export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsNumberString()
  jobId: string;
}
