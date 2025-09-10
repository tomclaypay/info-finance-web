import { Box, Dialog, DialogContent, Grid, IconButton, Stack, Typography } from '@mui/material'
import { FieldProps } from 'formik'
import Image from 'next/image'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined'
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined'
import CloseIcon from '@mui/icons-material/Close'

import PopupAlert from '../dashboard/common/popup-alert'
import { useState } from 'react'
import EmblaCarousel from '../dashboard/common/embla-carousel'

export interface ImageFormProps extends FieldProps {
  label: string
  placeholder: string
  disabled: boolean
  limit: number
  flexWrap?: boolean
}

const FileFieldForm = (props: ImageFormProps) => {
  const { field, form, label, disabled, limit, flexWrap } = props
  const { name, value } = field
  const [openPopup, setOpenPopup] = useState(false)
  const [alertPopup, setAlertPopup] = useState('')
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const changeFiles = (value: any, type: string) => {
    const files = value.filter(
      (file: any) =>
        file.name.includes('.pdf') ||
        file.name.includes('.docx') ||
        file.name.includes('.txt') ||
        file.name.includes('.xlsx')
    )

    const images = value.filter(
      (file: any) =>
        !file.name.includes('.pdf') &&
        !file.name.includes('.docx') &&
        !file.name.includes('.txt') &&
        !file.name.includes('.xlsx')
    )

    const localImages = images.reduce((acc: any, currentValue: any) => [...acc, URL?.createObjectURL(currentValue)], [])
    if (type === 'image') {
      return images
    }
    if (type === 'localImage') {
      return localImages
    }
    if (type === 'file') {
      return files
    }
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        position: 'relative',
        borderRadius: '8px',
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
        py={2}
        sx={{
          borderRadius: 1,
          opacity: disabled ? '0.5' : '1',
          border: '1px solid #E6E8F0',
          '&:hover': {
            backgroundColor: disabled ? 'default' : 'action.hover',
          },
        }}
      >
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
          multiple
          type="file"
          id={name}
          onChange={(e) => {
            if (limit && [...value, ...e.target.files].length > limit) {
              setOpenPopup(true)
              setAlertPopup(`Vui lòng chọn tối đa ${limit} files`)
            } else {
              form.setFieldValue(name, [...value, ...e.target.files])
            }
          }}
          style={{ display: 'none' }}
        />
      </Stack>

      <Stack spacing={1} my={2}>
        {value?.length > 0 &&
          changeFiles(value, 'file').map((file: any, index: number) => (
            <Stack key={index} direction="row">
              {file.name.includes('.pdf') ? <PictureAsPdfOutlinedIcon /> : <FilePresentOutlinedIcon />}
              <Typography mr={1}>{file?.name}</Typography>
              <HighlightOffOutlinedIcon
                sx={{
                  cursor: 'pointer',
                  color: 'error.main',
                }}
                onClick={() =>
                  form.setFieldValue(
                    name,
                    value.filter((item: any) => item !== file)
                  )
                }
              />
            </Stack>
          ))}
      </Stack>
      {flexWrap ? (
        <Grid container spacing={2}>
          {value?.length > 0 &&
            changeFiles(value, 'image').map((image: any, index: number) => (
              <Grid item key={index} xl={3}>
                <Stack key={index} direction="row" spacing={0.5}>
                  <Box
                    position="relative"
                    width={100}
                    height={100}
                    borderRadius={1}
                    overflow="hidden"
                    sx={{
                      ':hover': {
                        cursor: 'pointer',
                      },
                    }}
                    onClick={handleClickOpen}
                  >
                    <Image
                      src={URL?.createObjectURL(image)}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      alt="Hình ảnh của bạn"
                      loading="lazy"
                    />

                    <IconButton
                      sx={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}
                      onClick={() =>
                        form.setFieldValue(
                          name,
                          value.filter((item: any) => item !== image)
                        )
                      }
                    >
                      <CloseIcon sx={{ color: 'black' }} fontSize="small" />
                    </IconButton>
                  </Box>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogContent sx={{ width: 600 }}>
                      <EmblaCarousel slides={changeFiles(value, 'localImage')} internet={true} />
                    </DialogContent>
                  </Dialog>
                </Stack>
              </Grid>
            ))}
        </Grid>
      ) : (
        <Stack direction="row" spacing={0.5}>
          {value?.length > 0 &&
            changeFiles(value, 'image').map((image: any, index: number) => (
              <Stack key={index} direction="row" spacing={0.5}>
                <Box
                  position="relative"
                  width={100}
                  height={100}
                  borderRadius={1}
                  overflow="hidden"
                  sx={{
                    ':hover': {
                      cursor: 'pointer',
                    },
                  }}
                  onClick={handleClickOpen}
                >
                  <Image
                    src={URL?.createObjectURL(image)}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="Hình ảnh của bạn"
                    loading="lazy"
                  />

                  <IconButton
                    sx={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}
                    onClick={() =>
                      form.setFieldValue(
                        name,
                        value.filter((item: any) => item !== image)
                      )
                    }
                  >
                    <CloseIcon sx={{ color: 'black' }} fontSize="small" />
                  </IconButton>
                </Box>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent sx={{ width: 600 }}>
                    <EmblaCarousel slides={changeFiles(value, 'localImage')} internet={true} />
                  </DialogContent>
                </Dialog>
              </Stack>
            ))}
        </Stack>
      )}
      <PopupAlert
        open={openPopup}
        alert={alertPopup}
        handleClose={() => {
          setOpenPopup(false)
          setAlertPopup('')
        }}
      />
    </Stack>
  )
}

export default FileFieldForm
