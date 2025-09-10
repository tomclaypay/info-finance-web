import { FormActionLabels, FormActions } from '@app/constants/common'
import {
  SUPERVISOR_STATUS_OPTIONS,
  SUPERVISOR_STATUS_OPTIONS_EN,
  SUPERVISOR_TIME_OPTIONS,
  SUPERVISOR_TIME_OPTIONS_EN,
  TRADING_PLATFORM_OPTIONS,
  TRADING_PLATFORM_OPTIONS_EN,
  TRADING_PRODUCTION_OPTIONS,
  TRADING_PRODUCTION_OPTIONS_EN,
  TranslateTradingPlatform,
  TranslateSupervisorStatus,
  TranslateSupervisorTime,
  TranslateTradingProduction,
} from '@app/constants/exchange'
import { Option } from '@app/interfaces/common'
import { Exchange } from '@app/interfaces/exchange'
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { FastField, Field, Form, Formik, FormikProps } from 'formik'
import NextLink from 'next/link'
import { ChangeEvent, useMemo, useState } from 'react'
import * as yup from 'yup'
import AutoCompleteField from '../../common/formik-fields/auto-complete-field'
import ImageField from '../../common/formik-fields/image-field'
import InputField from '../../common/formik-fields/input-field'
import QuillEditorField from '../../common/formik-fields/quill-editor-field'
import { convertNameToSlug } from '@app/utils/common'
import WebsiteField from '../../common/formik-fields/website-field'

interface ExchangeFormProps {
  type: FormActions
  initialValues: any
  onSubmit: (formValues: any) => void
  amountHighlightExchanges?: any
  nationalOptions?: Option[]
  page: string
  limit: string
}

const userFormValidationSchema = yup.object().shape({
  name: yup.string().required('Bắt buộc'),
})

// const filter = createFilterOptions()

