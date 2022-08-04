import { CheckReservedVehicleRepository } from '@/data/protocols/db/vehicle/check-reserved-vehicle-repository'
import { CheckReservedVehicle } from '@/domain/usecases/vehicle/check-reserved-vehicle'

export class DbCheckReservedVehicle implements CheckReservedVehicle {
  constructor (
    private readonly checkReservedVehicleRepo: CheckReservedVehicleRepository
  ) {}

  async check (vehicleId: string): Promise<boolean> {
    const isReserved = await this.checkReservedVehicleRepo.checkReserved(vehicleId)
    console.log(isReserved)
    if (isReserved) {
      return true
    } else {
      return false
    }
  }
}
