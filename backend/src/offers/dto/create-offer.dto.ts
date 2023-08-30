import { IsNotEmpty, IsString, IsNumber, IsNumberString } from 'class-validator';

// defines the shape of the data required
export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsNumber()
  budget: number;

  @IsNotEmpty()
  @IsNumberString()
  jobId: string;
}
