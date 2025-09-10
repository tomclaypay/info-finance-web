import { Event } from '@app/interfaces/event'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import viLocale from 'date-fns/locale/vi'
import { useRouter } from 'next/router'

interface DialogProps {
  open: boolean
  onClose?: () => void
  event?: Event
  listed?: Event
  handleRegister?: () => void
}
const ModalEvent = ({ open, onClose, handleRegister, event, listed }: DialogProps) => {
  const { locale } = useRouter()
  return (
    <>
      {event && (
        <Dialog open={open} onClose={onClose}>
          <DialogTitle sx={{ textTransform: 'capitalize' }}>{event?.title}</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ minWidth: 500 }}>
              <Stack direction="row" spacing={1} alignItems="flex-end">
                <Image
                  src={
                    'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Calendar_fb8cf670c6.png?updated_at=2022-10-25T06:59:21.241Z'
                  }
                  alt="icon"
                  width={24}
                  height={24}
                  loading="lazy"
                />
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" color="subtitle.main">
                    {locale === 'vi'
                      ? format(new Date(event?.start), "dd 'tháng' L uuuu", {
                          locale: viLocale,
                        })
                      : format(new Date(event?.start), 'd MMM uuuu')}
                  </Typography>
                  <Box
                    sx={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '100%',
                      backgroundColor: '#67696E',
                      flex: '1',
                    }}
                  />
                  <Typography variant="body2" color="subtitle.main">
                    {format(new Date(event?.start), 'HH:mm', {
                      locale: viLocale,
                    })}
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="flex-end">
                <Image
                  src={
                    'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Map_Pin_ec69c8d7fd.png?updated_at=2022-10-25T06:56:56.317Z'
                  }
                  alt="icon"
                  width={24}
                  height={24}
                  loading="lazy"
                />
                <Typography
                  variant="body2"
                  color="subtitle.main"
                  sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1,
                    flex: '1',
                  }}
                >
                  {event?.location}
                </Typography>
              </Stack>
              <Box
                sx={{
                  overflow: 'hidden',
                  position: 'relative',
                  height: '100%',
                  paddingTop: '48.25%',
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
                  src={event?.images?.[0]}
                  alt="Hình ảnh"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
                  loading="lazy"
                />
              </Box>
            </DialogContentText>
          </DialogContent>
          <Divider />
          <DialogActions>
            {new Date(event.end) > new Date() ? (
              <>
                <Button variant="outlined" onClick={onClose}>
                  Thoát
                </Button>
                {listed ? (
                  <Button variant="contained" sx={{ textTransform: 'capitalize' }} onClick={handleRegister}>
                    Huỷ đăng ký
                  </Button>
                ) : (
                  <Button variant="contained" sx={{ textTransform: 'capitalize' }} onClick={handleRegister}>
                    Tham gia
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button variant="outlined" onClick={onClose}>
                  Thoát
                </Button>
                <Button variant="contained" sx={{ textTransform: 'capitalize' }} disabled>
                  Sự kiện đã diễn ra
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default ModalEvent
