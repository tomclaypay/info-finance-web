import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Dropzone from 'react-dropzone'
import Thumbnails from './thumbnails'

interface FileDropZoneProps {
  title: string
  thumbnailUrls: string[]
  onDrop?: (acceptedFiles: File[]) => void
  onRemove: (index: number) => void
  disabled: boolean
}

export default function FileDropZone(props: FileDropZoneProps) {
  const { title, thumbnailUrls, onDrop, onRemove, disabled } = props

  return (
    <>
      <Dropzone onDrop={onDrop} disabled={disabled}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <Box
            sx={{
              alignItems: 'center',
              border: 1,
              borderRadius: 1,
              borderColor: 'divider',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              height: 205,
              opacity: disabled ? '0.5' : '1',
              cursor: !disabled && 'pointer',
              ...(isDragActive && {
                backgroundColor: disabled ? 'default' : 'action.active',
                opacity: 0.5,
              }),
              '&:hover': {
                backgroundColor: disabled ? 'default' : 'action.hover',
                opacity: 0.5,
              },
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Box sx={{ height: 72, width: 72, position: 'relative' }}>
              <Image
                loading="lazy"
                alt="Select file"
                src={'/static/undraw_add_file2_gvbb.svg'}
                layout="fill"
                objectFit="cover"
              />
            </Box>
            <Box sx={{ p: 3 }}>
              <Typography color="textPrimary" variant="h6" textTransform="capitalize">
                {title}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography color="textPrimary" variant="body2">
                  Kéo thả tệp hoặc nhấn để chọn
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Dropzone>
      <Thumbnails disabled={disabled} thumbnailUrls={thumbnailUrls} onRemove={onRemove} />
    </>
  )
}
