import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test'
import { LoadAccountByTokenRepository } from '../usecases/account/load-account-by-token/db-load-account-by-token-protocols'
import { UpdateAccessTokenRepository } from '../protocols/db/account/update-access-token-repository'

export class AddAccountRepositorySpy implements AddAccountRepository {
  accountModel = mockAccountModel()
  addAccountParams: AddAccountParams

  async add (data: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = data
    return this.accountModel
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  accountModel = mockAccountModel()
  email: string

  async loadByEmail (email: string): Promise<AccountModel> {
    this.email = email
    return this.accountModel
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  accountModel = mockAccountModel()
  token: string
  role: string

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    this.token = token
    this.role = role
    return this.accountModel
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}
