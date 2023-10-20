import { IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

// defines the shape of the data required for authentication
export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly resetToken: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly newPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly confirmPassword: string;
}
