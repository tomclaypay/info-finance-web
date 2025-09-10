import { useMutation } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import CreateEditBannerSection from '@app/components/dashboard/banners/create-edit-banner-section'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { FormActions, OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import useUploadFile from '@app/hooks/use-upload-file'
import { Banner } from '@app/interfaces/banner'
import { gtm } from '@app/lib/gtm'
import CREATE_BANNER from '@app/operations/mutations/banners/create-banner'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export interface ImageFiles {
  link: any[]
}

const CreateBanner = () => {
  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.BANNER, type: UPLOAD_TYPE.IMAGE })
  const [createBanner] = useMutation(CREATE_BANNER)
  const router = useRouter()
  const [imageFiles, setImageFiles] = useState<ImageFiles>({
    link: [],
  })

  const handleChangeFiles = (event: any, type: string, name: string) => {
    if (type === 'addImg' && event.target.files.length > 0) {
      const files = event.target.files as FileList
      setImageFiles({ ...imageFiles, [name]: imageFiles[name as keyof typeof imageFiles].concat([...(files || [])]) })
    }

    if (type === 'removeImg') {
      const files = event?.images as FileList
      setImageFiles({ ...imageFiles, [name]: [...(files || [])] })
    }
  }

  const handleBannerFormSubmit = async (formValues: Partial<Banner>) => {
    const images = await handleUploadFiles(imageFiles.link)
    setImageFiles({
      link: [],
    })
    try {
      await createBanner({
        variables: {
          ...formValues,
          link: images,
        },
      })

      toast.success('Tạo banner thành công!')
      router.push('/dashboard/banners')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: Tạo banner | InfoFX</title>
      </Head>
      <CreateEditBannerSection
        imageFiles={imageFiles}
        handleChangeFiles={handleChangeFiles}
        type={FormActions.CREATE}
        handleBannerFormSubmit={handleBannerFormSubmit}
      />
    </>
  )
}

CreateBanner.getLayout = (page: ReactElement) => (
  <AuthGuard authorized>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default CreateBanner
