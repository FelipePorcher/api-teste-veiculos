import * as mongoose from 'mongoose'

export const AccountSchema = new mongoose.Schema({
  name: String,
  cpf: Number,
  email: String,
  password: String
}, {
  versionKey: false
})
