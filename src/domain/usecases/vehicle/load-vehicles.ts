import { VehicleModel } from '@/domain/models/vehicle'

export interface LoadVehicles {
  load: (vehicleId: string) => Promise<VehicleModel[]>
}
