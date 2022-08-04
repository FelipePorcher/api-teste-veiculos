import { CheckAccountReservedVehicleRepository } from '@/data/protocols/db/vehicle/check-account-reserved-vehicle-repository'
import { CheckAccountReservedVehicle } from '@/domain/usecases/vehicle/check-account-reserved-vehicle'

export class DbCheckAccountReservedVehicle implements CheckAccountReservedVehicle {
  constructor (
    private readonly checkAccountReservedVehicleRepo: CheckAccountReservedVehicleRepository
  ) {}

  async check (accountId: string): Promise<boolean> {
    const isReserved = await this.checkAccountReservedVehicleRepo.checkAccountReserved(accountId)

    if (isReserved) {
      return true
    } else {
      return false
    }
  }
}
