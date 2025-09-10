import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Box, Button, FormHelperText, TextField, Link } from '@mui/material'
import { useAuth } from '@app/hooks/use-auth'
import { useMounted } from '@app/hooks/use-mounted'
import NextLink from 'next/link'
import { Stack } from '@mui/system'

export const AmplifyPasswordRecovery = (props: any) => {
  const isMounted = useMounted()
  const { passwordRecovery } = useAuth()
  const router = useRouter()
  const locale = router.locale
  const formik = useFormik({
    initialValues: {
      email: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email không hợp lệ').max(255).required('Bạn cần nhập email'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await passwordRecovery(values.email)

        if (isMounted()) {
          sessionStorage.setItem('username', values.email)
          await router.push('/authentication/password-reset')
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

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <TextField
        autoFocus
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label="Địa chỉ email"
        margin="normal"
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="email"
        value={formik.values.email}
      />
      {formik.errors.submit && (
        <Stack spacing={1} alignItems={'center'} justifyContent={'space-between'} mx={1}>
          <Box sx={{ mt: 1 }}>
            <FormHelperText error>
              {formik.errors.submit !== 'Email not verified'
                ? formik.errors.submit
                : locale === 'vi'
                ? 'Tài khoản đã được đăng ký nhưng chưa xác thực, vui lòng đăng ký lại'
                : 'The account has been registered but not verified, please register again'}
            </FormHelperText>
          </Box>
          {formik.errors.submit === 'Email not verified' && (
            <NextLink href={'/authentication/register'} passHref>
              <Link fontWeight={500} variant="body2">
                {locale === 'vi' ? 'Đăng ký lại' : 'Re-register'}
              </Link>
            </NextLink>
          )}
        </Stack>
      )}
      <Box sx={{ mt: 3 }}>
        <Button
          sx={{ borderRadius: 4 }}
          disabled={formik.isSubmitting}
          fullWidth
          type="submit"
          variant="contained"
          size="large"
        >
          Khôi phục
        </Button>
      </Box>
    </form>
  )
}
