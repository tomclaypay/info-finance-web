import { useMobile } from '@app/components/common'
import { INPUT_SCHEMA, REGEX } from '@app/constants/schema'
import { AuthContext } from '@app/contexts/amplify-context'
import { Event, RegisterEvent } from '@app/interfaces/event'
import { Box, Button, Dialog, Divider, FormControl, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { format } from 'date-fns'
import viLocale from 'date-fns/locale/vi'
import { useFormik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import * as Yup from 'yup'

interface RegisterEventFormProps {
  dataUser: any
  event: Event
  onClose: () => void
  open: boolean
  openAlertModal: boolean
  listed?: Event
  handleSubmitRegisterEvent: (formValues: RegisterEvent) => void
  handleCloseAlertModal: () => void
}

const yourOptions = [
  {
    value: 'Trader',
    name: 'Trader',
  },
  {
    value: 'IB',
    name: 'IB',
  },
  {
    value: 'Broker',
    name: 'Broker',
  },
]

const fromOptions = [
  {
    value: 'Facebook',
    name: 'Facebook',
  },
  {
    value: 'Zalo',
    name: 'Zalo',
  },
  {
    value: 'friend',
    name: 'Bạn bè',
  },
  {
    value: 'Website',
    name: 'Website',
  },
  {
    value: 'ThinkMarkets',
    name: 'Think Markets',
  },
  {
    value: 'other',
    name: 'Khác',
  },
]

const RegisterEventForm = ({
  dataUser,
  event,
  onClose,
  open,
  listed,
  openAlertModal,
  handleCloseAlertModal,
  handleSubmitRegisterEvent,
}: RegisterEventFormProps) => {
  const value = useContext(AuthContext)
  const isMobile = useMobile()
  const initialValues: RegisterEvent = {
    jobPosition: '',
    name: (dataUser?.users?.[0].displayName as string) || '',
    email: (dataUser?.users?.[0].email as string) || '',
    phone: (dataUser?.users?.[0].phone as string) || '',
    origin: '',
  }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required(INPUT_SCHEMA.require),
      email: Yup.string().required(INPUT_SCHEMA.require).email(INPUT_SCHEMA.emailMalformed),
      phone: Yup.string().matches(REGEX.PHONE, INPUT_SCHEMA.phoneMalformed).required(INPUT_SCHEMA.require),
      jobPosition: Yup.string().required(INPUT_SCHEMA.require),
      origin: Yup.string().required(INPUT_SCHEMA.require),
    }),
    onSubmit: handleSubmitRegisterEvent,
  })

  const { locale } = useRouter()

  return (
    <>
      {event && (
        <>
          <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack p={3} spacing={2}>
                <Stack>
                  <Typography variant="h4" sx={{ flex: '1', ml: 1 }}>
                    {event.title}
                  </Typography>
                  <Stack>
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
                        loading="lazy"
                      />
                    </Box>
                  </Stack>
                </Stack>

                <Stack spacing={2}>
                  <FormControl sx={{ width: '100%' }}>
                    <TextField
                      id="demo-controlled-open-select"
                      select
                      error={Boolean(formik.touched.jobPosition && formik.errors.jobPosition)}
                      name="jobPosition"
                      value={formik.values.jobPosition}
                      label="Bạn là"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.jobPosition && formik.errors.jobPosition}
                      sx={{
                        margin: '0',
                        '&>label::after': {
                          content: "'*'",
                          color: 'red',
                        },
                      }}
                    >
                      {yourOptions.map((item: any) => (
                        <MenuItem value={item.value} key={item.value}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>

                  <TextField
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="Tên của bạn"
                    margin="normal"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    sx={{
                      margin: '0',
                      '&>label::after': {
                        content: "'*'",
                        color: 'red',
                      },
                    }}
                  />

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
                      margin: '0',

                      '&>label::after': {
                        content: "'*'",
                        color: 'red',
                      },
                    }}
                  />

                  <TextField
                    error={Boolean(formik.touched.phone && formik.errors.phone)}
                    fullWidth
                    helperText={formik.touched.phone && formik.errors.phone}
                    label="Số điện thoại"
                    margin="normal"
                    name="phone"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    sx={{
                      margin: '0',
                      '&>label::after': {
                        content: "'*'",
                        color: 'red',
                      },
                    }}
                  />

                  <FormControl sx={{ width: '100%' }}>
                    <TextField
                      id="demo-controlled-open-select"
                      select
                      error={Boolean(formik.touched.origin && formik.errors.origin)}
                      name="origin"
                      value={formik.values.origin}
                      label="Bạn biết sự kiện qua đâu"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.origin && formik.errors.origin}
                      sx={{
                        margin: '0',
                        '&>label::after': {
                          content: "'*'",
                          color: 'red',
                        },
                      }}
                    >
                      {fromOptions.map((item: any) => (
                        <MenuItem value={item.value} key={item.value}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Stack>

                {/* <Stack spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      src={
                        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/dot_Blue_2404e1c4fe.png?updated_at=2022-08-25T09:27:29.663Z'
                      }
                      alt="icon"
                      width={12}
                      height={24}
                    />
                    <Typography variant="h4" sx={{ flex: '1', ml: 1 }}>
                      Lưu ý từ ban tổ chức
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ flex: '1', ml: 1 }}>
                    01. Lưu ý
                  </Typography>
                  <Typography variant="body2" sx={{ flex: '1', ml: 1 }} textAlign="justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                    aliquet odio mattis. Class aptent taciti sociosqu ad litora toant per conubia nostra, per inceptos
                    himenaeosper conubia nostra, per inceptos...
                  </Typography>
                </Stack> */}

                <Divider />

                <Stack direction="row">
                  {new Date(event?.start as unknown as Date) > new Date() && (
                    <Stack flex={1} direction="row" spacing={2} justifyContent="flex-end">
                      <Button variant="outlined" onClick={onClose}>
                        Đóng
                      </Button>
                      {!value?.user ? (
                        // <NextLink href="/authentication/login" passHref>
                        <Button
                          // disabled={isSubmitting || disabled}
                          type="submit"
                          variant="contained"
                          sx={{ m: 1, textTransform: 'capitalize' }}
                        >
                          Đăng ký
                        </Button>
                      ) : // </NextLink>
                      listed ? (
                        <Button type="submit" variant="contained" sx={{ textTransform: 'capitalize' }}>
                          Hủy đăng ký
                        </Button>
                      ) : (
                        <Button
                          // disabled={isSubmitting || disabled}
                          type="submit"
                          variant="contained"
                          sx={{ m: 1, textTransform: 'capitalize' }}
                        >
                          Đăng ký
                        </Button>
                      )}
                    </Stack>
                  )}

                  {new Date(event?.start) < new Date() && new Date(event?.end) > new Date() && (
                    <Stack flex={1} direction="row" spacing={2} justifyContent="flex-end">
                      <Button variant="outlined">Sự kiện đang diễn ra</Button>
                    </Stack>
                  )}

                  {new Date(event?.end) < new Date() && (
                    <Stack flex={1} direction="row" spacing={2} justifyContent="flex-end">
                      <Button variant="outlined">Sự kiện đã diễn ra</Button>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </form>
          </Dialog>

          <Dialog fullWidth maxWidth="sm" onClose={handleCloseAlertModal} open={openAlertModal}>
            <Box
              sx={{
                overflow: 'hidden',
                marginTop: '20px',
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
                src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/rafiki_aca61f0c06.jpg?updated_at=2022-10-25T02:26:31.967Z"
                alt="Hình ảnh"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                loading="lazy"
              />
            </Box>

            <Stack p={2} alignItems="center" spacing={2}>
              <Typography variant="h4">Cảm ơn các bạn đã tham gia sự kiện</Typography>
              <Typography variant="body2">Sự kiện diễn ra vào</Typography>

              <Stack
                alignItems="center"
                px={isMobile ? 0 : 10}
                py={2}
                spacing={1}
                sx={{
                  backgroundColor: '#F4F8FF',
                  color: 'primary.main',
                  borderRadius: '4px',
                  width: '100%',
                }}
              >
                <Stack direction="row" spacing={1} alignItems="flex-end">
                  <Image
                    src={
                      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Calendar_68747a3c7b.png?updated_at=2022-10-25T10:22:47.783Z'
                    }
                    alt="icon"
                    width={24}
                    height={24}
                    loading="lazy"
                  />
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" color="primary.main" fontWeight="700">
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
                        backgroundColor: 'primary.main',
                        flex: '1',
                      }}
                    />
                    <Typography variant="body2" color="primary.main" fontWeight="700">
                      {format(new Date(event?.start), 'HH:mm', {
                        locale: viLocale,
                      })}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <Image
                    src={
                      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Map_Pin_a693bc596b.png?updated_at=2022-10-25T10:22:47.752Z'
                    }
                    alt="icon"
                    width={24}
                    height={24}
                    loading="lazy"
                  />
                  <Typography
                    variant="body2"
                    color="primary.main"
                    fontWeight="700"
                    sx={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 3,
                      flex: '1',
                    }}
                  >
                    {event?.location}
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="body2">Hẹn gặp bạn ở sự kiện</Typography>
              <Button
                // disabled={isSubmitting || disabled}
                onClick={handleCloseAlertModal}
                variant="outlined"
                sx={{ m: 1, textTransform: 'capitalize' }}
              >
                Xác nhận
              </Button>
            </Stack>
          </Dialog>
        </>
      )}
    </>
  )
}

export default RegisterEventForm
