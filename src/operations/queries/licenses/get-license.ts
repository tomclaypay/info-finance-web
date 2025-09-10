import { gql } from '@apollo/client'

const GET_LICENSE = gql`
  query getLicense($licenseId: uuid!) {
    license_by_pk(id: $licenseId) {
      authority_address
      authority_email
      authority_phone
      authority_website
      created_at
      updated_at
      supervision_license
      status
      status_en
      regulatory_license_agency
      license_type_vn
      license_type_en
      id
      expiration_date
      effective_date

      documentary_evidences {
        created_at
        file
        id
        title
        updated_at
      }

      exchange_id
      exchange {
        id
        name
        logo
      }

      supervisory_authority_id
      supervisory_authority {
        name
        logo
        id
        abbreviation_name
      }
    }
  }
`

export default GET_LICENSE
