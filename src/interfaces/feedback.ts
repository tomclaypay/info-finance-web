import { Aggregate } from './common'
import { Exchange } from './exchange'
import { Seeder, User } from './user'

export interface Feedback {
  id?: string
  comment?: string
  created_at: string
  hidden: boolean
  point: number
  updated_at: string
  exchange_id?: string
  user_id?: string
  seeder_id?: string
  // References
  exchange: Exchange
  user: User
  seeder: Seeder

  // Others
  [key: string]: any
}

export interface FeedbackListResponse {
  feedbacks: Feedback[]
  feedbacks_aggregate: Aggregate
}
