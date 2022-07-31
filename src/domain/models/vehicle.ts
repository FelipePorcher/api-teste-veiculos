import { AccountModel } from './account'

export interface VehicleModel {
  id: string
  model: string
  nameplate: string
  isReserved: boolean
  reservedBy?: AccountModel
}
