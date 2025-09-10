import { useMutation, useQuery } from '@apollo/client'
import { OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import { REGEX } from '@app/constants/schema'
import useUploadFile from '@app/hooks/use-upload-file'
import CREATE_COMPLAINT from '@app/operations/mutations/complaints/create-complaint'
import GET_EXCHANGES_BY_NAME from '@app/operations/queries/exchanges/get-exchanges-by-name'
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { Autocomplete, Box, Button, Divider, Grid, Link, Modal, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import NextLink from 'next/link'
import { useState } from 'react'
import * as Yup from 'yup'
import { useDesktop, useMobile } from '../common'
import { QuillEditor } from '../quill-editor'
import { useRouter } from 'next/router'

interface ReviewCreateFormProps {
  dataCategories: any
  dataUser: any
  dataInput: any
}
const ReviewCreateForm = ({ dataCategories, dataUser, dataInput }: ReviewCreateFormProps) => {
  // const [inputValueOwnerName, setInputValueOwnerName] = useState('')
  // const [optionsOwnerName, setOptionsOwnerName] = useState([])
  const [open, setOpen] = useState(false)
  const [imageFiles, setImageFiles] = useState([])
  const [createReview] = useMutation(CREATE_COMPLAINT)
  const { t } = useTranslation(['complaints', 'common'])
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.COMPLAINT, type: UPLOAD_TYPE.IMAGE })
  const router = useRouter()
  const locale = router.locale
  const handleClose = () => setOpen(false)
  const { data: dataExchanges } = useQuery(GET_EXCHANGES_BY_NAME)

  // const handleSearchChange = debounce(async (data) => {
  //     const { data: dataExchanges } = await client.query({
  //       query: GET_EXCHANGES_BY_NAME,
  //       variables: {
  //         name: data,
  //       },
  //     })
  //   try {
  //     if (dataExchanges) {
  //       setOptionsOwnerName(dataExchanges.exchanges)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, 3000)
  const contactArr = [
    {
      title: 'Hotline',
      detail: '+84969116052',
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame_80292_b7f81335a5.png?updated_at=2022-08-30T03:03:47.007Z',
    },
    {
      title: t('yourComplaint.right.bottom.t2'),
      detail: 'cs@infofinance.com',
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame_802921111_1be11adce1.png?updated_at=2022-08-30T03:03:47.003Z',
    },
    {
      title: t('yourComplaint.right.bottom.t3'),
      detail: '',
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame_802921111_1be11adce1.png?updated_at=2022-08-30T03:03:47.003Z',
    },
  ]

  // useEffect(() => {
  //   handleSearchChange(`%${inputValueOwnerName}%`)
  // }, [handleSearchChange, inputValueOwnerName])

  const exposureTypeDefault = dataCategories?.find(
    (item: any) => item.name === 'Hộp thư đánh giá và góp ý từ nhà đầu tư'
  )?.id

  const formik = useFormik({
    initialValues: {
      fullname: dataInput.userName || dataUser?.displayName || '',
      email: dataInput.email || dataUser?.email || '',
      phone: dataInput.phone || dataUser?.phone || '',
      ownerLink: '',
      ownerName: { name: dataInput.ownerName || '', id: dataInput.idOwner || '', website: '' },
      exposureType: dataInput.exposureType || exposureTypeDefault,
      explainReview: '',
      imageReview: '',
      title: 'Thư góp ý và đánh giá từ nhà đầu tư',
    },
    validationSchema: Yup.object().shape({
      fullname: Yup.string().required(t('inputAlert.require')),
      email: Yup.string().required(t('inputAlert.require')).email(t('inputAlert.emailMalformed')),
      phone: Yup.string().matches(REGEX.PHONE, t('inputAlert.phoneMalformed')).required(t('inputAlert.require')),
      ownerName: Yup.object().required(t('inputAlert.require')),
      exposureType: Yup.string().required(t('inputAlert.require')),
      title: Yup.string(),
    }),
    onSubmit: async (values) => {
      await handleSubmitForm(values)
      formik.resetForm()
      setImageFiles([])
    },
  })

  const handleChangeFiles = (e: any) => {
    if (e.target.files.length > 0) {
      const files = e.target.files as FileList
      setImageFiles(imageFiles.concat([...(files || [])]))
    }
  }

  const handleSubmitForm = async (values: any) => {
    const valueImage = await handleUploadFiles(imageFiles)
    await createReview({
      variables: {
        complaintCategoryId: values.exposureType,
        description: values.explainReview,
        email: values.email,
        exchangeId: values.ownerName.id,
        website: values.ownerLink,
        images: valueImage,
        phone: values.phone,
        fullname: values.fullname,
        title: values.title,
      },
    })
    setOpen(true)
  }

  return (
    <>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <Stack>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src={
                  'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                }
                alt="icon"
                width={12}
                height={24}
                loading="lazy"
              />
              <Typography variant="h4" sx={{ flex: '1', ml: 1 }}>
                {t('create.left.t1.title')}
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.fullname && formik.errors.fullname)}
              fullWidth
              helperText={formik.touched.fullname && formik.errors.fullname}
              label={t('create.left.t1.t1')}
              margin="normal"
              name="fullname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.fullname}
              sx={{
                '&>label::after': {
                  content: "'*'",
                  color: 'red',
                },
              }}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  sx={{
                    '&>label::after': {
                      content: "'*'",
                      color: 'red',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label={t('phone')}
                  margin="normal"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  sx={{
                    '&>label::after': {
                      content: "'*'",
                      color: 'red',
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Stack>

          <Stack>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Image
                src={
                  'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                }
                alt="icon"
                width={12}
                height={24}
                loading="lazy"
              />
              <Typography variant="h4" sx={{ flex: '1', ml: 1 }}>
                {t('create.left.t2.title')}
              </Typography>
            </Box>
            <Autocomplete
              // inputValue={inputValueOwnerName}
              // onInputChange={(event, newInputValue) => {
              //   setInputValueOwnerName(newInputValue)
              // }}

              onBlur={formik.handleBlur}
              onChange={(event, value) => {
                formik.setFieldValue('ownerName.name', value?.name)
                formik.setFieldValue('ownerName.id', value?.id)
                // formik.setFieldValue('ownerLink', value?.website)
              }}
              value={formik.values.ownerName}
              options={dataExchanges?.exchanges || []}
              renderOption={(props, option) => {
                return (
                  <Box component="li" {...props} key={option.id}>
                    <Stack direction={'row'} gap={'8px'} alignItems={'center'}>
                      <Image
                        src={option?.logo || ''}
                        alt="thumb"
                        height={48}
                        width={64}
                        loading="lazy"
                        objectFit="contain"
                      />
                      {option.name}
                    </Stack>
                  </Box>
                )
              }}
              getOptionLabel={(option) => option.name || ''}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="ownerName"
                  error={Boolean(formik.touched.ownerName && formik.errors.ownerName)}
                  helperText={formik.touched.ownerName && formik.errors.ownerName}
                  sx={{
                    '&>label::after': {
                      content: "'*'",
                      color: 'red',
                    },
                  }}
                  label={t('create.left.t2.t1')}
                />
              )}
            />
            <TextField
              error={Boolean(formik.touched.ownerLink && formik.errors.ownerLink)}
              fullWidth
              helperText={formik.touched.ownerLink && formik.errors.ownerLink}
              label={t('create.left.t2.t2')}
              margin="normal"
              name="ownerLink"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.ownerLink}
            />
          </Stack>

          <Stack>
            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src={
                  'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                }
                alt="icon"
                width={12}
                height={24}
              />
              <Typography variant="h4" sx={{ flex: '1', ml: 1 }}>
                {t('create.left.t3.title')}
              </Typography>
            </Box>

            <TextField
              error={Boolean(formik.touched.title && formik.errors.title)}
              fullWidth
              helperText={formik.touched.title && formik.errors.title}
              label={t('yourComplaint.left.infoExchange.t3')}
              margin="normal"
              name="title"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.title}
              sx={{
                '&>label::after': {
                  content: "'*'",
                  color: 'red',
                },
              }}
            /> */}

            {/* <FormControl sx={{ mt: 2, mb: 3, width: '100%' }}>
              <TextField
                helperText={formik.touched.exposureType && formik.errors.exposureType}
                id="demo-controlled-open-select"
                select
                error={Boolean(formik.touched.exposureType && formik.errors.exposureType)}
                name="exposureType"
                value={formik.values.exposureType}
                label={t('create.left.t3.t1')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{
                  '&>label::after': {
                    content: "'*'",
                    color: 'red',
                  },
                }}
              >
                {dataCategories?.map((item: any) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name === 'Lừa đảo' && (router.locale === 'vi' ? 'Lừa đảo' : 'Scam')}

                    {item.name === 'Hộp thư đánh giá và góp ý từ nhà đầu tư' &&
                      (router.locale === 'vi'
                        ? 'Hộp thư đánh giá và góp ý từ nhà đầu tư'
                        : 'Investor feedback and comments mailbox')}

                    {item.name === 'Đánh giá tổng quát' &&
                      (router.locale === 'vi' ? 'Đánh giá tổng quát' : 'General Review')}

                    {item.name === 'Lý do khác' && (router.locale === 'vi' ? 'Lý do khác' : 'Other problems')}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl> */}

            {/* <TextField
              error={Boolean(formik.touched.explainReview && formik.errors.explainReview)}
              fullWidth
              helperText={formik.touched.explainReview && formik.errors.explainReview}
              label="Nhập lời nhắn"
              name="explainReview"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.explainReview}
              rows={8}
              multiline
              sx={{
                '&>label::after': {
                  content: "'*'",
                  color: 'red',
                },
              }}
            /> */}
            <QuillEditor
              variant="outlined"
              name="explainReview"
              label="Nhập lời nhắn"
              value={formik.values.explainReview}
              onBlur={() => {
                console.log('avoid error')
              }}
              error={Boolean(formik.touched.explainReview && formik.errors.explainReview)}
              helperText={formik.touched.explainReview && formik.errors.explainReview}
              onChange={(content: string) => {
                formik.setFieldValue('explainReview', content)
              }}
            />
          </Stack>

          <Stack spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src={
                  'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                }
                alt="icon"
                width={12}
                height={24}
                loading="lazy"
              />
              <Typography variant="h4" sx={{ flex: '1', ml: 1 }}>
                {t('create.left.t4.title')}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'subtitle.main' }}>
              {t('create.left.t4.t1')}
            </Typography>

            <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
              <label
                htmlFor="files"
                style={{
                  borderRadius: '8px',
                  border: '1px dashed #2A559C',
                  backgroundColor: '#FFFFFF',
                  overflow: 'hidden',
                  position: 'relative',
                  width: '104px',
                  height: '104px',
                  cursor: 'pointer',
                }}
              >
                <ControlPointRoundedIcon
                  color="primary"
                  fontSize="large"
                  sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                />
              </label>
              <input
                name="files"
                type="file"
                id="files"
                multiple
                onChange={handleChangeFiles}
                style={{ display: 'none' }}
              />
              {isMobile ? (
                <Grid container>
                  {imageFiles.length > 0 &&
                    imageFiles.map((file, index) => {
                      return (
                        <Grid key={index} item>
                          <Box
                            key={index}
                            sx={{
                              borderRadius: '8px',
                              overflow: 'hidden',
                              position: 'relative',
                              width: '104px',
                              height: '104px',
                              '&:hover div': {
                                display: 'block',
                              },
                            }}
                          >
                            <Box
                              sx={{
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                display: isMobile ? 'block' : 'none',
                                cursor: 'pointer',
                                zIndex: '2',
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                              }}
                              onClick={() => {
                                const indexImage = imageFiles.indexOf(file)
                                if (indexImage > -1) {
                                  const newFiles: any = [...imageFiles]
                                  newFiles.splice(indexImage, 1)
                                  setImageFiles(newFiles)
                                }
                              }}
                            >
                              <HighlightOffOutlinedIcon
                                fontSize="large"
                                sx={{
                                  position: 'absolute',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%,-50%)',
                                  color: '#ffffff',
                                }}
                              />
                            </Box>
                            <Image
                              loading="lazy"
                              alt="image"
                              src={URL.createObjectURL(file)}
                              layout="fill"
                              objectFit="cover"
                            />
                          </Box>
                        </Grid>
                      )
                    })}
                </Grid>
              ) : (
                <Stack direction="row" spacing={2}>
                  {imageFiles.length > 0 &&
                    imageFiles.map((file, index) => {
                      return (
                        <Box
                          key={index}
                          sx={{
                            borderRadius: '8px',
                            overflow: 'hidden',
                            position: 'relative',
                            width: '104px',
                            height: '104px',
                            '&:hover div': {
                              display: 'block',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: 'rgba(0,0,0,0.2)',
                              display: isMobile ? 'block' : 'none',
                              cursor: 'pointer',
                              zIndex: '2',
                              position: 'relative',
                              width: '100%',
                              height: '100%',
                            }}
                            onClick={() => {
                              const indexImage = imageFiles.indexOf(file)
                              if (indexImage > -1) {
                                const newFiles: any = [...imageFiles]
                                newFiles.splice(indexImage, 1)
                                setImageFiles(newFiles)
                              }
                            }}
                          >
                            <HighlightOffOutlinedIcon
                              fontSize="large"
                              sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%,-50%)',
                                color: '#ffffff',
                              }}
                            />
                          </Box>
                          <Image
                            loading="lazy"
                            alt="image"
                            src={URL.createObjectURL(file)}
                            layout="fill"
                            objectFit="cover"
                          />
                        </Box>
                      )
                    })}
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
        {isMobile && (
          <>
            <Divider sx={{ mb: 2, mt: 3 }} />
            <Stack sx={{ flex: '2' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Image
                  src={
                    'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                  }
                  alt="icon"
                  width={12}
                  height={24}
                  loading="lazy"
                />
                <Typography variant="h4" sx={{ flex: '1', ml: 1 }}>
                  {t('create.right')}
                </Typography>
              </Box>
              <Stack spacing={4}>
                {contactArr.map((item, index) => (
                  <Stack key={index} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Stack>
                      <Image loading="lazy" src={item.image} alt="icon" width="48px" height="48px" />
                    </Stack>
                    <Stack sx={{ ml: 2, flex: '1' }}>
                      <Typography variant="body1" sx={{ color: 'subtitle.main' }}>
                        {item.title}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ textAlign: 'justify', whiteSpace: 'pre' }}>
                        {item.detail}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </>
        )}

        <Box sx={{ mt: !isDesktop ? 5 : 10 }}>
          <Button
            sx={{
              borderRadius: 4,
              backgroundColor: 'secondary.main',
              color: 'text.primary',
              fontSize: '16px',
              fontWeight: '700',
              textTransform: 'uppercase',
            }}
            fullWidth
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
          >
            {t('button.complaint.send', { ns: 'common' })}
          </Button>
        </Box>
      </form>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '96%' : '616px',
            backgroundColor: 'background.paper',
            borderRadius: '16px',
            p: 4,
          }}
        >
          <Stack spacing={2}>
            <Typography id="keep-mounted-modal-title" variant="h1" component="h2" sx={{ textAlign: 'center' }}>
              {t('complaints.done', { ns: 'common' })}
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ textAlign: 'center' }}>
              {t('complaints.thanks', { ns: 'common' })}
            </Typography>
            {isMobile ? (
              <Box
                sx={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  width: '100%',
                  paddingTop: '66.25%',
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
                  src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Rectangle_c5b1c0299c.gif?updated_at=2022-09-09T05:03:54.583Z"
                  alt="icon"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  loading="lazy"
                />
              </Box>
            ) : (
              <Image
                loading="lazy"
                height={394}
                width={300}
                alt="Send successfully"
                src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Rectangle_c5b1c0299c.gif?updated_at=2022-09-09T05:03:54.583Z"
              />
            )}

            <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
              <Button
                sx={{
                  borderRadius: 4,
                  color: 'primary.main',
                }}
                fullWidth
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => setOpen(false)}
              >
                <NextLink
                  href={`${locale === 'vi' ? '/danh-gia-san/danh-gia-cua-ban' : '/exchange-review/your-review'}`}
                  passHref
                >
                  <Link
                    sx={{
                      color: 'primary.main',
                      fontSize: '14px',
                      fontWeight: '700',
                    }}
                  >
                    {t('complaints.my', { ns: 'common' })}
                  </Link>
                </NextLink>
              </Button>
              {/* <Button
                sx={{
                  borderRadius: 4,
                  backgroundColor: 'primary.main',
                  color: 'text.main',
                }}
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setOpen(false)}
              >
                <NextLink
                  href={`/${locale === 'vi' ? 'danh-gia-san/lua-dao' : 'exchange-review/scam'}`}
                  passHref
                >
                  <Link
                    sx={{
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: '700',
                    }}
                  >
                    {t('complaints.different', { ns: 'common' })}
                  </Link>
                </NextLink>
              </Button> */}
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

export default ReviewCreateForm
