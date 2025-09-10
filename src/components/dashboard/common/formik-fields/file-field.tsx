import { FormControl, FormHelperText } from '@mui/material'
import { ErrorMessage, FieldProps } from 'formik'
import { Dispatch, useEffect, useState } from 'react'
import FileDropZone from '../file-drop-zone'
import PopupAlert from '../popup-alert'

export interface FileFieldProps extends FieldProps {
  disabled: boolean
  title: string
  files: File[]
  thumbnailUrls: string[]
  limit?: number
  setFiles: Dispatch<any>
  setThumnailUrls: Dispatch<any>
  onChange: (files: File[]) => void
}

export default function FileField(props: FileFieldProps) {
  const { field, form, title, files, limit, setFiles, thumbnailUrls, setThumnailUrls, onChange, disabled } = props
  const { name, value } = field
  const [openPopup, setOpenPopup] = useState(false)
  const [alertPopup, setAlertPopup] = useState('')

  useEffect(() => {
    if (value) {
      setThumnailUrls(value)
    }
  }, [value])

  const handleFileChange = (files: File[]) => {
    if (name === 'images') {
      if (files?.every((file) => file?.type?.includes('image'))) {
        onChange(files)
        form.setFieldValue(name, [])
      } else {
        setOpenPopup(true)
        setAlertPopup('Vui lòng chọn đúng tệp hình ảnh')
      }
    }
    if (name === 'files' || name === 'upload') {
      if (files?.find((file) => file?.type?.includes('image'))) {
        setOpenPopup(true)
        setAlertPopup('Vui lòng chọn đúng tệp văn bản')
      } else if (limit && files.length > 5) {
        setOpenPopup(true)
        setAlertPopup('Bạn chỉ có thể upload tối đa 5 files')
      } else {
        onChange(files)
        form.setFieldValue(name, [])
      }
    }
    if (name === 'attachments') {
      onChange(files)
      form.setFieldValue(name, [])
    }
  }

  const handleRemoveFile = (index: number) => {
    if (files.length > 0) {
      const newUrls = [...(files || [])]
      newUrls.splice(index, 1)
      setFiles(newUrls)
    } else {
      const newUrls = [...thumbnailUrls]
      newUrls.splice(index, 1)
      form.setFieldValue(name, newUrls)
    }
  }

  const showError = Boolean(form.errors[name] && form.touched[name])

  return (
    <>
      <FormControl error={showError} fullWidth>
        <FileDropZone
          title={title}
          thumbnailUrls={thumbnailUrls}
          onDrop={handleFileChange}
          onRemove={handleRemoveFile}
          disabled={disabled}
        />
        <ErrorMessage name={name} component={FormHelperText} />
      </FormControl>
      <PopupAlert
        open={openPopup}
        alert={alertPopup}
        handleClose={() => {
          setOpenPopup(false)
          setAlertPopup('')
        }}
      />
    </>
  )
}
