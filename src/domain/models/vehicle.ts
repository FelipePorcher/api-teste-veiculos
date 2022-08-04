import { ReservedByModel } from './reservedBy'

export interface VehicleModel {
  _id: string
  model: string
  nameplate: string
  isReserved: boolean
  reservedBy?: ReservedByModel
}