export const ExchangeForm = (props: ExchangeFormProps) => {
  const { type, initialValues, onSubmit, amountHighlightExchanges, nationalOptions, page, limit } = props
  const [popup, setPopup] = useState({
    open: false,
    description: '',
  })

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
        ],
      },
    }),
    []
  )

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={userFormValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <Card>
            <CardHeader title={`${FormActionLabels[type]} sàn giao dịch`} sx={{ textTransform: 'capitalize' }} />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <FastField
                    name="name"
                    component={InputField}
                    label="Tên viết tắt"
                    onBlur={(e: ChangeEvent<HTMLInputElement>) => {
                      const val = e.target.value
                      setFieldValue('name', val)
                      setFieldValue('slug', convertNameToSlug(val))
                    }}
                    sx={{
                      '&>label::after': {
                        content: "'*'",
                        color: 'red',
                      },
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FastField name="total_point" component={InputField} label="Tổng điểm đánh giá" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FastField name="slug" component={InputField} label="Slug" />
                </Grid>
                {/* <Grid item md={6} xs={12}>
                  <FastField name="website" component={InputField} label="Website" />
                </Grid> */}
                <Grid item md={6} xs={12}>
                  <FastField name="risk_point" component={InputField} label="Chất lượng kiểm soát rủi ro" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FastField name="abbreviation" component={InputField} label="Tên đầy đủ " />
                </Grid>
                {/* <Grid item md={6} xs={12}>
                  <FastField name="headquarter" component={InputField} label="Trụ sở chính" />
                </Grid> */}
                <Grid item md={6} xs={12}>
                  <FastField name="license_point" component={InputField} label="Điểm giấy phép" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FastField name="email" component={InputField} label="Email hỗ trợ" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FastField name="manage_point" component={InputField} label="Chất lượng quản lý" />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FastField name="phone" component={InputField} label="Điện thoại liên hệ" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FastField name="operation_point" component={InputField} label="Chất lượng vận hành" />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Field
                    name="national_name"
                    component={AutoCompleteField}
                    label="Quốc gia"
                    options={nationalOptions}
                    onSelectOption={(option: Option, form: FormikProps<Exchange>) => {
                      form.setFieldValue('national_id', option?.value || '')
                    }}
                    sx={{
                      '&>label::after': {
                        content: "'*'",
                        color: 'red',
                      },
                    }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FastField name="soft_point" component={InputField} label="Chất lượng phần mềm" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={TRADING_PLATFORM_OPTIONS}
                    getOptionLabel={(item: any) => item || ''}
                    value={values.trading_platform}
                    renderInput={(params) => <TextField {...params} label="Nền tảng giao dịch (Tiếng Việt)" />}
                    onChange={(event, newValue) => {
                      setFieldValue('trading_platform', newValue)
                      setFieldValue('trading_platform_en', TranslateTradingPlatform(newValue))
                    }}
                    // filterOptions={(options, params) => {
                    //   const filtered = filter(options, params)
                    //   const { inputValue } = params
                    //   // Suggest the creation of a new value
                    //   const isExisting = options.some((option) => inputValue === option.title)
                    //   if (inputValue !== '' && !isExisting) {
                    //     filtered.push(inputValue)
                    //   }
                    //   return [...filtered]
                    // }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    disabled={true}
                    options={TRADING_PLATFORM_OPTIONS_EN}
                    getOptionLabel={(item: any) => item || ''}
                    value={values.trading_platform_en}
                    renderInput={(params) => <TextField {...params} label="Nền tảng giao dịch (Tiếng Anh)" />}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={TRADING_PRODUCTION_OPTIONS}
                    getOptionLabel={(item: any) => item || ''}
                    value={values.trading_product}
                    renderInput={(params) => <TextField {...params} label="Sản phẩm giao dịch (Tiếng Việt)" />}
                    onChange={(event, newValue) => {
                      setFieldValue('trading_product', newValue)
                      setFieldValue('trading_product_en', TranslateTradingProduction(newValue))
                    }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    disabled={true}
                    options={TRADING_PRODUCTION_OPTIONS_EN}
                    getOptionLabel={(item: any) => item || ''}
                    value={values.trading_product_en}
                    renderInput={(params) => <TextField {...params} label="Sản phẩm giao dịch (Tiếng Anh)" />}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Autocomplete
                    options={SUPERVISOR_STATUS_OPTIONS}
                    getOptionLabel={(item: any) => item || ''}
                    value={values.supervision_status}
                    renderInput={(params) => <TextField {...params} label="Tình trạng giám sát (Tiếng Viêt)" />}
                    onChange={(event, newValue) => {
                      setFieldValue('supervision_status', newValue)
                      setFieldValue('supervision_status_en', TranslateSupervisorStatus(newValue))
                    }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Autocomplete
                    options={SUPERVISOR_STATUS_OPTIONS_EN}
                    disabled={true}
                    getOptionLabel={(item: any) => item || ''}
                    value={values.supervision_status_en}
                    renderInput={(params) => <TextField {...params} label="Tình trạng giám sát (Tiếng Anh)" />}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Autocomplete
                    options={SUPERVISOR_TIME_OPTIONS}
                    getOptionLabel={(item: any) => item || ''}
                    value={values.supervision_time}
                    renderInput={(params) => <TextField {...params} label="Thời gian giám sát (Tiếng Việt)" />}
                    onChange={(event, newValue) => {
                      setFieldValue('supervision_time', newValue)
                      setFieldValue('supervision_time_en', TranslateSupervisorTime(newValue))
                    }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Autocomplete
                    options={SUPERVISOR_TIME_OPTIONS_EN}
                    disabled={true}
                    getOptionLabel={(item: any) => item || ''}
                    value={values.supervision_time_en}
                    renderInput={(params) => <TextField {...params} label="Thời gian giám sát (Tiếng Anh)" />}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Stack direction="row" alignItems="center" mb={1}>
                    <Switch
                      checked={values.is_top_broker}
                      onChange={() => {
                        if (
                          !values.is_top_broker &&
                          amountHighlightExchanges?.amount_top_broker?.aggregate.count >= 3
                        ) {
                          setPopup({
                            open: true,
                            description: 'Đã có 3 sàn bật tính năng này',
                          })
                        } else {
                          setFieldValue('is_top_broker', !values.is_top_broker)
                        }
                      }}
                    />
                    <Typography>Hiển thị sàn môi giới hàng đầu</Typography>
                  </Stack>
                  {values.is_top_broker && (
                    <FormControl fullWidth>
                      <InputLabel id="is_top_broker-label">Vị trí hiển thị</InputLabel>
                      <Select
                        labelId="is_top_broker-label"
                        id="is_top_broker"
                        value={values.rate_top_broker}
                        label="Vị trí hiển thị"
                        onChange={(event: SelectChangeEvent) => {
                          setFieldValue('rate_top_broker', event.target.value)
                        }}
                      >
                        <MenuItem value={0}>Chưa có vị trí</MenuItem>
                        <MenuItem value={1}>Trái</MenuItem>
                        <MenuItem value={2}>Giữa</MenuItem>
                        <MenuItem value={3}>Phải</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Grid>

                <Grid item md={6} xs={12}>
                  <Stack direction="row" alignItems="center" mb={1}>
                    <Switch
                      checked={values.is_trader_all_choose}
                      onChange={() => {
                        if (
                          !values.is_trader_all_choose &&
                          amountHighlightExchanges?.amount_traders_all_choose?.aggregate.count >= 4
                        ) {
                          setPopup({
                            open: true,
                            description: 'Đã có 4 sàn bật tính năng này',
                          })
                        } else {
                          setFieldValue('is_trader_all_choose', !values.is_trader_all_choose)
                        }
                      }}
                    />
                    <Typography>Hiển thị người dùng tin chọn</Typography>
                  </Stack>
                  {values.is_trader_all_choose && (
                    <FormControl fullWidth>
                      <InputLabel id="is_trader_all_choose-label">Vị trí hiển thị</InputLabel>
                      <Select
                        labelId="is_trader_all_choose-label"
                        id="is_trader_all_choose"
                        value={values.rate_trader_all_choose}
                        label="Vị trí hiển thị"
                        onChange={(event: SelectChangeEvent) => {
                          setFieldValue('rate_trader_all_choose', event.target.value)
                        }}
                      >
                        <MenuItem value={0}>Chưa có vị trí</MenuItem>
                        <MenuItem value={1}>Trên bên trái</MenuItem>
                        <MenuItem value={2}>Trên bên phải</MenuItem>
                        <MenuItem value={3}>Dưới bên phải</MenuItem>
                        <MenuItem value={4}>Dưới bên trái</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Grid>

                <Grid item md={6} xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: '500',
                    }}
                  >
                    Logo sàn
                  </Typography>
                  <Field name="logo" component={ImageField} title="Hình ảnh sàn giao dịch" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: '500',
                    }}
                  >
                    Icon sàn
                  </Typography>
                  <Field name="icon" component={ImageField} title="Hình ảnh sàn giao dịch" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Stack direction="row" alignItems="center">
                    <Switch
                      checked={!values.hidden}
                      onChange={() => {
                        setFieldValue('hidden', !values.hidden)
                      }}
                    />
                    <Typography>Hiển thị</Typography>
                  </Stack>
                </Grid>

                <Grid item md={12} xs={12} rowGap={2}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: '500',
                      marginBottom: 1,
                    }}
                  >
                    Website
                  </Typography>
                  <Field name="website" options={nationalOptions} component={WebsiteField} />
                </Grid>

                <Grid item md={12} xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: '500',
                    }}
                  >
                    Giới thiệu (Tiếng Việt)
                  </Typography>
                  <Field name="intro" component={QuillEditorField} modules={modules} />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: '500',
                    }}
                  >
                    Giới thiệu (Tiếng Anh)
                  </Typography>
                  <Field name="intro_en" component={QuillEditorField} modules={modules} />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions
              sx={{
                flexWrap: 'wrap',
                m: -1,
              }}
            >
              <Button
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                sx={{ m: 1, textTransform: 'capitalize' }}
              >
                {FormActionLabels[type]}
              </Button>
              <NextLink
                href={{
                  pathname: '/dashboard/exchanges',
                  query: {
                    initialPage: page,
                    initialLimit: limit,
                  },
                }}
                passHref
              >
                <Button
                  component="a"
                  disabled={isSubmitting}
                  sx={{
                    m: 1,
                    mr: 'auto',
                  }}
                  variant="outlined"
                >
                  Đóng
                </Button>
              </NextLink>
            </CardActions>
          </Card>

          <Dialog
            open={popup.open}
            onClose={() => setPopup({ open: false, description: '' })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>Cảnh báo</DialogTitle>
            <DialogContent>
              <Typography color="error.main" textAlign="center" variant="body2">
                {popup.description}
              </Typography>
            </DialogContent>
          </Dialog>
        </Form>
      )}
    </Formik>
  )
}
