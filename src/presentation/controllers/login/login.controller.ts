import { DbAuthentication } from '@/data/usecases/account/authentication/db-authentication'
import { AuthenticationModel } from '@/domain/models/authentication'
import { Controller, Post, Body, InternalServerErrorException, UnauthorizedException, HttpCode } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LoginDto } from './login.dto'

@Controller('api/login')
@ApiTags('Login')
export class LoginController {
  constructor (private readonly authentication: DbAuthentication) {}

  @Post()
  @HttpCode(200)
  async handle (@Body() loginDto: LoginDto): Promise<AuthenticationModel> {
    try {
      const authenticationModel = await this.authentication.auth(loginDto)
      if (!authenticationModel) {
        throw new UnauthorizedException()
      }
      return authenticationModel
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
