import { Aggregate } from './common'
import { National } from './national'

export interface Supervisor {
  id: string
  updated_at: string
  created_at: string
  name: string
  national_id?: string
  intro_vn?: string
  intro_en?: string
  logo?: any
  abbreviation_name?: string
  icon?: any

  // References
  national?: National
  // Others
  [key: string]: any
}

export interface SupervisoriesListResponse {
  supervisories: Supervisor[]
  supervisories_aggregate?: Aggregate
}
