import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid } from '@mui/material'
import { FastField, Form, Formik } from 'formik'
import NextLink from 'next/link'
import * as yup from 'yup'
import InputField from '../../common/formik-fields/input-field'

interface GeneralExchangeFormProps {
  initialValues: any
  onSubmit: (formValues: any) => void
}

const userFormValidationSchema = yup.object().shape({
  title: yup.string().required('Bắt buộc'),
  description: yup.string().required('Bắt buộc'),
})

export const GeneralExchangeForm = (props: GeneralExchangeFormProps) => {
  const { initialValues, onSubmit } = props

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={userFormValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Card>
            <CardHeader title="Chi tiết chung của sàn giao dịch" sx={{ textTransform: 'capitalize' }} />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <FastField
                    name="title"
                    component={InputField}
                    label="Về sàn giao dịch (Tiếng Việt)"
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
                  <FastField
                    name="title_en"
                    component={InputField}
                    label="Về sàn giao dịch (Tiếng Anh)"
                    multiline={true}
                    rows={10}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FastField
                    name="description"
                    component={InputField}
                    label="Về đội ngũ khảo sát (Tiếng Việt)"
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
                  <FastField
                    name="description_en"
                    component={InputField}
                    label="Về đội ngũ khảo sát (Tiếng Anh)"
                    multiline={true}
                    rows={10}
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
                Chỉnh sửa
              </Button>
              <NextLink href="/dashboard/exchanges" passHref>
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
