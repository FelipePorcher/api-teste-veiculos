import * as mongoose from 'mongoose'
import { AccountSchema } from '../account/account-mongo-schema'

export const VehicleSchema = new mongoose.Schema({
  model: String,
  nameplate: String,
  isReserved: Boolean,
  reservedBy: AccountSchema
}, {
  versionKey: false
})
