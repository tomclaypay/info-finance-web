import { gql } from '@apollo/client'

const GET_PRESIGNED_URL = gql`
  query getPresignedUploadUrl($filename: String!, $objectId: uuid, $objectType: String, $type: String) {
    getPresignedUploadUrl(filename: $filename, type: $type, objectId: $objectId, objectType: $objectType) {
      code
      data
      message
    }
  }
`

export default GET_PRESIGNED_URL
