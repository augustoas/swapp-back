import {
  IsNotEmpty,
  IsString,
  MinLength,
  Matches
} from 'class-validator';

// defines the shape of the data required for authentication
export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly resetToken: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'password too weak, it must contain at least 1 lowercase letter, 1 uppercase letter, and 1 digit.',
  })
  readonly newPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'password too weak, it must contain at least 1 lowercase letter, 1 uppercase letter, and 1 digit.',
  })
  readonly confirmPassword: string;
}
