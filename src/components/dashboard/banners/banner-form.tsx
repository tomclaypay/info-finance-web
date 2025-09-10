import { FormActionLabels, FormActions } from '@app/constants/common'
import { Banner, IImageObjectBanner } from '@app/interfaces/banner'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import NextLink from 'next/link'
import * as yup from 'yup'
import SelectField from '../common/form-fields/select-field'
import InputField from '../common/formik-fields/input-field'
import { Dispatch, SetStateAction } from 'react'
import ImageFieldFormBanner from '@app/components/form/imageFormBanner'

interface BannerProps {
  type: FormActions
  initialValues: any
  onSubmit: (formValues: Partial<Banner>) => void
  handleChangeFiles?: (event: any, type: string, name: string) => void
  imageFiles: { link: any[] }
  setImageObjectUpload?: Dispatch<SetStateAction<IImageObjectBanner[]>>
}

export const PositionOptions = [
  {
    value: 'home',
    label: 'Trang chủ',
  },
  {
    value: 'complaint',
    label: 'Trang khiếu nại',
  },
  {
    value: 'home_popup_desktop',
    label: 'Popup trang chủ desktop',
  },

  {
    value: 'home_popup_mobile',
    label: 'Popup trang chủ mobile',
  },
  { value: 'header_desktop', label: 'Trên header desktop (8:1)' },
  { value: 'test_video_banner', label: 'Test video banner' },
  { value: 'header_mobile', label: 'Trên header moblie (8:1)' },
  { value: 'home_desktop', label: 'Giữa trang chủ desktop (8:1)' },
  { value: 'home_mobile', label: 'Giữa trang chủ moblie (8:1)' },
  { value: 'small_home_desktop', label: 'Cụm nhỏ giữa trang chủ desktop (16:9)' },
  { value: 'small_home_mobile', label: 'Cụm nhỏ giữa trang chủ moblie (16:9)' },
  { value: 'large_home_desktop', label: 'Cụm lớn giữa trang chủ desktop ' },
  { value: 'large_home_mobile', label: 'Cụm lớn giữa trang chủ moblie ' },
  { value: 'right_home_desktop', label: 'Bên phải trang chủ desktop ' },
  { value: 'left_home_desktop', label: 'Bên trái trang chủ desktop ' },
  { value: 'article_detail_desktop', label: 'Chi tiết bài viết desktop (2:3)' },
  { value: 'article_detail_mobile', label: 'Chi tiết bài viết mobile (2:3)' },
  { value: 'complaint_sidebar_desktop', label: 'Sidebar bên phải trang Khiếu nại desktop (2:3)' },
  { value: 'complaint_sidebar_mobile', label: 'Sidebar bên phải trang Khiếu nại mobile (2:3)' },
  { value: 'list_top_desktop', label: 'Top trang Danh sách sàn desktop (16:3)' },
  { value: 'list_top_mobile', label: 'Top trang Danh sách sàn mobile (16:3)' },
  { value: 'list_sidebar_desktop', label: 'Sidebar bên phải trang Danh sách sàn desktop (2:3)' },
  { value: 'list_sidebar_mobile', label: 'Sidebar bên phải trang Danh sách sàn mobile (2:3)' },
  { value: 'payment_service_desktop', label: 'Trang thanh toán desktop ( 1345 X 759px)' },
  { value: 'payment_service_mobile', label: 'Trang thanh toán mobile (375 x 564px)' },
  { value: 'left_payment_service_desktop', label: 'Bên trái trang thanh toán desktop (600 X 400 px)' },
  { value: 'left_payment_service_mobile', label: 'Bên trái trang thanh toán mobile (343 x 229 px)' },
  { value: 'right_payment_service_desktop', label: 'Bên phải trang thanh toán desktop (600 X 400 px)' },
  { value: 'right_payment_service_mobile', label: 'Bên phải trang thanh toán mobile (343 x 229 px)' },
]

export const LanguageOptions = [
  {
    value: 'vn',
    label: 'Tiếng Việt',
  },
  {
    value: 'en',
    label: 'Tiếng Anh',
  },
]

const userFormValidationSchema = yup.object().shape({
  position: yup.string().required('Bắt buộc'),
  language: yup.string().required('Bắt buộc'),
})

export const BannerForm = (props: BannerProps) => {
  const { type, initialValues, onSubmit, imageFiles, handleChangeFiles, setImageObjectUpload } = props

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={userFormValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values, setFieldValue }) => {
        const combinedArray = values.link.concat(imageFiles.link || [])
        const bannerUrls = values.url || []

        const handleUrlChange = (event: any, index: number) => {
          const newUrls = [...bannerUrls]
          newUrls[index] = event.target.value
          setFieldValue('url', newUrls)
        }

        return (
          <Form>
            <Card>
              <CardHeader title={`${FormActionLabels[type]} banner`} sx={{ textTransform: 'capitalize' }} />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <SelectField
                      name="position"
                      options={PositionOptions}
                      label="Vị trí"
                      value={values.position}
                      all={false}
                      onChange={(e) => {
                        setFieldValue('position', e.target.value)
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <SelectField
                      name="language"
                      options={LanguageOptions}
                      label="Ngôn ngữ"
                      value={values.language}
                      all={false}
                      onChange={(e) => {
                        setFieldValue('language', e.target.value)
                      }}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    {/* <Field name="link" component={ImageField} title="Hình ảnh banner" /> */}
                    <Field
                      name="link"
                      // disabled={disabled}
                      label="Hình ảnh hoặc video banner"
                      imageFiles={imageFiles}
                      handleChangeFiles={handleChangeFiles}
                      component={ImageFieldFormBanner}
                      setImageObjectUpload={setImageObjectUpload}
                    />
                  </Grid>

                  {combinedArray && combinedArray.length > 0 && (
                    <Grid item md={12} xs={12}>
                      <Box>
                        <Typography variant="subtitle2" mb={1.5}>
                          Link banner
                        </Typography>
                        <Grid container spacing={2}>
                          {combinedArray.map((item: any, index: number) => (
                            <Grid key={index} item md={6} xs={6}>
                              <Field
                                value={bannerUrls[index]}
                                name="url"
                                component={InputField}
                                label={`Banner ${index + 1}`}
                                onChange={(e: any) => handleUrlChange(e, index)}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
              <CardActions
                sx={{
                  flexWrap: 'wrap',
                  m: -1,
                }}
              >
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  sx={{ m: 1, textTransform: 'capitalize' }}
                >
                  {FormActionLabels[type]}
                </Button>
                <NextLink href="/dashboard/banners" passHref>
                  <Button
                    component="a"
                    disabled={isSubmitting}
                    sx={{
                      m: 1,
                      mr: 'auto',
                    }}
                    variant="outlined"
                  >
                    Đóng
                  </Button>
                </NextLink>
              </CardActions>
            </Card>
          </Form>
        )
      }}
    </Formik>
  )
}
