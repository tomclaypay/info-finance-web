import { gql } from '@apollo/client'

const DELETE_DOCUMENTARY_EVIDENCE = gql`
  mutation deleteDocumentaryEvidence($id: uuid!) {
    delete_documentary_evidence_by_pk(id: $id) {
      id
    }
  }
`

export default DELETE_DOCUMENTARY_EVIDENCE
