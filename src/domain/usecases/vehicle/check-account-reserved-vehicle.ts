export interface CheckAccountReservedVehicle {
  check: (accountId: string) => Promise<boolean>
}
