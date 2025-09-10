import { Aggregate } from './common'
import { License } from './license'

export interface DocumentaryEvidence {
  id: string
  updated_at?: string
  created_at?: string
  title: string
  file?: any
  license_id?: any

  // References
  license?: License
  // Others
  [key: string]: any
}

export interface NationalListResponse {
  documentary_evidences: DocumentaryEvidence[]
  documentary_evidence_aggregate?: Aggregate
}
