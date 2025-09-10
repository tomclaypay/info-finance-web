import { Aggregate } from './common'
import { DocumentaryEvidence } from './documentary-evidence'
import { Exchange } from './exchange'
import { Supervisor } from './supervisor'
export interface License {
  id: string
  authority_address: string
  authority_email: string
  authority_phone: string
  authority_website: string
  effective_date: string
  exchange_id: string
  exchange_name?: string
  expiration_date: string
  license_type_en: string
  license_type_vn: string
  regulatory_license_agency: string
  status: string
  status_en?: string
  supervisory_authority_id: string
  supervisory_authority_name?: string
  supervision_license: string
  created_at: string
  updated_at: string
  updated_by: string

  // References
  documentary_evidences: DocumentaryEvidence[]
  exchange: Exchange
  supervisory_authority: Supervisor

  // Others
  [key: string]: any
}

export interface LicensesListResponse {
  licenses: License[]
  licenses_aggregate?: Aggregate
}
