import { Aggregate } from '../interfaces/common'
import { CsMember } from './cs-member'

export interface CsTeam {
  id: string
  name: string
  description: string
  cs_members: CsMember[]
  cs_members_aggregate?: Aggregate

  // Others
  [key: string]: any
}

export interface CsTeamsListResponse {
  cs_team: CsTeam[]
  cs_team_aggregate?: Aggregate
}
