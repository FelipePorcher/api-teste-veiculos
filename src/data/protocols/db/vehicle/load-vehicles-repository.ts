import { VehicleModel } from '@/domain/models/vehicle'

export interface LoadVehiclesRepository {
  loadAll: () => Promise<VehicleModel[]>
}
