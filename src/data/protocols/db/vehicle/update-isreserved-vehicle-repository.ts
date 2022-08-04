export interface UpdateIsReservedRepository {
  updateIsReserved: (id: string, isReserved: boolean) => Promise<void>
}
