import { FormActionLabels, FormActions } from '@app/constants/common'
import { Option } from '@app/interfaces/common'
import { Supervisor } from '@app/interfaces/supervisor'
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material'
import { FastField, Field, Form, Formik, FormikProps } from 'formik'
import NextLink from 'next/link'
import { useMemo } from 'react'
import * as yup from 'yup'
import AutoCompleteField from '../common/formik-fields/auto-complete-field'
import ImageField from '../common/formik-fields/image-field'
import InputField from '../common/formik-fields/input-field'
import QuillEditorField from '../common/formik-fields/quill-editor-field'

interface SupervisorFormProps {
  type: FormActions
  initialValues: any
  onSubmit: (formValues: Partial<Supervisor>) => void
  nationalOptions?: Option[]
  page: string
  limit: string
}

const userFormValidationSchema = yup.object().shape({
  name: yup.string().required('Bắt buộc'),
})

export const SupervisorForm = (props: SupervisorFormProps) => {
  const { type, initialValues, onSubmit, nationalOptions, page, limit } = props

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
      {({ isSubmitting }) => (
        <Form>
          <Card>
            <CardHeader
              title={`${FormActionLabels[type]} cơ quan giám sát quản lý`}
              sx={{ textTransform: 'capitalize' }}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <FastField name="name" component={InputField} label="Tên cơ quan giám sát quản lý" />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FastField name="abbreviation_name" component={InputField} label="Tên viết tắt" />
                </Grid>
                <Grid item md={6} xs={12}>
                  {/* <FastField name="country" component={InputField} label="Quốc gia" /> */}
                  <Field
                    name="national_name"
                    component={AutoCompleteField}
                    label="Quốc gia"
                    options={nationalOptions}
                    onSelectOption={(option: Option, form: FormikProps<Supervisor>) => {
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

                <Grid item md={12} xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: '500',
                    }}
                  >
                    Giới thiệu bản tiếng việt
                  </Typography>
                  <FastField name="intro_vn" component={QuillEditorField} modules={modules} />
                </Grid>

                <Grid item md={12} xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: '500',
                    }}
                  >
                    Giới thiệu bản tiếng anh
                  </Typography>
                  <FastField name="intro_en" component={QuillEditorField} modules={modules} />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: '500',
                    }}
                  >
                    Logo
                  </Typography>
                  <Field name="logo" component={ImageField} title="Logo cơ quan giám sát quản lý" />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: '500',
                    }}
                  >
                    Icon
                  </Typography>
                  <Field name="icon" component={ImageField} title="Icon cơ quan giám sát quản lý" />
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
                  pathname: '/dashboard/supervisories',
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
