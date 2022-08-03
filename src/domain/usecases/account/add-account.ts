import { AccountModel } from '@/domain/models/account'

export type AddAccountParams = Omit<AccountModel, '_id'>

export interface AddAccount {
  add: (account: AddAccountParams) => Promise<AccountModel>
}
