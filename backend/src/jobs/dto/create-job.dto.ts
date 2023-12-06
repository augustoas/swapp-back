import { IsBoolean, IsNotEmpty, IsObject, IsOptional, ValidateNested, IsString, IsNumber, IsEnum, IsArray, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Job_Status } from 'src/types/Status.enum';
import { Currency } from 'src/types/Currency.enum';
import { DateType } from 'src/types/DateType.enum';

export class LocationDto {
  @IsNotEmpty()
  @IsString()
  administrative_area_level_1: string;

  @IsNotEmpty()
  @IsString()
  administrative_area_level_2: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsString()
  locality: string;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @IsNotEmpty()
  @IsString()
  route: string;

  @IsNotEmpty()
  @IsString()
  street_number: string;
}


export class CreateJobDto {
  @IsNotEmpty()
  @IsNumber()
  budget: number;

  @IsNotEmpty()
  @IsNumber()
  accepted_budget: number;

  @IsNotEmpty()
  @IsString()
  details: string;

  @IsNotEmpty()
  @IsEnum(Job_Status)
  status: Job_Status;

  @IsNotEmpty()
  @IsEnum(Currency)
  currency: Currency;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  jobCategories?: string[];

  @IsNotEmpty()
  @IsEnum(DateType)
  dateType: DateType;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsBoolean()
  is_remote: boolean;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;
}