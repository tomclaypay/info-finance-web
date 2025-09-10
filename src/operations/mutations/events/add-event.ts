import { gql } from '@apollo/client'

const ADD_EVENT = gql`
  mutation addEvent(
    $title: String
    $location: String
    $description: String
    $images: jsonb
    $images_event_end: jsonb
    $start: timestamptz
    $end: timestamptz
    $fake_participant_num: Int
  ) {
    insert_event_one(
      object: {
        title: $title
        location: $location
        description: $description
        images: $images
        start: $start
        end: $end
        images_event_end: $images_event_end
        fake_participant_num: $fake_participant_num
      }
    ) {
      id
    }
  }
`

export default ADD_EVENT
