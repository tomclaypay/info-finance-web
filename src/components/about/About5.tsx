import Image from 'next/image'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, TextField, Box, Container, Stack, Typography, Link } from '@mui/material'
import NextLink from 'next/link'
import { useMutation } from '@apollo/client'
import CREATE_CONTACT_US from '@app/operations/mutations/contact/create-contact-us'
import toast from 'react-hot-toast'
import { useTranslation } from 'next-i18next'
import { useDesktop, useMobile } from '../common'

const socialsImg = [
  {
    href: 'https://www.facebook.com/InfoFx.com.vn',
    id: '1',
    image:
      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/fb_2d9f1a1d46.png?updated_at=2022-08-26T10:48:36.324Z',
  },
  {
    id: '2',
    href: 'https://twitter.com/',
    image:
      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/twitter_304dc68f57.png?updated_at=2022-08-26T10:48:39.595Z',
  },
  {
    href: 'https://www.youtube.com/c/InfoFinanceVN',
    id: '3',
    image:
      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/youtube_b80fa4dd22.png?updated_at=2022-08-26T10:48:39.611Z',
  },
  {
    href: 'https://www.tiktok.com/@infofinancevietnam',
    id: '4',
    image:
      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/tiktok_fbd18bfbe6.png?updated_at=2022-08-26T10:48:39.585Z',
  },
  {
    href: 'https://t.me/InfoFxVietnam',
    id: '5',
    image:
      'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/telegram_7e27899169.png?updated_at=2022-08-26T10:48:39.601Z',
  },
]

