import { LoadVehiclesRepository } from '@/data/protocols/db/vehicle/load-vehicles-repository'
import { VehicleModel } from '@/domain/models/vehicle'
import { LoadVehicles } from '@/domain/usecases/vehicle/load-vehicles'

export class DbLoadVehicles implements LoadVehicles {
  constructor (
    private readonly loadVehiclesRepository: LoadVehiclesRepository
  ) {}

  async load (): Promise<VehicleModel[]> {
    try {
      const vehicles = await this.loadVehiclesRepository.loadAll()
      return vehicles
    } catch {
      return null
    }
  }
}
