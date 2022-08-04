import { ReleaseReserveRepository } from '@/data/protocols/db/vehicle/release-reserve-vehicle-repository'
import { UpdateIsReservedRepository } from '@/data/protocols/db/vehicle/update-isreserved-vehicle-repository'
import { ReleaseReserveVehicle } from '@/domain/usecases/vehicle/release-reserve-vehicle'

export class DbReleaseVehicle implements ReleaseReserveVehicle {
  constructor (
    private readonly releaseReserveRepository: ReleaseReserveRepository,
    private readonly updateIsReservedRepository: UpdateIsReservedRepository
  ) {}

  async release (vehicleId: string): Promise<Boolean> {
    try {
      await this.releaseReserveRepository.updateReservedBy(vehicleId)
      await this.updateIsReservedRepository.updateIsReserved(vehicleId,false)
      return true
    } catch {
      return false
    }
  }
}
