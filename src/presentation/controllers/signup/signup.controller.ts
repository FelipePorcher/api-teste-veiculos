import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'
import { AccountModel } from '@/domain/models/account'
import { Body, Controller, HttpCode, InternalServerErrorException, Post } from '@nestjs/common'
import { SignupDto } from './signup.dto'

@Controller('api/signup')
export class SignupController {
  constructor (private readonly dbAddAccount: DbAddAccount) {}

  @Post()
  @HttpCode(200)
  async handle (@Body() signupDto: SignupDto): Promise<AccountModel> {
    try {
      const account = await this.dbAddAccount.add(signupDto)

      if (account) {
        return account
      }
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
