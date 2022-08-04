import { ReservedByModel } from '@/domain/models/reservedBy'

export interface UpdateReserveRepository {
  updateReservedBy: (id: string, account: ReservedByModel) => Promise<void>
}
