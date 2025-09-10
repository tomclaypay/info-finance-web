import { gql } from '@apollo/client'

const REGISTER_EVENT = gql`
  mutation registerEvent(
    $email: String
    $eventId: uuid
    $jobPosition: String
    $name: String
    $origin: String
    $phone: String
  ) {
    insert_event_register_one(
      object: {
        email: $email
        event_id: $eventId
        job_position: $jobPosition
        name: $name
        origin: $origin
        phone_num: $phone
      }
    ) {
      email
      event_id
      id
    }
  }
`

export default REGISTER_EVENT
