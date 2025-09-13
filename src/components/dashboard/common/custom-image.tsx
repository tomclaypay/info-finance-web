import { Box, Dialog, DialogContent, IconButton, Link, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import EmblaCarousel from './embla-carousel'
import CloseIcon from '@mui/icons-material/Close'
import NextLink from 'next/link'

interface CustomImageProps {
  image: string
  internet?: boolean
  index: number
  slides?: any[]
  onRemove?: (index: number) => void
  disabled?: boolean
}

export default function CustomImage({ internet, image, index, slides, onRemove, disabled }: CustomImageProps) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const doc = image.includes('.pdf') || image.includes('.docx')

  return (
    <>
      {internet && doc ? (
        <Link component={NextLink} target="_blank" href={image} passHref>
          <Stack alignItems="center">
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
                src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/35920_c9367f9c00.png?updated_at=2022-10-07T07:59:55.903Z"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="Hình ảnh của bạn"
                loading="lazy"
              />
              {onRemove && (
                <IconButton
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                  onClick={() => {
                    onRemove(index)
                  }}
                >
                  <CloseIcon sx={{ color: 'black' }} fontSize="small" />
                </IconButton>
              )}
            </Box>
            <Typography variant="body2">{image.split('/')[image.split('/').length - 1]}</Typography>
          </Stack>
        </Link>
      ) : (
        <>
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
              src={
                doc
                  ? 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/35920_c9367f9c00.png?updated_at=2022-10-07T07:59:55.903Z'
                  : image
              }
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="Hình ảnh của bạn"
              loading="lazy"
            />
            {onRemove && !disabled && (
              <IconButton
                sx={{ position: 'absolute', top: 0, right: 0 }}
                onClick={() => {
                  onRemove(index)
                }}
              >
                <CloseIcon sx={{ color: 'black' }} fontSize="small" />
              </IconButton>
            )}
          </Box>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent sx={{ width: 600 }}>
              <EmblaCarousel
                internet={doc ? false : internet}
                slides={
                  doc
                    ? [
                        {
                          url: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/35920_c9367f9c00.png?updated_at=2022-10-07T07:59:55.903Z',
                        },
                      ]
                    : slides
                }
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  )
}
