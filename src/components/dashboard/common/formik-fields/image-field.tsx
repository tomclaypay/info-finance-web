import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { Box, FormControl, FormHelperText, Stack, Typography } from '@mui/material'
import { ErrorMessage, FieldProps } from 'formik'
import Image from 'next/image'
import { useState } from 'react'
import PopupAlert from '../popup-alert'

export interface ImageFieldProps extends FieldProps {
  disabled: boolean
  title?: string
}

export default function ImageField(props: ImageFieldProps) {
  const { field, form, disabled, title } = props
  const { name, value } = field
  const [openPopup, setOpenPopup] = useState(false)
  const [alertPopup, setAlertPopup] = useState('')

  const handleFileChange = (e: { target: { files: string | any[] | FileList } }) => {
    if (e.target.files?.[0]?.type?.includes('image') && e.target.files.length > 0) {
      form.setFieldValue(name, e.target.files)
    } else {
      setOpenPopup(true)
      setAlertPopup('Vui lòng chọn đúng tệp hình ảnh')
    }
  }

  const showError = Boolean(form.errors[name] && form.touched[name])

  return (
    <>
      <FormControl error={showError} fullWidth>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          height="248px"
          sx={{
            borderRadius: 1,
            opacity: disabled ? '0.5' : '1',
            border: '1px solid #E6E8F0',
            '&:hover svg': {
              display: 'block',
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: '50%',
            },
            '&:hover': {
              opacity: '0.7',
              borderRadius: '8px',
            },
          }}
        >
          {value?.length > 0 ? (
            <Box
              sx={{
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                '& > span': {
                  position: 'absolute!important',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                },
              }}
            >
              <HighlightOffOutlinedIcon
                fontSize="large"
                sx={{
                  position: 'absolute',
                  display: 'none',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  color: '#ffffff',
                  zIndex: '2',
                }}
                onClick={() => {
                  form.setFieldValue(name, [])
                }}
              />
              <Image
                src={typeof value === 'string' ? value : URL?.createObjectURL(value?.[0])}
                alt="icon"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
                loading="lazy"
              />
            </Box>
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
                    {title}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography color="textPrimary" variant="body2">
                      Kéo thả tệp hoặc nhấn để chọn
                    </Typography>
                  </Box>
                </Box>
              </label>
              {disabled ? null : (
                <input
                  name={name}
                  type="file"
                  id={name}
                  onChange={handleFileChange as () => void}
                  style={{ display: 'none' }}
                />
              )}
            </>
          )}
        </Stack>
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
