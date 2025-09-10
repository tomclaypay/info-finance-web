import { FormActionLabels, FormActions } from '@app/constants/common'
import { INPUT_SCHEMA, REGEX } from '@app/constants/schema'
import { CsMember } from '@app/interfaces/cs-member'
import { User } from '@app/interfaces/user'
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid } from '@mui/material'
import { FastField, Field, Form, Formik } from 'formik'
import NextLink from 'next/link'
import * as yup from 'yup'
import AutoCompleteRoleField from '../../../common/formik-fields/auto-complete-role-field'
import InputField from '../../../common/formik-fields/input-field'

interface CsMemberFormProps {
  type: FormActions
  leader?: CsMember
  initialValues: Partial<User>
  onSubmit: (formValues: Partial<User>) => void
  page: string
  limit: string
}

export const CsMemberForm = (props: CsMemberFormProps) => {
  const { type, initialValues, onSubmit, leader, page, limit } = props
  const userFormValidationSchema = yup.object().shape({
    email: yup.string().email('Sai định dạng email').required('Vui lòng nhập trường này!'),
    password:
      type === FormActions.CREATE
        ? yup.string().matches(REGEX.MEMBERPASSWORD, INPUT_SCHEMA.memberPassword).required('Vui lòng nhập trường này!')
        : yup.string(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Nhập lại mật khẩu không đúng'),
    displayName: yup.string().required('Vui lòng nhập trường này!'),
    role: yup.string().required('Vui lòng nhập trường này!'),
  })
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
            <CardHeader title={`${FormActionLabels[type]} CS Member`} sx={{ textTransform: 'capitalize' }} />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <FastField
                    name="email"
                    component={InputField}
                    label="Email "
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
                    name="password"
                    component={InputField}
                    disabled={type === FormActions.UPDATE ? true : false}
                    type="password"
                    label="Mật khẩu "
                    sx={{
                      '&>label::after': {
                        content: "'*'",
                        color: 'red',
                      },
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FastField name="phone" component={InputField} label="Số điện thoại " />
                </Grid>
                {type === FormActions.CREATE && (
                  <Grid item md={6} xs={12}>
                    <FastField
                      name="confirmPassword"
                      type="password"
                      component={InputField}
                      label="Xác nhận lại mật khẩu "
                      sx={{
                        '&>label::after': {
                          content: "'*'",
                          color: 'red',
                        },
                      }}
                    />
                  </Grid>
                )}
                <Grid item md={6} xs={12}>
                  <FastField
                    name="displayName"
                    component={InputField}
                    label="Tên hiển thị "
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
                    name="role"
                    leader={leader}
                    component={AutoCompleteRoleField}
                    options={['member', 'leader']}
                    label="Chức vụ "
                    sx={{
                      '&>label::after': {
                        content: "'*'",
                        color: 'red',
                      },
                    }}
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
                  pathname: '/dashboard/csteam/members',
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
