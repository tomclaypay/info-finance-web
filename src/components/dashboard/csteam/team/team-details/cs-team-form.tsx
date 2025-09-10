import { FormActionLabels, FormActions } from '@app/constants/common'
import { CsMember } from '@app/interfaces/cs-member'
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  TextField,
} from '@mui/material'
import { FastField, Form, Formik } from 'formik'
import NextLink from 'next/link'
import * as yup from 'yup'
import InputField from '../../../common/formik-fields/input-field'

interface CsTeamFormProps {
  type: FormActions
  initialValues: any
  onSubmit: (formValues: any) => void
  csMemberOptions?: CsMember[]
  page: string
  limit: string
}

const userFormValidationSchema = yup.object().shape({
  name: yup.string().required('Bắt buộc'),
})

export const CsTeamForm = (props: CsTeamFormProps) => {
  const { type, initialValues, onSubmit, csMemberOptions, page, limit } = props

  const leaderOptions = csMemberOptions
    ?.filter((member) => member.user.role === 'leader')
    .concat(initialValues.csLeader)

  const memberOptions = csMemberOptions
    ?.filter((member) => member.user.role === 'member')
    .concat(initialValues.csMembers)

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
            <CardHeader title={`${FormActionLabels[type]} Cs Team`} sx={{ textTransform: 'capitalize' }} />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <FastField name="name" component={InputField} label="Tên team " />
                </Grid>
                {/* <Grid item md={6} xs={12}>
                  <FastField
                    name="description"
                    component={InputField}
                    label="Mô tả team "
                    sx={{
                      '&>label::after': {
                        content: "'*'",
                        color: 'red',
                      },
                    }}
                  />
                </Grid> */}
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    // multiple
                    id="tags-outlined"
                    options={leaderOptions || []}
                    getOptionLabel={(item: any) => item?.user?.displayName || ''}
                    filterSelectedOptions
                    value={values.csLeader}
                    renderInput={(params) => <TextField {...params} label="Leader" />}
                    onChange={(event, newValue) => {
                      setFieldValue('csLeader', newValue)
                    }}
                    // renderTags={(tagValue, getTagProps) =>
                    //   tagValue.map((option, index) => {
                    //     console.log({ option })
                    //     return (
                    //       <Chip
                    //         key={index}
                    //         sx={{
                    //           cursor: 'pointer',
                    //         }}
                    //         label={option.name}
                    //         {...getTagProps({ index })}
                    //         // onClick={() => navigate(`/lesson/${option.id}/edit`)}
                    //       />
                    //     )
                    //   })
                    // }
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={memberOptions || []}
                    getOptionLabel={(item: any) => item?.user?.displayName || ''}
                    filterSelectedOptions
                    value={values.csMembers}
                    renderInput={(params) => <TextField {...params} label="Members" />}
                    onChange={(event, newValue) => {
                      setFieldValue('csMembers', newValue)
                    }}
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Chip
                          sx={{
                            cursor: 'pointer',
                          }}
                          label={option.user.displayName}
                          {...getTagProps({ index })}
                          // onClick={() => navigate(`/lesson/${option.id}/edit`)}
                          key={option.id}
                        />
                      ))
                    }
                  />
                </Grid>

                {/* <Grid item md={6} xs={12}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={csMemberOptions || []}
                    getOptionLabel={(item: any) => item?.name}
                    filterSelectedOptions
                    value={csMembers}
                    renderInput={(params) => <TextField {...params} label="Leader" />}
                    onChange={(event, newValue) => {
                      console.log({ event, newValue })
                      setLessons(newValue)
                    }}
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Chip
                          sx={{
                            cursor: 'pointer',
                          }}
                          key={index}
                          label={option.name}
                          {...getTagProps({ index })}
                          onClick={() => navigate(`/lesson/${option.id}/edit`)}
                        />
                      ))
                    }
                  />
                </Grid> */}
              </Grid>
            </CardContent>
            <CardActions
              sx={{
                flexWrap: 'wrap',
                m: -1,
              }}
            >
              <Button
                // disabled={isSubmitting}
                type="submit"
                variant="contained"
                sx={{ m: 1, textTransform: 'capitalize' }}
              >
                {FormActionLabels[type]}
              </Button>
              <NextLink
                href={{
                  pathname: '/dashboard/csteam/teams',
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
