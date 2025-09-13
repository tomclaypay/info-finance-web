import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'

import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  Modal,
  RadioGroup,
  Radio,
  Stack,
  Typography,
  TextField,
  CircularProgress,
  Link,
} from '@mui/material'
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import NextLink from 'next/link'

import { MainLayout } from '@app/components/main-layout'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import {
  CANCEL_REQUEST_STATUS_COLOR,
  CANCEL_REQUEST_STATUS_LABEL,
  COMPLAINT_STATUS,
  COMPLAINT_STATUS_COLOR,
  COMPLAINT_STATUS_LABEL,
} from '@app/constants/userComplaint'
import { INPUT_SCHEMA } from '@app/constants/schema'
import CREATE_CANCEL_REQUEST from '@app/operations/mutations/complaints/create-cancel-request'
import { CANCEL_REQUEST_STATUS } from '@app/constants/common'
import GET_COMPLAINT_BY_ID_USER from '@app/operations/queries/complaints/get-complaint-by-id-user'
import CustomImage from '@app/components/dashboard/common/custom-image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useMobile } from '@app/components/common'

const contactArr = [
  {
    title: 'Hotline',
    detail: '+84969116052',
    image:
      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame_80292_b7f81335a5.png?updated_at=2022-08-30T03:03:47.007Z',
  },
  {
    title: 'Chăm sóc khách hàng',

    detail: 'cs@infofinance.com',
    image:
      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame_802921111_1be11adce1.png?updated_at=2022-08-30T03:03:47.003Z',
  },
  {
    title: 'Thẩm định chất lượng',

    detail: '',
    image:
      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Frame_802921111_1be11adce1.png?updated_at=2022-08-30T03:03:47.003Z',
  },
]

