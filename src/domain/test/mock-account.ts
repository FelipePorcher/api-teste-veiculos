import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AuthenticationParams } from '@/domain/usecases/account/authentication'
import { faker } from '@faker-js/faker'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: faker.name.findName(),
  cpf: faker.datatype.number({ max: 99999999999, min: 10000000000 }),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  id: faker.database.mongodbObjectId(),
  name: faker.name.findName(),
  cpf: faker.datatype.number({ max: 99999999999, min: 10000000000 }),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
