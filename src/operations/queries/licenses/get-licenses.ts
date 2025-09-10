import { gql } from '@apollo/client'

const GET_LICENSES = gql`
  query getLicenses(
    $exchangeName: String
    $licenseNumber: String
    $supervisoryName: String
    $offset: Int
    $limit: Int
    $order_by: [license_order_by!]
  ) {
    licenses: license(
      where: {
        exchange: { name: { _ilike: $exchangeName } }
        supervisory_authority: { name: { _ilike: $supervisoryName } }
        supervision_license: { _ilike: $licenseNumber }
      }
      offset: $offset
      limit: $limit
      order_by: $order_by
    ) {
      authority_address
      authority_email
      authority_phone
      authority_website
      created_at
      updated_at

      supervision_license
      status
      regulatory_license_agency
      license_type_vn
      license_type_en
      id
      expiration_date
      effective_date

      updated_by
      user_update {
        displayName
        email
      }

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

    licenses_aggregate: license_aggregate(
      where: {
        exchange: { name: { _ilike: $exchangeName } }
        supervisory_authority: { name: { _ilike: $licenseNumber } }
        supervision_license: { _ilike: $supervisoryName }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`

export default GET_LICENSES
