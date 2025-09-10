import BackButton from '@app/components/dashboard/common/back-button'
import { FormActions } from '@app/constants/common'
import { Banner, IImageObjectBanner } from '@app/interfaces/banner'
import { Box, Container } from '@mui/material'
import { BannerForm } from './banner-form'
import { Dispatch, SetStateAction } from 'react'

interface CreateEditBannerSectionProps {
  type: FormActions
  banner?: Banner
  handleBannerFormSubmit: (formValues: Partial<Banner>) => void
  imageFiles: { link: any[] }
  handleChangeFiles?: (event: any, type: string, name: string) => void
  setImageObjectUpload?: Dispatch<SetStateAction<IImageObjectBanner[]>>
}

export default function CreateEditBannerSection(props: CreateEditBannerSectionProps) {
  const { type, banner, handleBannerFormSubmit, imageFiles, handleChangeFiles, setImageObjectUpload } = props

  const initialValues = {
    link: banner?.link || [],
    position: banner?.position || 'home',
    language: banner?.language || 'vn',
    url: banner?.url || [],
  }

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: 'background.default',
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <BackButton title="Banners" link="dashboard/banners" />
        <Box mt={3}>
          <BannerForm
            handleChangeFiles={handleChangeFiles}
            imageFiles={imageFiles}
            type={type}
            initialValues={initialValues}
            onSubmit={handleBannerFormSubmit}
            setImageObjectUpload={setImageObjectUpload}
          />
        </Box>
      </Container>
    </Box>
  )
}
