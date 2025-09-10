import { MainLayout } from '@app/components/main-layout'
import { useAuth } from '@app/hooks/use-auth'
import { createAvatar } from '@dicebear/avatars'
import { PhotoCamera } from '@mui/icons-material'
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as style from '@dicebear/avatars-initials-sprites'
import { useMutation } from '@apollo/client'
import UPDATE_ONE_USER from '@app/operations/queries/users/update-one-user'
import { OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import useUploadFile from '@app/hooks/use-upload-file'
import { useTranslation } from 'react-i18next'

const Profile = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { isAuthenticated, user } = useAuth()

  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phone: '',
    birthday: null,
    gender: 'male',
    address: '',
    avatar: '',
  })

  const defaultAvatar = createAvatar(style, {
    seed: user ? user?.displayName || user?.fullname : '',
    dataUri: true,
  })

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [updateUser, { loading, error }] = useMutation(UPDATE_ONE_USER)
  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.BANNER, type: UPLOAD_TYPE.IMAGE })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/authentication/login')
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        phone: user.phone || '',
        birthday: user.birthday || null,
        address: user.address || '',
        displayName: user.displayName || '',
        gender: user.gender || 'male',
        avatar: user.avatar || '',
      })
      setAvatarPreview(user.avatar || defaultAvatar)
    }
  }, [user])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatar(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const getDateOnly = (value: string | null) => {
    return value ? value.split('T')[0] : ''
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      let uploadedAvatarUrl = formData.avatar
      if (avatar) {
        const newLink = await handleUploadFiles([avatar])
        if (newLink) {
          uploadedAvatarUrl = newLink?.[0]
        } else throw new Error('Upload image fails')
      }
      await updateUser({
        variables: {
          id: user?.id,
          changes: {
            displayName: formData.displayName,
            phone: formData.phone,
            birthday: formData.birthday,
            gender: formData.gender,
            address: formData.address,
            avatar: uploadedAvatarUrl, // bạn có thể xử lý upload avatar lên trước
          },
        },
      })
      setOpen(true)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container maxWidth="md">
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpen(false)} severity="success" variant="filled" sx={{ width: '100%', color: '#fff' }}>
          Cập nhật thành công!
        </Alert>
      </Snackbar>
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          {t('update-profile')}
        </Typography>
        <Grid container spacing={2} alignItems="flex-start">
          {/* Avatar bên trái */}
          <Grid item xs={12} sm={3}>
            <Box position="relative" display="flex" justifyContent="center">
              <Avatar
                src={avatarPreview || ''}
                sx={{ width: 100, height: 100, bgcolor: 'orange', fontSize: 40 }}
              ></Avatar>
              <IconButton
                color="primary"
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 50,
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  boxShadow: 1,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <PhotoCamera fontSize="small" />
                <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
              </IconButton>
            </Box>
          </Grid>

          {/* Form bên phải avatar */}
          <Grid item xs={12} sm={9}>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('display-name')}
                    required
                    name="displayName"
                    type="text"
                    value={formData.displayName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    disabled
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label={t('phone')} name="phone" value={formData.phone} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('address')}
                    multiline
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ngày sinh"
                    name={t('birthday')}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.birthday ? getDateOnly(formData.birthday) : ''}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormLabel component="legend">{t('gender')}</FormLabel>
                  <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                    <FormControlLabel value="male" control={<Radio />} label={t('male')} />
                    <FormControlLabel value="female" control={<Radio />} label={t('female')} />
                    <FormControlLabel value="other" control={<Radio />} label={t('other')} />
                  </RadioGroup>
                </Grid>

                <Grid item xs={12} textAlign="center">
                  <Button type="submit" variant="contained">
                    {loading && <CircularProgress size={20} color="inherit" sx={{ marginRight: 2 }} />}
                    {t('save')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

Profile.getLayout = (page: any) => <MainLayout>{page}</MainLayout>

export default Profile

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'vi', ['common', 'complaints', 'home-page', 'exchange', 'seo'])),
    },
  }
}
