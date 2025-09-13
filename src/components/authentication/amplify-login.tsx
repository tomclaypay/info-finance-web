import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Box, Button, Checkbox, Divider, FormHelperText, Link, Stack, TextField, Typography } from '@mui/material'
import { useAuth } from '@app/hooks/use-auth'
import { useMounted } from '@app/hooks/use-mounted'
import NextLink from 'next/link'
import SocialLoginButton from './social-login-button'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

export const AmplifyLogin = (props: any) => {
  const { t } = useTranslation('common')
  const isMounted = useMounted()
  const router = useRouter()
  const { login, googleLogin, facebookLogin } = useAuth()
  const [username, setUsername] = useState('')
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: username,
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(`${t('authen.validateEmail')}`)
        .max(255)
        .required(`${t('authen.missingEmail')}`),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await login({
          email: values.email,
          password: values.password,
        })

        if (isMounted()) {
          const returnUrl = (router.query.returnUrl as string) || '/'
          await router.push(returnUrl)
        }
      } catch (err: any) {
        if (isMounted()) {
          if (err.code === 'UserNotConfirmedException') {
            sessionStorage.setItem('username', values.email)
            await router.push('/authentication/verify-code')
            return
          }

          helpers.setStatus({ success: false })
          helpers.setErrors({ submit: err.message })
          helpers.setSubmitting(false)
        }
      }
    },
  })

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username')

    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

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
          variant="caption"
          color="textSecondary"
          sx={{
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
        autoFocus
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
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        helperText={formik.touched.password && formik.errors.password}
        label={t('authen.passPlaceholder')}
        margin="normal"
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.password}
      />
      {formik.errors.submit && (
        <Box>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}
      <Stack mt={1} direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            ml: -1,
          }}
        >
          <Checkbox name="save-credentials" />
          <Typography color="textSecondary" variant="subtitle2">
            {t('authen.remmember')}
          </Typography>
        </Box>

        <Link component={NextLink} href={'/authentication/password-recovery'} passHref fontWeight={500} variant="body2">
          {t('authen.fogot')}
        </Link>
      </Stack>
      <Box sx={{ mt: 6 }}>
        <Button
          sx={{ borderRadius: 24 }}
          disabled={formik.isSubmitting}
          fullWidth
          type="submit"
          variant="contained"
          size="large"
        >
          {t('authen.login')}
        </Button>
      </Box>
    </form>
  )
}
