import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsNumberString, IsString, MaxLength, MinLength } from 'class-validator'

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
    name: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
    email: string

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(11)
  @MaxLength(11)
  @ApiProperty()
    cpf: number

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @ApiProperty()
    password: string
}
