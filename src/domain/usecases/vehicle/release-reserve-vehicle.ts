export interface ReleaseReserveVehicle {
  release: (vehicleId: string) => Promise<Boolean>
}
