import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAuth } from '@app/hooks/use-auth'
import { useMounted } from '@app/hooks/use-mounted'
import SocialLoginButton from './social-login-button'
import { INPUT_SCHEMA, REGEX } from '@app/constants/schema'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export const AmplifyRegister = (props: any) => {
  const isMounted = useMounted()
  const { t } = useTranslation('common')
  const router = useRouter()
  const locale = router.locale
  const { register, googleLogin, facebookLogin } = useAuth()
  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
      policy: false,
      submit: null,
    },
    validationSchema: Yup.object({
      displayName: Yup.string().max(255).required('Bạn phải nhập tên hiển thị'),
      email: Yup.string().email('Email không hợp lệ').max(255).required('Bạn cần nhập email'),
      password: Yup.string()
        .matches(REGEX.MEMBERPASSWORD, INPUT_SCHEMA.memberPassword)
        .required('Vui lòng nhập trường này!'),
      policy: Yup.boolean().oneOf([true], 'Bạn phải đồng ý để tiếp tục'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const res: any = await register({
          email: values.email,
          password: values.password,
          displayName: values.displayName,
        })

        const message = res?.data?.register?.message
        const code = res?.data?.register?.code
        const isVerified = res?.data?.register?.data?.isEmailVerified
        formik.errors.email =
          message === 'User already exists' && isVerified
            ? locale === 'vi'
              ? 'Email đã được sử dụng, vui lòng sử dụng email khác'
              : 'Email is already used, please use another email'
            : ''

        if (isMounted() && (code === 'SUCCESS' || !isVerified)) {
          sessionStorage.setItem('username', values.email)
          await router.push('/authentication/verify-code')
        }
      } catch (err: any) {
        if (isMounted()) {
          helpers.setStatus({ success: false })
          helpers.setErrors({ submit: err.message })
          helpers.setSubmitting(false)
        }
      }
    },
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <Stack spacing={2}>
        <SocialLoginButton
          fullWidth
          icon="/static/login-button/google.png"
          onClick={googleLogin}
          sx={{
            '&.MuiButton-root': {
              color: '#000000',
            },
          }}
        >
          {t('authen.googleLogin')}
        </SocialLoginButton>
        <SocialLoginButton
          fullWidth
          icon="/static/login-button/facebook.png"
          onClick={facebookLogin}
          sx={{
            '&.MuiButton-root': {
              color: '#000000',
            },
          }}
        >
          {t('authen.facebookLogin')}
        </SocialLoginButton>
      </Stack>

      <Box mb={3} mt={4.5} sx={{ width: '100%', position: 'relative' }}>
        <Divider />
        <Typography
          color="#A0A4AB"
          sx={{
            fontSize: '14px',
            bgcolor: 'white',
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            px: 1.5,
          }}
        >
          {t('authen.or')}
        </Typography>
      </Box>

      <TextField
        InputLabelProps={{
          style: {
            color: '#A0A4AB',
          },
        }}
        error={Boolean(formik.touched.displayName && formik.errors.displayName)}
        fullWidth
        helperText={formik.touched.displayName && formik.errors.displayName}
        label={t('authen.displayName')}
        margin="normal"
        name="displayName"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.displayName}
      />
      <TextField
        InputLabelProps={{
          style: {
            color: '#A0A4AB',
          },
        }}
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label={t('authen.emailPlaceholder')}
        margin="normal"
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="email"
        value={formik.values.email}
      />
      <TextField
        InputLabelProps={{
          style: {
            color: '#A0A4AB',
          },
        }}
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        helperText={formik.touched.password && formik.errors.password}
        label={t('authen.passPlaceholder')}
        margin="normal"
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type={showPassword ? 'text' : 'password'}
        value={formik.values.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: -1,
          mt: 2,
        }}
      >
        <Checkbox checked={formik.values.policy} name="policy" onChange={formik.handleChange} />
        <Typography fontWeight={500} color="textSecondary" variant="body2">
          {t('authen.iread')}{' '}
          <Link fontWeight={500} component="a" href="#">
            {t('authen.policy')}
          </Link>
        </Typography>
      </Box>
      {Boolean(formik.touched.policy && formik.errors.policy) && (
        <FormHelperText error>{formik.errors.policy}</FormHelperText>
      )}
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <Button
          disabled={formik.isSubmitting}
          sx={{ borderRadius: 4, fontSize: '16px', fontWeight: 700 }}
          fullWidth
          type="submit"
          variant="contained"
          size="large"
        >
          {t('authen.signup')}
        </Button>
      </Box>
    </form>
  )
}
