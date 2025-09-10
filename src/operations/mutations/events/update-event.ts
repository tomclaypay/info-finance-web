import { gql } from '@apollo/client'

const UPDATE_EVENT = gql`
  mutation updateEvent(
    $id: uuid!
    $description: String
    $end: timestamptz
    $images: jsonb
    $images_event_end: jsonb
    $location: String
    $start: timestamptz
    $title: String
    $fake_participant_num: Int
    $video_url: String
    $video_url_mp4: String
  ) {
    update_event_by_pk(
      pk_columns: { id: $id }
      _set: {
        description: $description
        end: $end
        images: $images
        images_event_end: $images_event_end
        location: $location
        start: $start
        fake_participant_num: $fake_participant_num
        title: $title
        video_url: $video_url
        video_url_mp4: $video_url_mp4
      }
    ) {
      end
    }
  }
`

export default UPDATE_EVENT