const About5 = () => {
  const { t } = useTranslation('about-us')
  const isMobile = useMobile()
  const isDesktop = useDesktop()
  const contactArr = [
    {
      title: t(`contact.t1.t`),
      detail: t(`contact.t1.d`),
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/icon_Form1_0341bc6a45.png?updated_at=2022-08-26T10:48:38.112Z',
    },
    {
      title: t(`contact.t2.t`),
      detail: t(`contact.t2.d`),
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/icon_Form3_9b3655fce1.png?updated_at=2022-08-26T10:48:38.967Z',
    },
    {
      title: t(`contact.t3.t`),
      detail: t(`contact.t3.d`),
      image:
        'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/icon_Form3_9b3655fce1.png?updated_at=2022-08-26T10:48:38.967Z',
    },
  ]

  const [createContactUs] = useMutation(CREATE_CONTACT_US)
  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().max(255).required('Bạn phải nhập họ tên của bạn'),
      email: Yup.string().email('Email không hợp lệ').max(255).required('Bạn cần nhập email của bạn'),
      message: Yup.string().max(255).required('Bạn cần phải nhập lời nhắn của bạn'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await createContactUs({ variables: values })
        toast.success('Bạn đã gửi thông tin liên hệ thành công')
        resetForm()
      } catch (error) {
        toast.error('Bạn đã gửi thông tin liên hệ thất bại')
      }
    },
  })
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        position: 'relative',
      }}
    >
      {isDesktop ? (
        <Box
          sx={{
            overflow: 'hidden',
            position: 'relative',
            height: '100%',
            paddingTop: '52.25%',
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
            src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/ground_form_0abbd9e232.jpg?updated_at=2022-08-26T10:48:40.648Z"
            alt="Hình ảnh"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            loading="lazy"
          />
        </Box>
      ) : (
        <Box
          sx={{
            overflow: 'hidden',
            position: 'relative',
            height: '1100px',
            paddingTop: '52.25%',
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
            src="https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/ground_form_0abbd9e232.jpg?updated_at=2022-08-26T10:48:40.648Z"
            alt="Hình ảnh"
            height="100%"
            width="100%"
            loading="lazy"
          />
        </Box>
      )}
      <Container
        maxWidth="lg"
        sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -55%)' }}
      >
        <Stack direction={!isDesktop ? 'column' : 'row'}>
          <Stack sx={{ flex: '1', pr: !isDesktop ? 0 : 20, mt: !isDesktop ? 10 : 0 }}>
            <Typography textAlign={isMobile ? 'center' : 'left'} variant="h2" sx={{ color: '#ffffff!important' }}>
              {t(`contact.title`)}
            </Typography>
            <Typography
              textAlign={isMobile ? 'center' : 'left'}
              variant="body1"
              sx={{ mt: 2, mb: 4, color: 'subtitle.main' }}
            >
              {t(`contact.top`)}
            </Typography>
            {!isDesktop && !isMobile && (
              <>
                <Stack spacing={4} mt={isMobile ? 3 : 0}>
                  {contactArr.map((item, index) => (
                    <Stack key={index} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                      <Stack>
                        <Image src={item.image} alt="icon" width="40px" height="40px" loading="lazy" />
                      </Stack>
                      <Stack sx={{ ml: 2, flex: '1' }}>
                        <Typography variant="body1" sx={{ color: 'subtitle.main' }}>
                          {item.title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{ textAlign: 'justify', color: '#ffffff', whiteSpace: 'pre' }}
                        >
                          {item.detail}
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
                <Typography
                  textAlign={isMobile ? 'center' : 'left'}
                  variant="h4"
                  sx={{ mt: !isDesktop ? 3 : 8, mb: 2, color: '#ffffff!important' }}
                >
                  {t(`contact.bottom`)}
                </Typography>
                <Stack direction="row" spacing={5} sx={{ pl: 1, mb: 2 }}>
                  {socialsImg.map((item) => (
                    <Stack key={item.id} sx={{ cursor: 'pointer' }}>
                      <Link component={NextLink} target="_blank" href={item.href} passHref>
                        <Image src={item.image} alt="icon" width={24} height={24} loading="lazy" />
                      </Link>
                    </Stack>
                  ))}
                </Stack>
              </>
            )}
            {!isDesktop && (
              <Stack sx={{ flex: '1', backgroundColor: '#ffffff', borderRadius: '16px', py: 4, pl: 4, pr: 4 }}>
                <form noValidate onSubmit={formik.handleSubmit}>
                  <Stack spacing={3}>
                    <Stack>
                      <Typography variant="h3" sx={{ color: '#000000' }}>
                        {t(`form.t1.t`)}
                      </Typography>
                      <TextField
                        error={Boolean(formik.touched.fullname && formik.errors.fullname)}
                        fullWidth
                        helperText={formik.touched.fullname && formik.errors.fullname}
                        label={t(`form.t1.d`)}
                        name="fullname"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.fullname}
                      />
                    </Stack>
                    <Stack>
                      <Typography variant="h3" sx={{ color: '#000000' }}>
                        {t(`form.t2.t`)}
                      </Typography>
                      <TextField
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        fullWidth
                        helperText={formik.touched.email && formik.errors.email}
                        label={t(`form.t2.d`)}
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="email"
                        value={formik.values.email}
                        sx={{ marginRight: '25px' }}
                      />
                    </Stack>
                    <Stack>
                      <Typography variant="h3" sx={{ color: '#000000' }}>
                        {t(`form.t3.t`)}
                      </Typography>
                      <TextField
                        error={Boolean(formik.touched.message && formik.errors.message)}
                        fullWidth
                        helperText={formik.touched.message && formik.errors.message}
                        label={t(`form.t3.d`)}
                        name="message"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.message}
                        rows={5}
                        multiline
                      />
                    </Stack>
                  </Stack>
                  <Box sx={{ mt: 4 }}>
                    <Button
                      sx={{
                        borderRadius: 4,
                        backgroundColor: 'primary.main',
                        color: '#ffffff',
                        fontSize: '16px',
                        fontWeight: '700',
                      }}
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      SEND
                    </Button>
                  </Box>
                </form>
              </Stack>
            )}
            {(isDesktop || isMobile) && (
              <>
                <Stack spacing={4} mt={!isDesktop ? 3 : 0}>
                  {contactArr.map((item, index) => (
                    <Stack key={index} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                      <Stack>
                        <Image src={item.image} alt="icon" width="40px" height="40px" loading="lazy" />
                      </Stack>
                      <Stack sx={{ ml: 2, flex: '1' }}>
                        <Typography variant="body1" sx={{ color: 'subtitle.main' }}>
                          {item.title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{ textAlign: 'justify', color: '#ffffff', whiteSpace: 'pre' }}
                        >
                          {item.detail}
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
                <Typography
                  textAlign={isMobile ? 'center' : 'left'}
                  variant="h4"
                  sx={{ mt: !isDesktop ? 3 : 8, mb: 2, color: '#ffffff!important' }}
                >
                  {t(`contact.bottom`)}
                </Typography>
                <Stack direction="row" spacing={5} sx={{ pl: 1 }}>
                  {socialsImg.map((item) => (
                    <Stack key={item.id} sx={{ cursor: 'pointer' }}>
                      <Link component={NextLink} target="_blank" href={item.href} passHref>
                        <Image src={item.image} alt="icon" width={24} height={24} loading="lazy" />
                      </Link>
                    </Stack>
                  ))}
                </Stack>
              </>
            )}
          </Stack>
          {isDesktop && (
            <Stack sx={{ flex: '1', backgroundColor: '#ffffff', borderRadius: '16px', py: 4, pl: 4, pr: 4 }}>
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <Stack>
                    <Typography variant="h3" sx={{ color: '#000000' }}>
                      {t(`form.t1.t`)}
                    </Typography>
                    <TextField
                      error={Boolean(formik.touched.fullname && formik.errors.fullname)}
                      fullWidth
                      helperText={formik.touched.fullname && formik.errors.fullname}
                      label={t(`form.t1.d`)}
                      name="fullname"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.fullname}
                    />
                  </Stack>
                  <Stack>
                    <Typography variant="h3" sx={{ color: '#000000' }}>
                      {t(`form.t2.t`)}
                    </Typography>
                    <TextField
                      error={Boolean(formik.touched.email && formik.errors.email)}
                      fullWidth
                      helperText={formik.touched.email && formik.errors.email}
                      label={t(`form.t2.d`)}
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      value={formik.values.email}
                      sx={{ marginRight: '25px' }}
                    />
                  </Stack>
                  <Stack>
                    <Typography variant="h3" sx={{ color: '#000000' }}>
                      {t(`form.t3.t`)}
                    </Typography>
                    <TextField
                      error={Boolean(formik.touched.message && formik.errors.message)}
                      fullWidth
                      helperText={formik.touched.message && formik.errors.message}
                      label={t(`form.t3.d`)}
                      name="message"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.message}
                      rows={5}
                      multiline
                    />
                  </Stack>
                </Stack>
                <Box sx={{ mt: 4 }}>
                  <Button
                    sx={{
                      borderRadius: 4,
                      backgroundColor: 'primary.main',
                      color: '#ffffff',
                      fontSize: '16px',
                      fontWeight: '700',
                    }}
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    SEND
                  </Button>
                </Box>
              </form>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

export default About5
