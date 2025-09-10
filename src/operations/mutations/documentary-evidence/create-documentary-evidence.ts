import { gql } from '@apollo/client'

const CREATE_DOCUMENTARY_EVIDENCE = gql`
  mutation createDocumentEvidence($file: String, $license_id: uuid, $title: String) {
    insert_documentary_evidence_one(object: { file: $file, license_id: $license_id, title: $title }) {
      id
    }
  }
`

export default CREATE_DOCUMENTARY_EVIDENCE
