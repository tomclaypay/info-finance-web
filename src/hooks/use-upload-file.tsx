import { useApolloClient } from '@apollo/client'
import { OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import GET_PRESIGNED_URL from '@app/operations/queries/get-presigned-url'
import axios from 'axios'
import { useEffect, useState } from 'react'

export interface UploadFileProps {
  filename?: string
  objectId?: string
  objectType?: OBJECT_TYPE
  type?: UPLOAD_TYPE
}

interface ThumbnailObject {
  type: string
  url: string
}

export default function useUploadFile({ objectType, objectId, type }: UploadFileProps) {
  const client = useApolloClient()
  const [files, setFiles] = useState<File[]>([])
  const [thumbnailUrls, setThumnailUrls] = useState<ThumbnailObject[]>([])
  const [thumbnailsLoading, setThumbnailsLoading] = useState(false)

  const uploadFileToS3 = async (file: File) => {
    const { data } = await client.query({
      query: GET_PRESIGNED_URL,
      variables: {
        filename: file.name,
        objectType,
        type,
        ...(objectId ? { objectId } : {}),
      },
      fetchPolicy: 'network-only',
    })

    const { url, key } = data.getPresignedUploadUrl.data

    await axios.put(url, file, { headers: { 'Content-Type': file.type } })

    return key as string
  }

  useEffect(() => {
    if (files.length > 0) {
      setThumnailUrls(
        files.map((file) => {
          return {
            type: file?.type,
            url: URL.createObjectURL(file),
          }
        })
      )
    }
  }, [files])

  const handleFileChange = async (files: File[]) => {
    setFiles(files)
  }

  const handleUploadFiles = async (newFiles?: File[]) => {
    try {
      setThumbnailsLoading(true)
      const fileMaps = newFiles || files
      const fileActions = Object.keys(fileMaps).map((key) => {
        return uploadFileToS3(fileMaps?.[Number(key)])
      })

      return await Promise.all(fileActions)
    } catch (error) {
      console.log(error)
    } finally {
      setThumbnailsLoading(false)
    }
  }

  return {
    files,
    thumbnailUrls,
    thumbnailsLoading,
    setFiles,
    setThumnailUrls,
    handleFileChange,
    handleUploadFiles,
  }
}
