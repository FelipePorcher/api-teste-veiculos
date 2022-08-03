import { Document } from 'mongoose'

export interface Account extends Document {
  name: string
  cpf: number
  email: string
  password: string
}
