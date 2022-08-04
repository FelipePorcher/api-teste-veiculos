import { UpdateIsReservedRepository } from '@/data/protocols/db/vehicle/update-isreserved-vehicle-repository'
import { UpdateReserveRepository } from '@/data/protocols/db/vehicle/update-reserve-vehicle-repository'
import { ReservedByModel } from '@/domain/models/reservedBy'
import { ReserveVehicle } from '@/domain/usecases/vehicle/reserve-vehicle'

export class DbReserveVehicle implements ReserveVehicle {
  constructor (
    private readonly updateReserveRepository: UpdateReserveRepository,
    private readonly updateIsReservedRepository: UpdateIsReservedRepository
  ) {}

  async reserve (vehicleId: string, account: ReservedByModel): Promise<Boolean> {
    try {
      await this.updateReserveRepository.updateReservedBy(vehicleId,account)
      await this.updateIsReservedRepository.updateIsReserved(vehicleId,true)
      return true
    } catch {
      return false
    }
  }
}
