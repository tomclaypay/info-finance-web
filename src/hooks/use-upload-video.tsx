import { useApolloClient } from '@apollo/client'
import { OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import GET_PRESIGNED_URL from '@app/operations/queries/get-presigned-url'
import axios from 'axios'

export interface UploadFileProps {
  filename?: string
  objectId?: string
  objectType?: OBJECT_TYPE
  type?: UPLOAD_TYPE
}

export default function useUploadVideo({ objectType, objectId, type }: UploadFileProps) {
  const client = useApolloClient()

  const uploadVideoToS3 = async (video: File) => {
    const { data } = await client.query({
      query: GET_PRESIGNED_URL,
      variables: {
        filename: video.name,
        objectType,
        type,
        ...(objectId ? { objectId } : {}),
      },
      fetchPolicy: 'network-only',
    })

    const { url, key } = data.getPresignedUploadUrl.data

    await axios.put(url, video, { headers: { 'Content-Type': video.type } })

    return key
  }

  return { uploadVideoToS3 }
}
