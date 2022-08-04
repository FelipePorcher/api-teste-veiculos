import { ReservedByModel } from '@/domain/models/reservedBy'

export interface ReserveVehicle {
  reserve: (vehicleId: string, account: ReservedByModel) => Promise<Boolean>
}