const ReviewDetail = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [otherReason, setOtherReason] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)
  const [createCancelComplaint] = useMutation(CREATE_CANCEL_REQUEST)
  const { t } = useTranslation(['complaints', 'common', 'home-page'])
  const isMobile = useMobile()

  const { yourReviewId } = router.query
  const { loading, data, refetch } = useQuery(GET_COMPLAINT_BY_ID_USER, {
    variables: {
      id: yourReviewId,
    },
  })

  const handleClose = () => setOpen(false)

  const formik = useFormik({
    initialValues: {
      reason: 'Sàn đã liên hệ giải quyết',
      otherReason: '',
    },
    validationSchema: Yup.object().shape({
      otherReason: otherReason ? Yup.string().required(INPUT_SCHEMA.require) : Yup.string(),
    }),
    onSubmit: async (values) => {
      await createCancelComplaint({
        variables: {
          complaintId: yourReviewId,
          reason: values.reason === 'Lý do khác' ? values.otherReason : values.reason,
        },
      })
      setOpen(false)
      toast.success('Hủy khiếu nại thành công', {
        duration: 2000,
        style: {
          top: 200,
          position: 'relative',
        },
      })
      setSendSuccess(true)
      refetch()
    },
  })

  useEffect(() => {
    if (formik.values.reason === 'Lý do khác') {
      setOtherReason(true)
    } else setOtherReason(false)
  }, [formik.values.reason])

  const reasons = [
    { value: 'resolved', title: t('yourComplaint.popUp.t1'), id: 1 },
    { value: 'changed', title: t('yourComplaint.popUp.t2'), id: 2 },
    { value: 'noWant', title: t('yourComplaint.popUp.t3'), id: 3 },
    { value: 'other', title: t('yourComplaint.popUp.t4'), id: 4 },
  ]

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: isMobile ? 0 : 5,
        position: 'relative',
      }}
    >
      <Toaster reverseOrder={false} />
      {loading && (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      )}
      {data && (
        <Container maxWidth="lg" sx={{ pt: isMobile ? 2 : 5, pb: isMobile ? 5 : 10 }}>
          <Stack direction={isMobile ? 'column' : 'row'} sx={{ px: isMobile ? 0 : 20 }}>
            <Stack sx={{ flex: '3' }} spacing={3}>
              <Stack spacing={2}>
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
                    {t('yourComplaint.left.infoExchange.title', { ns: 'complaints' })}
                  </Typography>
                </Box>

                <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
                  {data?.complaints_by_pk?.exchange?.logo &&
                    (isMobile ? (
                      <Box
                        sx={{
                          overflow: 'hidden',
                          position: 'relative',
                          height: '100%',
                          paddingTop: '48.25%',
                          border: '1px solid rgba(0,0,0,0.5)',
                          borderRadius: '8px',
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
                          src={data.complaints_by_pk.exchange?.logo}
                          alt="Hình ảnh"
                          layout="fill"
                          objectFit="contain"
                          objectPosition="center"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
                        />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          overflow: 'hidden',
                          borderRadius: '8px',
                          border: '1px solid #d0d0d0',
                          width: 'max-content',
                        }}
                      >
                        <Image
                          loading="lazy"
                          src={data.complaints_by_pk.exchange?.logo}
                          alt="hình ảnh"
                          width="278px"
                          height="156px"
                        />
                      </Box>
                    ))}

                  <Stack>
                    <Stack direction="row">
                      <Box
                        sx={{
                          overflow: 'hidden',
                          borderRadius: '4px',
                          height: '25px',
                        }}
                      >
                        {/* <Image
                          src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Rectangle_13_8b22f34e36.png?updated_at=2022-08-29T10:06:34.081Z"
                          alt="icon"
                          width={42}
                          height="25px"
                        /> */}
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: '600' }}>
                        {data.complaints_by_pk.exchange.name}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="body2">{`${t('complaints.years', {
                        ns: 'common',
                      })}:`}</Typography>
                      <Link
                        component={NextLink}
                        href={data.complaints_by_pk.exchange.website?.[0]?.url ?? ''}
                        passHref
                        target="_blank"
                      >
                        <Typography variant="body2" sx={{ fontWeight: 500, ':hover': { color: 'primary.main' } }}>
                          {data.complaints_by_pk.exchange.website?.[0]?.url}
                        </Typography>
                      </Link>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              {isMobile && <Divider />}
              <Stack spacing={2}>
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
                    {t('yourComplaint.left.detail.title')}
                  </Typography>
                </Box>
                <Stack>
                  <Typography variant="body2" sx={{ color: 'subtitle.main' }}>
                    {t('yourComplaint.left.infoExchange.t3')}
                  </Typography>
                  <Typography>{data.complaints_by_pk.title}</Typography>
                </Stack>
                <Stack>
                  <Typography variant="body2" sx={{ color: 'subtitle.main' }}>
                    {t('yourComplaint.left.infoExchange.t2')}
                  </Typography>
                  <Typography>{data.complaints_by_pk.category.name}</Typography>
                </Stack>
                <Stack>
                  <Typography variant="body2" sx={{ color: 'subtitle.main' }}>
                    {t('yourComplaint.left.detail.t2')}
                  </Typography>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: data?.complaints_by_pk?.description,
                    }}
                  />
                </Stack>
              </Stack>
              {isMobile && <Divider />}

              <Stack spacing={2}>
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
                    {t('yourComplaint.left.image')}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                  {data.complaints_by_pk.images &&
                    data.complaints_by_pk.images.map(
                      (item: any, index: any) =>
                        item && (
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
                            <Image loading="lazy" alt="image" src={item} layout="fill" objectFit="cover" />
                          </Box>
                        )
                    )}
                </Stack>
              </Stack>

              {isMobile && <Divider />}

              {data.complaints_by_pk?.closeReason && (
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      width={12}
                      height={24}
                      sx={{
                        borderRadius: '10px',
                        backgroundColor: 'error.main',
                      }}
                    />
                    <Typography variant="h3" sx={{ flex: '1', ml: 1, color: 'error.main' }}>
                      {`Lý do ${COMPLAINT_STATUS_LABEL[data.complaints_by_pk.status as COMPLAINT_STATUS]}`}
                    </Typography>
                  </Box>
                  <Typography>{data.complaints_by_pk.closeReason}</Typography>
                </Stack>
              )}
              {data.complaints_by_pk && data.complaints_by_pk.status === 'resolved' && (
                <Stack spacing={2}>
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
                      {t('yourComplaint.left.infoExchange.t4')}
                    </Typography>
                  </Box>
                  <Stack direction="row">
                    {data.complaints_by_pk?.attachments[0]?.files?.map((image: any, index: number) => (
                      <CustomImage
                        internet={true}
                        key={image}
                        image={image}
                        index={index}
                        // slides={complaint?.attachments[0]?.files}
                      />
                    ))}
                  </Stack>
                </Stack>
              )}
            </Stack>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Stack sx={{ flex: '2', mt: isMobile ? 2 : 0 }}>
              <Typography variant="h6">{t('yourComplaint.right.top')}</Typography>
              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  color:
                    (data.complaints_by_pk.cancelRequests.length > 0 &&
                      data.complaints_by_pk.cancelRequests[data.complaints_by_pk.cancelRequests.length - 1].status ===
                        'rejected') ||
                    data.complaints_by_pk.cancelRequests.length <= 0
                      ? COMPLAINT_STATUS_COLOR[data.complaints_by_pk.status as COMPLAINT_STATUS]
                      : CANCEL_REQUEST_STATUS_COLOR[
                          data.complaints_by_pk.cancelRequests[data.complaints_by_pk.cancelRequests.length - 1]
                            .status as CANCEL_REQUEST_STATUS
                        ],
                  mt: 1,
                }}
                spacing={1}
              >
                <RadioButtonCheckedRoundedIcon />
                <Typography variant="button">
                  {(data.complaints_by_pk.cancelRequests.length > 0 &&
                    data.complaints_by_pk.cancelRequests[data.complaints_by_pk.cancelRequests.length - 1].status ===
                      'rejected') ||
                  data.complaints_by_pk.cancelRequests.length <= 0
                    ? COMPLAINT_STATUS_LABEL[data.complaints_by_pk.status as COMPLAINT_STATUS]
                    : CANCEL_REQUEST_STATUS_LABEL[
                        data.complaints_by_pk.cancelRequests[data.complaints_by_pk.cancelRequests.length - 1]
                          .status as CANCEL_REQUEST_STATUS
                      ]}
                </Typography>
              </Stack>
              <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />

              <Typography variant="h6">{t('create.right')}</Typography>
              <Stack spacing={4} sx={{ mt: 2 }}>
                {contactArr.map((item, index) => (
                  <Stack key={index} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Stack>
                      <Image src={item.image} alt="icon" width={48} height={48} loading="lazy" />
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
          </Stack>
        </Container>
      )}

      {data &&
        !sendSuccess &&
        (data.complaints_by_pk.cancelRequests.length <= 0 ||
          (data.complaints_by_pk.cancelRequests.length > 0 &&
            data.complaints_by_pk.cancelRequests[data.complaints_by_pk.cancelRequests.length - 1].status ===
              'rejected')) &&
        !data.complaints_by_pk?.closeReason &&
        data.complaints_by_pk.status !== 'resolved' && (
          <Stack alignItems="center" px={2} mb={isMobile ? 2 : 0}>
            <Button
              sx={{
                borderRadius: 4,
                color: 'error.main',
                lineHeight: '19.5px',
                fontSize: '16px',
                fontWeight: '500',
                padding: '12px 24px',
                width: isMobile ? '100%' : 'max-content',
              }}
              variant="outlined"
              color="error"
              fullWidth={isMobile ? true : false}
              onClick={() => setOpen(true)}
            >
              {t('cancelRequest')}
            </Button>
          </Stack>
        )}

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
            width: isMobile ? 'max-content' : '400px',
            backgroundColor: 'background.paper',
            borderRadius: '16px',
            p: 2,
          }}
        >
          <Stack spacing={2}>
            <Box sx={{ position: 'relative' }}>
              <Typography
                id="keep-mounted-modal-title"
                sx={{ textAlign: 'center', fontWeight: '500', fontSize: '1.25rem' }}
              >
                {t('yourComplaint.popUp.title')}
              </Typography>
              <CloseRoundedIcon
                onClick={() => setOpen(false)}
                sx={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            </Box>

            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  onChange={formik.handleChange}
                  value={formik.values.reason}
                  name="reason"
                >
                  {reasons.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={item.title}
                      sx={{
                        color: formik.values.reason === item.title ? 'primary.main' : '',
                        '&>span': { fontWeight: '500!important' },
                      }}
                      control={<Radio />}
                      label={item.title}
                    />
                  ))}
                </RadioGroup>
                <TextField
                  error={Boolean(formik.touched.otherReason && formik.errors.otherReason)}
                  fullWidth
                  helperText={formik.touched.otherReason && formik.errors.otherReason}
                  label="Hãy cho chúng tôi biết lý do"
                  name="otherReason"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  disabled={formik.values.reason === 'Lý do khác' ? false : true}
                  value={formik.values.otherReason}
                  rows={5}
                  multiline
                />
                <Stack sx={{ alignItems: 'center' }}>
                  <Button
                    sx={{
                      borderRadius: 4,
                      color: 'error.main',
                      fontSize: '16px',
                      fontWeight: '600',
                      width: 'max-content',
                    }}
                    variant="outlined"
                    color="error"
                    size="large"
                    type="submit"
                  >
                    Hủy khiếu nại
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Modal>
    </Box>
  )
}

ReviewDetail.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default ReviewDetail

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'complaints', 'home-page'])),
      // Will be passed to the page component as props
    },
  }
}
