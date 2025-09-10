import { useAuth } from '@app/hooks/use-auth'
import { useMounted } from '@app/hooks/use-mounted'
import { Box, Button, Divider, FormHelperText, Stack, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import PinInput from 'react-pin-input'
import * as Yup from 'yup'
import { useMobile } from '../common'

export const AmplifyVerifyCode = (props: any) => {
  const theme = useTheme()
  const isMounted = useMounted()
  const router = useRouter()
  const { verifyCode } = useAuth()
  const { resendCode } = useAuth()
  const [username, setUsername] = useState('')
  const [timeLeft, setTimeLeft] = useState(60)
  const intervalRef = useRef<number>()
  const [ableToResent, setAbleToResent] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    if (!ableToResent) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1)
      }, 1000)
      return () => clearInterval(intervalRef.current)
    }
  }, [ableToResent])

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalRef.current)
      setAbleToResent(true)
    }
  }, [timeLeft])

  const formik = useFormik({
    initialValues: {
      email: username,
      code: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email không hợp lệ').max(255).required('Bạn cần nhập email'),
      code: Yup.string().min(6).max(6).required('Bạn cần nhập mật mã'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await verifyCode({ email: values.email, code: values.code })

        if (isMounted()) {
          await router.push('/authentication/login')
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

  const handleResendCode = async () => {
    try {
      if (formik.values.email) {
        if (ableToResent) {
          await resendCode(formik.values.email)
          setAbleToResent(false)
          setTimeLeft(60)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username')

    if (storedUsername) {
      formik.setFieldValue('email', storedUsername)
      setUsername(storedUsername)
    }
  }, [])

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      {!username ? (
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
      ) : (
        <TextField
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          margin="normal"
          value={username}
        />
      )}
      <Typography
        color="textSecondary"
        sx={{
          mb: 2,
          mt: 3,
        }}
        variant="subtitle2"
      >
        Mã xác thực
      </Typography>
      <PinInput
        length={6}
        initialValue=""
        onChange={(value) => {
          formik.setFieldValue('code', value)
        }}
        onComplete={(value) => {
          formik.setFieldValue('code', value)
        }}
        type="numeric"
        inputMode="number"
        style={{ marginRight: -20 }}
        inputStyle={{
          borderColor: '#E6E8F0',
          borderRadius: Number(theme.shape.borderRadius),
          width: isMobile ? 45 : 56,
          height: isMobile ? 45 : 56,
          borderWidth: 1,
          fontSize: theme.typography.h5.fontSize,
          margin: isMobile ? '0 5px 0 0' : '0 20px 0 0',
        }}
        inputFocusStyle={{
          borderColor: theme.palette.primary.main,
          background: '#F4F8FF',
          borderWidth: 2,
        }}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      {Boolean(formik.touched.code && formik.errors.code) && (
        <FormHelperText error sx={{ mx: '14px' }}>
          {formik.touched.code && formik.errors.code}
        </FormHelperText>
      )}
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 3 }}>
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          sx={{ borderRadius: 4 }}
          size="large"
          type="submit"
          variant="contained"
        >
          Xác thực
        </Button>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Stack direction="row" justifyContent="space-between">
        <Typography
          fontWeight={500}
          variant="body2"
          sx={{
            color: '#0E0E2C',
          }}
        >
          Bạn chưa nhận được mật mã?
        </Typography>
        {!ableToResent && (
          <Typography variant="body2" color="error.main">
            {timeLeft}s
          </Typography>
        )}
        {ableToResent && (
          <Typography
            fontWeight={500}
            variant="body2"
            sx={{
              cursor: 'pointer',
              color: 'primary.main',
              textDecoration: 'underline',
            }}
            onClick={handleResendCode}
          >
            Gửi lại
          </Typography>
        )}
      </Stack>
    </form>
  )
}
