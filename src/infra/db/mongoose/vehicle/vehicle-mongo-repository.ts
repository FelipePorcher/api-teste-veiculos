
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Vehicle } from './vehicle-mongo-model'
import { VehicleModel } from '@/domain/models/vehicle'
import { ReservedByModel } from '@/domain/models/reservedBy'
import { UpdateReserveRepository } from '@/data/protocols/db/vehicle/update-reserve-vehicle-repository'
import { ReleaseReserveRepository } from '@/data/protocols/db/vehicle/release-reserve-vehicle-repository'
import { LoadVehiclesRepository } from '@/data/protocols/db/vehicle/load-vehicles-repository'
import { CheckAccountReservedVehicleRepository } from '@/data/protocols/db/vehicle/check-account-reserved-vehicle-repository'
import { UpdateIsReservedRepository } from '@/data/protocols/db/vehicle/update-isreserved-vehicle-repository'
import { CheckReservedVehicleRepository } from '@/data/protocols/db/vehicle/check-reserved-vehicle-repository'

@Injectable()
export class VehicleMongoRepository implements UpdateReserveRepository, ReleaseReserveRepository, LoadVehiclesRepository, CheckAccountReservedVehicleRepository,CheckReservedVehicleRepository, UpdateIsReservedRepository {
  constructor (@InjectModel('Vehicle') private readonly Vehicle: Model<Vehicle>) {}

  async loadAll (): Promise<VehicleModel[]> {
    return await this.Vehicle.find()
  }

  async updateReservedBy (id: string, account: ReservedByModel = null): Promise<void> {
    const vehicle = await this.Vehicle.updateOne({ _id: id }, { reservedBy: account }).exec()
    console.log(vehicle)
  }

  async updateIsReserved (id: string, isReserved: boolean): Promise<void> {
    await this.Vehicle.updateOne({ _id: id }, { isReserved }).exec()
  }

  async checkAccountReserved (accountId: string): Promise<VehicleModel> {
    return await this.Vehicle.findOne({ 'reservedBy._id': accountId }).exec()
  }

  async checkReserved (vehicleId: string): Promise<VehicleModel> {
    return await this.Vehicle.findOne({ _id: vehicleId, isReserved: true }).exec()
  }
}
