export interface CheckReservedVehicle {
  check: (vehicleId: string) => Promise<boolean>
}
