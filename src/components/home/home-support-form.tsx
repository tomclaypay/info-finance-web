import { useQuery } from '@apollo/client'
import { AuthContext } from '@app/contexts/amplify-context'
import GET_COMPLAINT_CATEGORIES from '@app/operations/queries/complaints/get-complaint-categories'
import GET_COMPLAINTS_AGGREGATE from '@app/operations/queries/complaints/get-complaints-aggregate'
import GET_EXCHANGES_BY_NAME from '@app/operations/queries/exchanges/get-exchanges-by-name'
import { Autocomplete, Box, Button, FormControl, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useMobile } from '../common'

const SupportForm = () => {
  const { t } = useTranslation(['home-page', 'common'])
  const value = useContext(AuthContext)
  const router = useRouter()
  const locale = router.locale
  const isMobile = useMobile()
  const { data: dataExchanges } = useQuery(GET_EXCHANGES_BY_NAME)
  const { data: dataCategories } = useQuery(GET_COMPLAINT_CATEGORIES)
  const { data: complaintsAggregate } = useQuery(GET_COMPLAINTS_AGGREGATE)
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      phone: '',
      exposureType: '',
      ownerName: { name: '', id: '' },
    },
    onSubmit: (values) => {
      if (!value.user) {
        router.push('/authentication/login')
      }
      if (value.user) {
        router.push({
          pathname: locale === 'vi' ? '/danh-gia-san/gui-danh-gia' : '/exchange-review/create-review',
          query: {
            userName: values.userName,
            email: values.email,
            phone: values.phone,
            ownerName: values.ownerName.name,
            idOwner: values.ownerName.id,
            exposureType: values.exposureType,
          },
        })
      }
    },
  })

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Typography
        variant="h1"
        sx={{
          fontWeight: '700',
          fontSize: isMobile ? '24px' : '32px',
          lineHeight: isMobile ? '29px' : '39px',
          textAlign: isMobile ? 'center' : 'start',
          color: 'text.primary',
        }}
      >
        {t(`complaint.title`)}
      </Typography>
      <Typography
        sx={{
          lineHeight: '24px',
          color: 'text.primary',
          marginTop: '16px',
          paddingRight: isMobile ? 'none' : '70px',
          fontSize: isMobile ? '14px' : '16px',
          textAlign: isMobile ? 'center' : 'start',
        }}
      >
        <b>Info Finance</b> {t(`complaint.top`)}
      </Typography>
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: isMobile ? '20px' : '24px',
          color: '#A0A4AB',
          marginTop: '16px',
          paddingRight: isMobile ? 'none' : '70px',
          paddingBottom: '32px',
          textAlign: isMobile ? 'center' : 'start',
        }}
      >
        {t(`complaint.middle.t1`)}{' '}
        <b style={{ color: '#FF4C33', fontSize: '24px' }}>
          {complaintsAggregate?.complaints_aggregate?.aggregate?.count}
        </b>{' '}
        {t(`complaint.middle.t2`)}
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <Autocomplete
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
                label={t(`complaint.form.search`)}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            error={Boolean(formik.touched.userName && formik.errors.userName)}
            fullWidth
            helperText={formik.touched.userName && formik.errors.userName}
            label={t(`complaint.form.t1`)}
            margin="normal"
            name="userName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.userName}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
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
            sx={{ marginRight: '25px' }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            error={Boolean(formik.touched.phone && formik.errors.phone)}
            fullWidth
            helperText={formik.touched.phone && formik.errors.phone}
            label={t(`complaint.form.t2`)}
            margin="normal"
            name="phone"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl sx={{ mt: 2, width: '100%' }}>
            <TextField
              id="demo-controlled-open-select"
              select
              error={Boolean(formik.touched.exposureType && formik.errors.exposureType)}
              name="exposureType"
              value={formik.values.exposureType}
              label={t(`complaint.form.t3`)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.exposureType && formik.errors.exposureType}
            >
              {dataCategories?.complaint_categories?.map((item: any) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.slug === 'lua-dao' && (router.locale === 'vi' ? 'Lừa đảo' : 'Scam')}

                  {item.slug === 'hop-thu-danh-gia-va-gop-y-tu-nha-dau-tu' &&
                    (router.locale === 'vi'
                      ? 'Hộp thư đánh giá và góp ý từ nhà đầu tư'
                      : 'Investor feedback and comments mailbox')}

                  {item.slug === 'danh-gia-tong-quat' &&
                    (router.locale === 'vi' ? 'Đánh giá tổng quát' : 'General Review')}

                  {item.slug === 'ly-do-khac' && (router.locale === 'vi' ? 'Lý do khác' : 'Other problems')}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
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
          {t(`button.complaint.continue`, { ns: 'common' })}
        </Button>
      </Box>
    </form>
  )
}

export default SupportForm
