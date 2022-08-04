import { DbLoadAccountByToken } from '@/data/usecases/account/load-account-by-token/db-load-account-by-token'
import { DbCheckAccountReservedVehicle } from '@/data/usecases/vehicle/check-account-reserved-vehicle/db-check-account-reserved-vehycle'
import { DbCheckReservedVehicle } from '@/data/usecases/vehicle/check-reserved-vehicle/db-check-reserved-vehycle'
import { DbLoadVehicles } from '@/data/usecases/vehicle/load-vehicles/db-load-vehycles'
import { DbReleaseVehicle } from '@/data/usecases/vehicle/release-vehicle/db-release-vehycle'
import { DbReserveVehicle } from '@/data/usecases/vehicle/reserve-vehicle/db-reserve-vehycle'
import { VehicleModel } from '@/domain/models/vehicle'
import { Controller, ForbiddenException, Get, Headers, HttpCode, InternalServerErrorException, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('api/vehicle')
@ApiTags('Veiculos')
export class VehicleController {
  constructor (private readonly dbLoadVehicles: DbLoadVehicles,
    private readonly dbReserveVehicles: DbReserveVehicle,
    private readonly dbLoadAccountByToken: DbLoadAccountByToken,
    private readonly dbCheckAccountReservedVehicle: DbCheckAccountReservedVehicle,
    private readonly dbCheckReservedVehicle: DbCheckReservedVehicle,
    private readonly dbReleaseVehicles: DbReleaseVehicle) {}

  @Get()
  @HttpCode(200)
  async loadVehicles (@Headers() header): Promise<VehicleModel[]> {
    const accessToken = header?.['x-access-token']
    if (!accessToken) {
      throw new ForbiddenException('Token não encontrado em headers: x-access-token')
    }

    const account = await this.dbLoadAccountByToken.load(accessToken)
    if (!account) {
      throw new ForbiddenException('Token Invalido')
    }
    try {
      const vehicles = await this.dbLoadVehicles.load()
      return vehicles
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  @Post(':id/reserve')
  @HttpCode(204)
  async reserveVehicles (@Param('id') id, @Headers() header): Promise<void> {
    const accessToken = header?.['x-access-token']
    if (!accessToken) {
      throw new ForbiddenException('Token não encontrado em headers: x-access-token')
    }

    const account = await this.dbLoadAccountByToken.load(accessToken)
    if (!account) {
      throw new ForbiddenException('Token Invalido')
    }

    // verifica se ja reservou 1 vez
    const isAccountReserved = await this.dbCheckAccountReservedVehicle.check(account._id)

    if (isAccountReserved) {
      throw new ForbiddenException('Usuário autenticado já reservou um veículo')
    }

    // verifica carro esta reservado
    const isVehicleReserved = await this.dbCheckReservedVehicle.check(id)
    if (isVehicleReserved) {
      throw new ForbiddenException('Veiculo já está reservado')
    }

    try {
      const { _id, name, email } = account
      await this.dbReserveVehicles.reserve(id, { _id, name, email })
      // const vehicles = await this.dbReserveVehicles.re()
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  @Post(':id/release')
  @HttpCode(204)
  async releaseVehicles (@Param('id') id, @Headers() header): Promise<void> {
    const accessToken = header?.['x-access-token']
    if (!accessToken) {
      throw new ForbiddenException('Token não encontrado em headers: x-access-token')
    }

    const account = await this.dbLoadAccountByToken.load(accessToken)
    if (!account) {
      throw new ForbiddenException('Token Invalido')
    }
    try {
      await this.dbReleaseVehicles.release(id)
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
