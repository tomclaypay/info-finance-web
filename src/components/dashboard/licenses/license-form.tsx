import { FormActionLabels, FormActions } from '@app/constants/common'
import { LICENSE_STATUS_OPTIONS, LICENSE_STATUS_OPTIONS_EN, TranslateLicenseStatus } from '@app/constants/exchange'
import { Option } from '@app/interfaces/common'
import { License } from '@app/interfaces/license'
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@mui/material'
import { FastField, Field, Form, Formik, FormikProps } from 'formik'
import NextLink from 'next/link'
import * as yup from 'yup'
import AutoCompleteField from '../common/formik-fields/auto-complete-field'
import DatePickerLicenseField from '../common/formik-fields/date-picker-license-field'
import InputField from '../common/formik-fields/input-field'
import CreateEditLicenseChildSection from './license-child/create-edit-license-child-section'

interface LicenseFormProps {
  type: FormActions
  initialValues: any
  onSubmit: (formValues: Partial<License>) => void
  supervisoriesOptions?: Option[]
  exchangesOptions?: Option[]
  page: string
  limit: string
}

const userFormValidationSchema = yup.object().shape({
  supervision_license: yup.string().required('Bắt buộc'),
  license_type_vn: yup.string().required('Bắt buộc'),
  license_type_en: yup.string().required('Bắt buộc'),
  regulatory_license_agency: yup.string().required('Bắt buộc'),
  supervisory_authority_id: yup.string().required('Bắt buộc'),
  exchange_id: yup.string().required('Bắt buộc'),
  status: yup.string().required('Bắt buộc'),
})

export const LicenseForm = (props: LicenseFormProps) => {
  const { type, initialValues, onSubmit, supervisoriesOptions, exchangesOptions, page, limit } = props

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
            <CardHeader title={`${FormActionLabels[type]} giấy phép sàn`} sx={{ textTransform: 'capitalize' }} />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <FastField
                    name="supervision_license"
                    component={InputField}
                    label="Số giấy phép quản lý giám sát"
                    sx={{
                      '&>label::after': {
                        content: "'*'",
                        color: 'red',
                      },
                    }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FastField
                    name="regulatory_license_agency"
                    component={InputField}
                    label="Công ty được cấp phép"
                    sx={{
                      '&>label::after': {
                        content: "'*'",
                        color: 'red',
                      },
                    }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FastField
                    name="license_type_vn"
                    component={InputField}
                    label="Loại giấy phép (tiếng việt)"
                    sx={{
                      '&>label::after': {
                        content: "'*'",
                        color: 'red',
                      },
                    }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FastField
                    name="license_type_en"
                    component={InputField}
                    label="Loại giấy phép (tiếng anh)"
                    sx={{
                      '&>label::after': {
                        content: "'*'",
                        color: 'red',
                      },
                    }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Field
                    name="supervisory_authority_name"
                    component={AutoCompleteField}
                    label="Cơ quan giám sát quản lý"
                    options={supervisoriesOptions}
                    onSelectOption={(option: Option, form: FormikProps<License>) => {
                      form.setFieldValue('supervisory_authority_id', option?.value || '')
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
                  <Field
                    name="exchange_name"
                    component={AutoCompleteField}
                    label="Sàn giao dịch"
                    options={exchangesOptions}
                    onSelectOption={(option: Option, form: FormikProps<License>) => {
                      form.setFieldValue('exchange_id', option?.value || '')
                    }}
                    sx={{
                      '&>label::after': {
                        content: "'*'",
                        color: 'red',
                      },
                    }}
                  />
                </Grid>

                {/* <Grid item md={6} xs={12}>
                  <Field
                    name="status"
                    component={AutoCompleteField}
                    label="Tình trạng hiện tại"
                    options={statusOptions}
                    onSelectOption={(option: Option, form: FormikProps<License>) => {
                      form.setFieldValue('status', option?.value || '')
                    }}
                  />
                </Grid> */}
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    options={LICENSE_STATUS_OPTIONS}
                    getOptionLabel={(item: any) => item || ''}
                    value={values.status}
                    renderInput={(params) => <TextField {...params} label="Tình trạng hiện tại (Tiếng Viêt)" />}
                    onChange={(event, newValue) => {
                      setFieldValue('status', newValue)
                      setFieldValue('status_en', TranslateLicenseStatus(newValue as string))
                    }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Autocomplete
                    options={LICENSE_STATUS_OPTIONS_EN}
                    getOptionLabel={(item: any) => item || ''}
                    value={values.status_en}
                    disabled={true}
                    renderInput={(params) => <TextField {...params} label="Tình trạng hiện tại (Tiếng Anh)" />}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Field name="effective_date" component={DatePickerLicenseField} label="Thời gian có hiệu lực" />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Field name="expiration_date" component={DatePickerLicenseField} label="Thời gian hết hiệu lực" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FastField name="authority_email" component={InputField} label="Email công ty được cấp phép" />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FastField name="authority_website" component={InputField} label="Website công ty được cấp phép" />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FastField name="authority_address" component={InputField} label="Địa chỉ công ty được cấp phép" />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FastField name="authority_phone" component={InputField} label="Điện thoại cơ quan được cấp phép" />
                </Grid>

                <Grid item md={12} xs={12}>
                  <Field
                    name="documentary_evidences"
                    label="Hồ sơ minh chứng"
                    component={CreateEditLicenseChildSection}
                  />
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
                  pathname: '/dashboard/licenses',
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
        </Form>
      )}
    </Formik>
  )
}
