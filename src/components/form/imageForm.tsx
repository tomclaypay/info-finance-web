import { Box, Dialog, DialogContent, Grid, Stack, Typography } from '@mui/material'
import { FieldProps } from 'formik'
import Image from 'next/image'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import EmblaCarousel from '../dashboard/common/embla-carousel'
import { useState } from 'react'

export interface ImageFormProps extends FieldProps {
  label: string
  placeholder: string
  disabled: boolean
  slides?: boolean
  type: string
  imageFiles: { images: any[]; images_event_end: any[] }
  handleChangeFiles: (event: any, type: string, name: string) => void
}

const ImageFieldForm = (props: ImageFormProps) => {
  const { field, form, label, imageFiles, handleChangeFiles, disabled } = props
  const { name, value } = field
  const [open, setOpen] = useState(false)
  // console.log(imageFiles[name as keyof typeof imageFiles])

  const handleClose = () => {
    setOpen(false)
  }

  // console.log({ value })

  const handleTransferImg = (images: any) => {
    if (images?.length > 0) {
      const result = images.reduce((total: any, image: any) => [...total, URL.createObjectURL(image)], [])
      return result
    }
  }

  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{
        position: 'relative',
        // border: '1px solid rgb(0,0,0,1)',
        // borderRadius: '8px',
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
        {disabled ? null : (
          <input
            name={name}
            multiple
            type="file"
            id={name}
            onChange={(event) => {
              handleChangeFiles(event, 'addImg', name)
            }}
            style={{ display: 'none' }}
          />
        )}
      </Stack>

      <Grid container direction="row">
        {value?.length > 0 &&
          value.map((image: any, index: number) => (
            <Grid
              item
              key={index}
              xs={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover svg': {
                  display: disabled ? 'none' : 'block',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  borderRadius: '50%',
                },
                '&:hover': {
                  opacity: '0.7',
                  borderRadius: '8px',
                },
              }}
              onClick={() => setOpen(true)}
            >
              <HighlightOffOutlinedIcon
                fontSize="large"
                sx={{
                  position: 'absolute',
                  display: 'none',
                  cursor: 'pointer',
                  color: '#ffffff',
                  zIndex: '2',
                }}
                onClick={() => {
                  form.setFieldValue(
                    name,
                    value.filter((oldImage: any) => oldImage !== image)
                  )
                }}
              />
              <Box
                sx={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid #E6E8F0',
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
                <Image loading="lazy" src={image} alt="icon" layout="fill" objectFit="cover" objectPosition="center" />
              </Box>
            </Grid>
          ))}

        {imageFiles &&
          imageFiles[name as keyof typeof imageFiles]?.length > 0 &&
          imageFiles[name as keyof typeof imageFiles].map((image: any, index: number) => (
            <Grid
              item
              key={index}
              xs={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
              onClick={() => setOpen(true)}
            >
              <HighlightOffOutlinedIcon
                fontSize="large"
                sx={{
                  position: 'absolute',
                  display: 'none',
                  cursor: 'pointer',
                  color: '#ffffff',
                  zIndex: '2',
                }}
                onClick={() => {
                  const indexImage = imageFiles[name as keyof typeof imageFiles].indexOf(image)
                  if (indexImage > -1) {
                    const newFiles = imageFiles
                    newFiles[name as keyof typeof imageFiles].splice(indexImage, 1)
                    handleChangeFiles(newFiles, 'removeImg', name)
                  }
                }}
              />
              <Box
                sx={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid #E6E8F0',
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
                <Image
                  src={URL.createObjectURL(image)}
                  alt="icon"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  loading="lazy"
                />
              </Box>
            </Grid>
          ))}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ width: 600 }}>
          <EmblaCarousel
            internet={true}
            slides={
              false
                ? [
                    {
                      url: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/35920_c9367f9c00.png?updated_at=2022-10-07T07:59:55.903Z',
                    },
                  ]
                : imageFiles
                ? value?.concat(handleTransferImg(imageFiles[name as keyof typeof imageFiles]))
                : value
            }
          />
        </DialogContent>
      </Dialog>
    </Stack>
  )
}

export default ImageFieldForm
