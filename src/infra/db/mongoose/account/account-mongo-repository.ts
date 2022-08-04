import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Account } from './account-mongo-model'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'

@Injectable()
export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  constructor (@InjectModel('Account') private readonly Account: Model<Account>) {}

  async add (data: AddAccountParams): Promise<AccountModel> {
    const createdAccount = new this.Account(data)
    return await createdAccount.save()
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    return await this.Account.findOne({ email }).exec()
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    await this.Account.updateOne({ _id: id }, { accessToken: token }).exec()
  }

  async loadByToken (token: string): Promise<AccountModel> {
    return await this.Account.findOne({ accessToken: token }).exec()
  }
}
