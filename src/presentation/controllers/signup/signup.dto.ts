import { IsEmail, IsNotEmpty, IsNumberString, IsString, MaxLength, MinLength } from 'class-validator'

export class SignupDto {
  @IsNotEmpty()
  @IsString()
    name: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
    email: string

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(11)
  @MaxLength(11)
    cpf: number

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
    password: string
}
