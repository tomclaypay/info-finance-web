import { Aggregate } from './common'

export interface National {
  id: string
  name: string
  name_vn: string
  logo?: any
  updated_at: string
  created_at: string

  // References

  // Others
  [key: string]: any
}

export interface NationalListResponse {
  nationals: National[]
  nationals_aggregate?: Aggregate
}
