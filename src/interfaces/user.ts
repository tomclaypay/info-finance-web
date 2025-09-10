import { Aggregate } from '../interfaces/common'

export interface User {
  id: string
  username: string
  email: string
  phone?: string
  isEmailVerified: boolean
  isPhoneVerified: boolean
  fullname?: string
  displayName?: string
  bio?: string
  avatar?: string
  cover?: string
  gender?: string
  joinedAt?: string
  createdAt: string
  role: string
  updatedAt?: string
  birthday?: string
  address?: string
  city?: string
  nationalId?: string
  frontNationalImage?: string
  backNationalImage?: string
  kycType: string
  kyc: boolean
  password?: string
  confirmPassword?: string
  preferredUsername?: string

  // Others
  [key: string]: any
}

export interface UserListResponse {
  users: User[]
  users_aggregate?: Aggregate
}

export interface Seeder {
  id: string
  email: string
  fullname?: string
  avatar?: string
}

export interface UserListResponse {
  users: User[]
  users_aggregate?: Aggregate
}

export interface SeederListResponse {
  seeders: Seeder[]
  seeders_aggregate?: Aggregate
}
