import useUploadFile, { UploadFileProps } from '@app/hooks/use-upload-file'
import { UploadFileRef } from '@app/pages/dashboard/complaints/create'
import { createContext, Dispatch, forwardRef, ReactNode, Ref, useImperativeHandle } from 'react'

interface UploadFileProviderProps extends UploadFileProps {
  children: ReactNode
}

interface UploadFileContextTypes {
  files?: File[]
  thumbnailUrls?: { type: string; url: string }[]
  thumbnailsLoading?: boolean
  setFiles?: Dispatch<any>
  setThumnailUrls?: Dispatch<any>
  handleFileChange?: (files: File[]) => void
  handleUploadFiles?: () => Promise<string[] | undefined>
}

export const UploadFileContext = createContext<UploadFileContextTypes>({})

const UploadFileProvider = (props: UploadFileProviderProps, ref: Ref<UploadFileRef>) => {
  const { children, type, objectType, objectId } = props
  const { files, thumbnailsLoading, thumbnailUrls, setFiles, setThumnailUrls, handleFileChange, handleUploadFiles } =
    useUploadFile({
      objectType,
      objectId,
      type,
    })

  useImperativeHandle(ref, () => ({
    handleUploadFiles,
  }))

  return (
    <UploadFileContext.Provider
      value={{
        files,
        thumbnailsLoading,
        thumbnailUrls,
        setFiles,
        setThumnailUrls,
        handleFileChange,
        handleUploadFiles,
      }}
    >
      {children}
    </UploadFileContext.Provider>
  )
}

export default forwardRef(UploadFileProvider)
