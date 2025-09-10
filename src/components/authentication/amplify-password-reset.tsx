import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Box, Button, Divider, FormHelperText, Stack, TextField, Typography } from '@mui/material'
import { useAuth } from '@app/hooks/use-auth'
import { useMounted } from '@app/hooks/use-mounted'
import PinInput from 'react-pin-input'
import { useTheme } from '@mui/material/styles'
import { INPUT_SCHEMA, REGEX } from '@app/constants/schema'
import { useMobile } from '../common'

export const AmplifyPasswordReset = (props: any) => {
  const theme = useTheme()
  const isMounted = useMounted()
  const { passwordReset } = useAuth()
  const router = useRouter()
  const isMobile = useMobile()
  const [username, setUsername] = useState('')
  const [timeLeft, setTimeLeft] = useState(60)
  const { resendCode } = useAuth()
  const intervalRef = useRef<number>()
  const [ableToResent, setAbleToResent] = useState(false)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: '',
      email: username,
      password: '',
      passwordConfirm: '',
      submit: null,
    },
    validationSchema: Yup.object({
      code: Yup.string().min(6).max(6).required('Bạn cần nhập mật mã'),
      email: Yup.string().email('Email không hợp lệ').max(255).required('Bạn cần nhập email'),
      password: Yup.string()
        .matches(REGEX.MEMBERPASSWORD, INPUT_SCHEMA.memberPassword)
        .required('Vui lòng nhập trường này!'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu phải trùng khớp')
        .required('Bạn cần nhập lại mật khẩu'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await passwordReset({
          email: values.email,
          code: values.code,
          newPassword: values.password,
        })

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
          borderRadius: theme.shape.borderRadius,
          width: isMobile ? 45 : 56,
          height: isMobile ? 45 : 56,
          borderWidth: 1,
          fontSize: theme.typography.h5.fontSize,
          margin: isMobile ? '0 5px 0 0' : '0 20px 0 0',
        }}
        inputFocusStyle={{
          borderColor: theme.palette.primary.main,
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
      <TextField
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        helperText={formik.touched.password && formik.errors.password}
        label="Mật khẩu"
        margin="normal"
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.password}
      />
      <TextField
        error={Boolean(formik.touched.passwordConfirm && formik.errors.passwordConfirm)}
        fullWidth
        helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
        label="Nhập lại mật khẩu"
        margin="normal"
        name="passwordConfirm"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.passwordConfirm}
      />
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
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
          Đặt lại
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
