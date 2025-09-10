import { Aggregate } from './common'
import { Complaint } from './complaint'
import { Feedback } from './feedback'
import { License } from './license'
import { National } from './national'

export interface IWebsite {
  url: string
  national_id: string
}
export interface Exchange {
  id: string
  name: string
  logo?: any
  icon?: any
  headquarter?: string
  operationYears?: string
  description?: string
  createdAt: string
  website?: IWebsite[]
  updatedAt: string
  country?: string
  abbreviation?: string
  supervision_time?: string
  supervision_time_en?: string
  supervision_status?: string
  supervision_status_en?: string
  trading_product?: []
  trading_product_en?: []
  trading_platform?: []
  trading_platform_en?: []
  email?: string
  phone?: string
  intro?: string
  intro_en?: string
  slug?: string
  total_feedback_point?: number
  total_point?: number
  license_point?: number
  is_top_broker?: boolean
  hidden?: boolean
  rate_top_broker?: number
  is_trader_all_choose?: boolean
  rate_trader_all_choose?: number
  risk_point?: number
  operation_point?: number
  manage_point?: number
  soft_point?: number
  national_id?: string
  national_name?: string
  // References
  national: National
  complaints: Complaint[]
  complaints_aggregate: Aggregate
  feedbacks: Feedback[]
  feedbacks_aggregate: Aggregate
  licenses?: License[]
  licenses_aggregate: Aggregate

  // Others
  [key: string]: any
}

export interface ExchangeListResponse {
  exchanges: Exchange[]
  exchanges_aggregate: Aggregate
}

export interface GeneralExchange {
  id: string
  title: string
  title_en: string
  description: any
  description_en: any

  // Others
  [key: string]: any
}

export interface GeneralExchangeResponse {
  general_broker: GeneralExchange[]
}
