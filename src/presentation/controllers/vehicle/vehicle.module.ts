import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LoginModule } from '../login/login.module'
import { VehicleSchema } from '@/infra/db/mongoose/vehicle/vehicle-mongo-schema'
import { VehicleController } from './vehicle.controller'
import { VehicleMongoRepository } from '@/infra/db/mongoose/vehicle/vehicle-mongo-repository'
import { DbLoadVehicles } from '@/data/usecases/vehicle/load-vehicles/db-load-vehycles'
import { DbReserveVehicle } from '@/data/usecases/vehicle/reserve-vehicle/db-reserve-vehycle'
import { AccountMongoRepository } from '@/infra/db/mongoose/account/account-mongo-repository'
import { AccountSchema } from '@/infra/db/mongoose/account/account-mongo-schema'
import { DbLoadAccountByToken } from '@/data/usecases/account/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { DbCheckAccountReservedVehicle } from '@/data/usecases/vehicle/check-account-reserved-vehicle/db-check-account-reserved-vehycle'
import { DbReleaseVehicle } from '@/data/usecases/vehicle/release-vehicle/db-release-vehycle'
import { DbCheckReservedVehicle } from '@/data/usecases/vehicle/check-reserved-vehicle/db-check-reserved-vehycle'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema, collection: 'vehicle' }]),
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema, collection: 'account' }]),
    LoginModule
  ],
  controllers: [VehicleController],
  providers: [
    VehicleMongoRepository,
    AccountMongoRepository,
    {
      provide: JwtAdapter,
      useFactory: () => {
        const secret = '14682'
        return new JwtAdapter(secret)
      }
    },
    {
      provide: DbLoadVehicles,
      useFactory: (loadVehiclesRepo: VehicleMongoRepository) => {
        return new DbLoadVehicles(loadVehiclesRepo)
      },
      inject: [VehicleMongoRepository]
    },
    {
      provide: DbReleaseVehicle,
      useFactory: (updateReleaseRepo: VehicleMongoRepository, updateIsReservedReleaseRepo: VehicleMongoRepository) => {
        return new DbReleaseVehicle(updateReleaseRepo, updateIsReservedReleaseRepo)
      },
      inject: [VehicleMongoRepository, VehicleMongoRepository]
    },
    {
      provide: DbReserveVehicle,
      useFactory: (updateReserveRepo: VehicleMongoRepository, updateIsReservedRepo: VehicleMongoRepository) => {
        return new DbReserveVehicle(updateReserveRepo,updateIsReservedRepo)
      },
      inject: [VehicleMongoRepository, VehicleMongoRepository]
    },
    {
      provide: DbCheckAccountReservedVehicle,
      useFactory: (checkAccountReserveRepo: VehicleMongoRepository) => {
        return new DbCheckAccountReservedVehicle(checkAccountReserveRepo)
      },
      inject: [VehicleMongoRepository]
    },
    {
      provide: DbCheckReservedVehicle,
      useFactory: (checkReserveRepo: VehicleMongoRepository) => {
        return new DbCheckReservedVehicle(checkReserveRepo)
      },
      inject: [VehicleMongoRepository]
    },
    {
      provide: DbLoadAccountByToken,
      useFactory: (decrypter: JwtAdapter, loadAccountByTokenRepo: AccountMongoRepository) => {
        return new DbLoadAccountByToken(decrypter,loadAccountByTokenRepo)
      },
      inject: [JwtAdapter, AccountMongoRepository]
    }
  ]
})
export class VehicleModule {}
