import { ReservedByModel } from '@/domain/models/reservedBy'
import { Document } from 'mongoose'

export interface Vehicle extends Document {
  model: string
  nameplate: string
  isReserved: boolean
  reservedBy?: ReservedByModel
}
