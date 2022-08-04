import { VehicleModel } from '@/domain/models/vehicle'

export interface CheckAccountReservedVehicleRepository {
  checkAccountReserved: (accountId: string) => Promise<VehicleModel>
}
