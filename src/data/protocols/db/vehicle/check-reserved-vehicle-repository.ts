import { VehicleModel } from '@/domain/models/vehicle'

export interface CheckReservedVehicleRepository {
  checkReserved: (vehicleId: string) => Promise<VehicleModel>
}
