import { Aggregate } from '../interfaces/common'
import { Complaint } from './complaint'
import { CsTeam } from './cs-team'
import { User } from './user'

export interface CsMember {
  user: User
  id: string
  cs_team: CsTeam
  complaints: Complaint
  complaints_aggregate: Aggregate

  [key: string]: any
}
export interface CsMembersListResponse {
  cs_member: CsMember[]
  cs_member_aggregate?: Aggregate
}
