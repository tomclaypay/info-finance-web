import { COMPLAINT_STATUS } from '@app/constants/complaint'
import { Aggregate } from '../interfaces/common'
import { CancelRequests } from './cancel-request'
import { CsMember } from './cs-member'
import { Exchange } from './exchange'
import { User } from './user'

export interface Complaint {
  id: string
  fullname?: string
  email: string
  phone: string
  description?: string
  status: COMPLAINT_STATUS
  images?: string[]
  closeReason?: string
  website?: string
  createdAt: string
  updatedAt: string
  title?: string
  slug?: string
  hidden?: boolean
  highlight_on_broker?: boolean

  // References
  exchangeId: string
  exchangeName: string
  complaintCategoryId: string
  createdBy: string
  attachments: ComplaintAttachment[]
  category: ComplaintCategory
  exchange: Exchange
  logs: ComplaintLog[]
  user: User
  cancelRequests: CancelRequests[]
  handle_by?: CsMember

  // Others
  [key: string]: any
}

export type UpdatingComplaintStatus = Pick<Complaint, 'complaintId' | 'status' | 'description' | 'closeReason'>
export type CreatingUpdatingComplaint = Pick<Complaint, 'complaintId' | 'status' | 'description' | 'closeReason'>
export interface UploadingComplaintContract {
  complaintId: string
  name?: string
  files?: string[]
}

export interface ComplaintCategory {
  id: string
  name: string
  slug: string
  icon?: string
  description?: string
  createdAt?: string
  updatedAt?: string

  // Others
  [key: string]: any
}

export interface ComplaintLog {
  id: string
  name?: string
  note?: string
  attachments: string[]
  createdAt: string
  updatedAt: string
  type?: string
  oldStatus?: COMPLAINT_STATUS
  newStatus?: COMPLAINT_STATUS

  // References
  createdBy: string
  complaintId: string

  user: User

  // Others
  [key: string]: any
}

export interface ComplaintAttachment {
  id: string
  name?: string
  type: string
  files: string[]
  createdAt: string
  updatedAt: string

  // References
  createdBy: string
  complaintId: string

  // Others
  [key: string]: any
}

export interface ComplaintListResponse {
  complaints: Complaint[]
  complaints_aggregate?: Aggregate
}

export interface ComplaintCategoryListResponse {
  complaint_categories: ComplaintCategory[]
  complaint_categories_aggregate?: Aggregate
}

export interface ComplainLogListResponse {
  complaint_logs: ComplaintLog[]
  complaint_logs_aggregate?: Aggregate
}

export interface ComplaintAttachmentListResponse {
  complaint_attachments: ComplaintAttachment[]
  complaint_attachments_aggregate?: Aggregate
}

export type OrderComplaintType = 'LATEST' | 'OLDEST'
