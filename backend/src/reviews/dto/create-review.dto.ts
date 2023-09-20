import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsNumberString,
} from 'class-validator';

// defines the shape of the data required
export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  rating: string;

  @IsNotEmpty()
  @IsNumberString()
  reviewReceiverId: string;

  @IsNotEmpty()
  @IsNumberString()
  jobId: string;
}
