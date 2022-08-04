export interface ReleaseReserveRepository {
  updateReservedBy: (id: string) => Promise<void>
}
