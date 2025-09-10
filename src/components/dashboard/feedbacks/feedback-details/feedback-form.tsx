import { FormActionLabels, FormActions } from '@app/constants/common'
import { Option, UserOption } from '@app/interfaces/common'
import { Feedback } from '@app/interfaces/feedback'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import { FastField, Field, Form, Formik, FormikProps } from 'formik'
import NextLink from 'next/link'
import * as yup from 'yup'
import AutoCompleteField from '@app/components/dashboard/common/formik-fields/auto-complete-field'
import InputField from '@app/components/dashboard/common/formik-fields/input-field'

interface FeedbackFormProps {
  type: FormActions
  initialValues: any
  onSubmit: (formValues: any) => void
  userOptions?: UserOption[]
  seederOptions?: UserOption[]
  exchangeOptions?: Option[]
  page: string
  limit: string
}

const userFormValidationSchema = yup.object().shape({
  comment: yup.string().required('Bắt buộc'),
  point: yup.number().required('Bắt buộc'),
  userId: yup.string(),
  seederId: yup.string(),
  exchangeId: yup.string().required('Bắt buộc'),
})

export const FeedbackForm = (props: FeedbackFormProps) => {
  const { type, initialValues, onSubmit, userOptions, seederOptions, exchangeOptions, page, limit } = props

  const handleSelectFullName = (option: UserOption, form: FormikProps<Feedback>) => {
    form.setFieldValue('userId', option?.value || '')
  }

  const handleSelectSeederName = (option: UserOption, form: FormikProps<Feedback>) => {
    form.setFieldValue('seederId', option?.value || '')
  }

  const handleSelectExchange = (option: Option, form: FormikProps<Feedback>) => {
    form.setFieldValue('exchangeId', option?.value || '')
  }

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
                  <Field
                    name="displayName"
                    component={AutoCompleteField}
                    label="Tên người khiếu nại"
                    options={userOptions}
                    onSelectOption={handleSelectFullName}
                    disabled={type === FormActions.UPDATE}
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
                    name="seederName"
                    component={AutoCompleteField}
                    label="Tên seeder khiếu nại"
                    options={seederOptions}
                    onSelectOption={handleSelectSeederName}
                    disabled={type === FormActions.UPDATE}
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
                    name="exchangeName"
                    component={AutoCompleteField}
                    label="Tên sàn giao dịch"
                    options={exchangeOptions}
                    onSelectOption={handleSelectExchange}
                    disabled={type === FormActions.UPDATE}
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
                    name="comment"
                    component={InputField}
                    label="Nội dung"
                    multiline={true}
                    rows={10}
                    sx={{
                      '&>label::after': {
                        content: "'*'",
                        color: 'red',
                      },
                    }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Stack spacing={1}>
                    <FastField name="point" component={InputField} label="" />

                    <Stack direction="row" alignItems="center">
                      <Switch
                        checked={!values.hidden}
                        onChange={() => {
                          setFieldValue('hidden', !values.hidden)
                        }}
                      />
                      <Typography>Hiển thị review</Typography>
                    </Stack>
                  </Stack>
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
                  pathname: '/dashboard/feedbacks',
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
