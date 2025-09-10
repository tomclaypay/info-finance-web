import { CANCEL_REQUEST_STATUS } from '@app/constants/common'
import { Complaint } from './complaint'

export interface CancelRequests {
  id: string
  reason: string
  status: CANCEL_REQUEST_STATUS

  // References
  complaintId: string
  createdBy: string
  updatedBy?: string
  createdAt: string
  updatedAt: string
  complaint: Complaint

  // Others
  [key: string]: any
}

export type UpdatingCancelRequest = Pick<CancelRequests, 'id' | 'status'>
