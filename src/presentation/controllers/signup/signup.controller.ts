import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'
import { DbAuthentication } from '@/data/usecases/account/authentication/db-authentication'
import { AuthenticationModel } from '@/domain/models/authentication'
import { Body, Controller, HttpCode, InternalServerErrorException, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { SignupDto } from './signup.dto'

@Controller('api/signup')
@ApiTags('Cadastrar')
export class SignupController {
  constructor (private readonly dbAddAccount: DbAddAccount,
    private readonly dbAuthentication: DbAuthentication) {}

  @Post()
  @HttpCode(200)
  async handle (@Body() signupDto: SignupDto): Promise<AuthenticationModel> {
    try {
      const account = await this.dbAddAccount.add(signupDto)

      const authenticationModel = await this.dbAuthentication.auth({
        email: account.email,
        password: signupDto.password
      })
      return authenticationModel
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
