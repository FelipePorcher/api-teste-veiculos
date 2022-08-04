import { Module } from '@nestjs/common'
import { SignupController } from './signup.controller'
import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'
import { MongooseModule } from '@nestjs/mongoose'
import { AccountSchema } from '@/infra/db/mongoose/account/account-mongo-schema'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongoose/account/account-mongo-repository'
import { LoginModule } from '../login/login.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema, collection: 'account' }]),
    LoginModule
  ],
  controllers: [SignupController],
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
      provide: DbAddAccount,
      useFactory: (bcrypt: BcryptAdapter, addAccountRepo: AccountMongoRepository , loadAccountEmailRepo: AccountMongoRepository) => {
        return new DbAddAccount(bcrypt,addAccountRepo,loadAccountEmailRepo)
      },
      inject: [BcryptAdapter, AccountMongoRepository, AccountMongoRepository]
    }]
})
export class SignupModule {}
