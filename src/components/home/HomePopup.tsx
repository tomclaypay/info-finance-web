import { useQuery } from '@apollo/client'
import { BannersListResponse } from '@app/interfaces/banner'
import GET_BANNERS from '@app/operations/queries/banners/get-banners'
import { Box, Dialog, Stack, IconButton } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useDesktop, useMobile } from '../common'

const HomePopup = () => {
  const { locale } = useRouter()
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  // const [persistedOpen, setPersistedOpen] = useSessionStorage('@infofinace/banner-state', true)
  const [persistedOpen, setPersistedOpen] = useState(true)
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
    setPersistedOpen(false)
  }

  const { data } = useQuery<BannersListResponse>(GET_BANNERS, {
    variables: {
      positionEqual: isMobile ? 'home_popup_mobile' : 'home_popup_desktop',
    },
  })

  const banner = data?.banners.find((item) => item.language === (locale === 'en' ? 'en' : 'vn'))

  return (
    <Dialog
      sx={{
        objectFit: 'contain',
        overflowX: 'hidden',
        '& .MuiDialog-paper': {
          margin: 0, // Tránh margin gây tràn
          maxWidth: '100%', // Không vượt quá chiều rộng màn hình
        },
      }}
      maxWidth="lg"
      open={open && persistedOpen}
      onClose={handleClose}
    >
      <Stack
        sx={{
          width: isMobile ? '400px' : isDesktop ? '800px' : '600px',
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: '10px', top: '10px', zIndex: 2 }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            display: 'block',
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
            width: isDesktop ? '800px' : isMobile ? '400px' : '600px',
            height: 0,
            paddingBottom: '56.25%',
            '& > span': {
              position: 'absolute!important',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          }}
          component="a"
          target="_blank"
          href={banner?.url?.[0]}
        >
          <Image
            src={banner?.link?.[0]}
            alt="Hình ảnh"
            layout="fill"
            objectFit="cover"
            priority={true}
            fetchPriority="high"
            objectPosition="center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </Box>
      </Stack>
    </Dialog>
  )
}

export default HomePopup
