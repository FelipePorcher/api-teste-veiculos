import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Account } from './account-mongo-model'

@Injectable()
export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  constructor (@InjectModel('Account') private readonly Account: Model<Account>) {}

  async add (data: AddAccountParams): Promise<AccountModel> {
    const createdAccount = new this.Account(data)
    return await createdAccount.save()
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    return await this.Account.findOne({ email }).exec()
  }
}
