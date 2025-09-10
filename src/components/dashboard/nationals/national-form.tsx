import { FormActionLabels, FormActions } from '@app/constants/common'
import { National } from '@app/interfaces/national'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material'
import { FastField, Field, Form, Formik } from 'formik'
import NextLink from 'next/link'
import * as yup from 'yup'
import ImageField from '../common/formik-fields/image-field'
import InputField from '../common/formik-fields/input-field'

interface NationalFormProps {
  type: FormActions
  initialValues: any
  onSubmit: (formValues: Partial<National>) => void
}

const userFormValidationSchema = yup.object().shape({
  name: yup.string().required('Bắt buộc'),
})

export const NationalForm = (props: NationalFormProps) => {
  const { type, initialValues, onSubmit } = props

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
            <CardHeader title={`${FormActionLabels[type]} quốc gia`} sx={{ textTransform: 'capitalize' }} />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <FastField name="name" component={InputField} label="Tên quốc gia (tiếng anh)" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FastField name="name_vn" component={InputField} label="Tên quốc gia (tiếng việt)" />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                  sx={{
                    overflow: 'hidden',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: '500',
                    }}
                  >
                    Cờ quốc gia
                  </Typography>
                  <Box
                    sx={{
                      overflow: 'hidden',
                      borderRadius: 1,
                    }}
                  >
                    <Field name="logo" component={ImageField} title="Cờ quốc gia" />
                  </Box>
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
              <NextLink href="/dashboard/nationals" passHref>
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
