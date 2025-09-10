import { useMutation, useQuery } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import CreateEditBannerSection from '@app/components/dashboard/banners/create-edit-banner-section'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { FormActions, OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import useUploadFile from '@app/hooks/use-upload-file'
import { Banner, IImageObjectBanner } from '@app/interfaces/banner'
import { gtm } from '@app/lib/gtm'
import UPDATE_BANNER from '@app/operations/mutations/banners/update-banner'
import GET_BANNER from '@app/operations/queries/banners/get-banner'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export interface ImageFiles {
  link: any[]
}

const BannerEdit = () => {
  const router = useRouter()
  const { bannerId } = router.query
  const { data } = useQuery(GET_BANNER, {
    variables: {
      bannerId,
    },
  })

  const imageFiles = {
    link: [],
  }
  const [imageObjectRender, setImageObjectUpload] = useState<IImageObjectBanner[]>([])

  const [updateBanner] = useMutation(UPDATE_BANNER)

  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.BANNER, type: UPLOAD_TYPE.IMAGE })
  const { handleUploadFiles: handleUploadVideo } = useUploadFile({
    objectType: OBJECT_TYPE.BANNER,
    type: UPLOAD_TYPE.VIDEO,
  })

  const handleBannerFormSubmit = async (formValues: Partial<Banner>) => {
    try {
      const imgUrls = []

      for (const imgObject of imageObjectRender) {
        if (imgObject.imgType === 'FROM_FILE') {
          const index = imageObjectRender.indexOf(imgObject)

          const newLink =
            imgObject.typeFile === 'video'
              ? await handleUploadVideo([imgObject.file])
              : await handleUploadFiles([imgObject.file])
          if (!newLink) throw new Error('Upload image fails')
          if (newLink && index > -1) {
            imgUrls.push(newLink?.[0])
          }
        } else if (imgObject.imgType === 'FROM_API') {
          imgUrls.push(imgObject.url)
        }
      }

      await updateBanner({
        variables: {
          ...formValues,
          link: imgUrls,
          bannerId,
        },
      })

      toast.success('Cập nhật banner thành công!')
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
        <title>Dashboard: Cập nhật banner | InfoFX</title>
      </Head>

      <CreateEditBannerSection
        type={FormActions.UPDATE}
        banner={data?.banner_by_pk}
        imageFiles={imageFiles}
        handleBannerFormSubmit={handleBannerFormSubmit}
        setImageObjectUpload={setImageObjectUpload}
      />
    </>
  )
}

BannerEdit.getLayout = (page: ReactElement) => (
  <AuthGuard authorized={true}>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default BannerEdit
