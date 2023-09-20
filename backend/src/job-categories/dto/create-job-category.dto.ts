import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsNumberString,
} from 'class-validator';

// defines the shape of the data required
export class CreateJobCategoryDto {
  @IsNotEmpty()
  @IsNumberString()
  categoryId: string;

  @IsNotEmpty()
  @IsNumberString()
  jobId: string;
}
