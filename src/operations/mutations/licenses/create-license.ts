import { gql } from '@apollo/client'

const CREATE_LICENSE = gql`
  mutation createLicense(
    $authority_address: String
    $authority_email: String
    $authority_phone: String
    $authority_website: String
    $effective_date: timestamptz
    $exchange_id: uuid
    $expiration_date: timestamptz
    $license_type_en: String
    $license_type_vn: String
    $regulatory_license_agency: String
    $status: String
    $status_en: String
    $supervisory_authority_id: uuid
    $supervision_license: String
  ) {
    insert_license_one(
      object: {
        authority_address: $authority_address
        authority_email: $authority_email
        authority_phone: $authority_phone
        authority_website: $authority_website
        effective_date: $effective_date
        exchange_id: $exchange_id
        expiration_date: $expiration_date
        license_type_en: $license_type_en
        license_type_vn: $license_type_vn
        regulatory_license_agency: $regulatory_license_agency
        status: $status
        status_en: $status_en
        supervisory_authority_id: $supervisory_authority_id
        supervision_license: $supervision_license
      }
    ) {
      id
    }
  }
`

export default CREATE_LICENSE
