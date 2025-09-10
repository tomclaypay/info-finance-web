import { COMPLAINT_UPDATE_ACTION } from '@app/constants/complaint'

export interface Option {
  label: string
  label_en?: string
  value: string
}

export interface UserOption extends Option {
  email: string
  phone: string
}

export interface WebsiteOption extends Option {
  logo?: string
}

export interface RoleOption extends Option {
  role: string
}

export interface Aggregate {
  aggregate: {
    count: number
    [key: string]: any
  }
  nodes: {
    [key: string]: any
  }
}

export interface ComplaintUpdateAction {
  index: number
  actions: COMPLAINT_UPDATE_ACTION[]
  children: string[]
  next: number | null
}
