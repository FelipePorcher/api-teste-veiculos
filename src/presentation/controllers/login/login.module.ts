import { Module } from '@nestjs/common'
import { LoginController } from './login.controller'
import { AccountMongoRepository } from '@/infra/db/mongoose/account/account-mongo-repository'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { DbAuthentication } from '@/data/usecases/account/authentication/db-authentication'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { MongooseModule } from '@nestjs/mongoose'
import { AccountSchema } from '@/infra/db/mongoose/account/account-mongo-schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema, collection: 'account' }])
  ],
  controllers: [LoginController],
  providers: [
    AccountMongoRepository,
    {
      provide: BcryptAdapter,
      useFactory: () => {
        const salt = 12
        return new BcryptAdapter(salt)
      }
    },
    {
      provide: JwtAdapter,
      useFactory: () => {
        const secret = '14682'
        return new JwtAdapter(secret)
      }
    },
    {
      provide: DbAuthentication,
      useFactory: (loadAccountByEmail: AccountMongoRepository, bcrypt: BcryptAdapter, jwt: JwtAdapter , updateAccessToken: AccountMongoRepository) => {
        return new DbAuthentication(loadAccountByEmail, bcrypt, jwt, updateAccessToken)
      },
      inject: [AccountMongoRepository, BcryptAdapter, JwtAdapter, AccountMongoRepository]
    }],
  exports: [DbAuthentication]
})
export class LoginModule {}
