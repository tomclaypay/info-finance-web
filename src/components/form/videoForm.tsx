import { Box, Button, LinearProgress, Stack, Typography } from '@mui/material'
import { FieldProps } from 'formik'
import Image from 'next/image'
import ReactPlayer from 'react-player'

interface VideoFieldFormProps extends FieldProps {
  label: string
  placeholder: string
  disabled: boolean
  slides?: boolean
  type: string
  video: any
  handleDropVideo: (event: any) => void
  handleRemoveVideo: () => void
  isSubmitting: boolean
}

const VideoFieldForm = (props: VideoFieldFormProps) => {
  const { field, label, video, handleDropVideo, handleRemoveVideo, form, disabled, isSubmitting } = props
  const { name, value } = field
  const { setFieldValue } = form

  return (
    <Box
      sx={{
        height: '500px',
      }}
    >
      {value !== '' ? (
        <Stack spacing={1} alignItems="flex-start">
          <Box borderRadius={1} bgcolor="common.black" overflow="hidden" width="100%" height="450px">
            <ReactPlayer controls width="100%" height="100%" url={value} />
          </Box>

          {!isSubmitting && (
            <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%" px={1}>
              <Typography variant="subtitle2" fontWeight={500}>
                {value}
              </Typography>
              <Button color="error" variant="text" onClick={() => setFieldValue(name, '')}>
                Xoá
              </Button>
            </Stack>
          )}

          {isSubmitting && (
            <Box width="100%">
              <LinearProgress />
            </Box>
          )}
        </Stack>
      ) : video !== '' ? (
        <Stack spacing={1} alignItems="flex-start">
          <Box borderRadius={1} bgcolor="common.black" overflow="hidden" width="100%" height="450px">
            <ReactPlayer controls width="100%" height="100%" url={URL.createObjectURL(video)} />
          </Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%" px={1}>
            <Typography variant="subtitle2" fontWeight={500}>
              {video.name}
            </Typography>

            {!isSubmitting && (
              <Button color="error" onClick={handleRemoveVideo} variant="text">
                Xoá
              </Button>
            )}
            {isSubmitting && (
              <Box width="100%">
                <LinearProgress />
              </Box>
            )}
          </Stack>
        </Stack>
      ) : (
        <>
          <label
            htmlFor={name}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 10px',
              cursor: !disabled ? 'pointer' : 'default',
            }}
          >
            <Box sx={{ height: 72, width: 72, position: 'relative' }}>
              <Image
                loading="lazy"
                alt="Select file"
                src={'/static/undraw_add_file2_gvbb.svg'}
                layout="fill"
                objectFit="cover"
              />
            </Box>
            <Box>
              <Typography color="textPrimary" variant="h3" textTransform="capitalize">
                {label}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography color="textPrimary" variant="body2">
                  Kéo thả tệp hoặc nhấn để chọn
                </Typography>
              </Box>
            </Box>
          </label>
          <input
            name={name}
            type="file"
            id={name}
            accept="video/mp4,video/mkv, video/x-m4v,video/*"
            onChange={handleDropVideo}
            style={{ display: 'none' }}
          />
        </>
      )}
    </Box>
  )
}

export default VideoFieldForm
