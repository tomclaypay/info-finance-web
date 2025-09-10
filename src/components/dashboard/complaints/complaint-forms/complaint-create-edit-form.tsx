import ImageFieldForm from '@app/components/form/imageForm'
import { FormActionLabels, FormActions } from '@app/constants/common'
import { INPUT_SCHEMA, REGEX } from '@app/constants/schema'
import { useAuth } from '@app/hooks/use-auth'
import { Option, UserOption } from '@app/interfaces/common'
import { Complaint } from '@app/interfaces/complaint'
import { CsMember } from '@app/interfaces/cs-member'
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik'
import NextLink from 'next/link'
import { useMemo } from 'react'
import * as yup from 'yup'
import AutoCompleteField from '../../common/formik-fields/auto-complete-field'
import InputField from '../../common/formik-fields/input-field'
import QuillEditorField from '../../common/formik-fields/quill-editor-field'
import SelectField from '../../common/formik-fields/select-field'
import { convertNameToSlug } from '@app/utils/common'

interface ComplaintFormProps {
  type: FormActions
  initialValues: Partial<Complaint>
  exchangeOptions?: Option[]
  categoryOptions?: Option[]
  userOptions?: UserOption[]
  disabled?: boolean
  onSubmit: (formValues: Partial<Complaint>) => void
  dataCsHandleByOptions?: CsMember[]
  handler?: boolean
  handleChangeFiles?: (event: any, type: string, name: string) => void
  imageFiles?: { images: any[] }
  page: string
  limit: string
}

const complaintFormValidationSchema = yup.object().shape({
  title: yup.string().required(INPUT_SCHEMA.require),
  email: yup.string().email('Sai định dạng địa chỉ email').required(INPUT_SCHEMA.require),
  exchangeId: yup.string().required(INPUT_SCHEMA.require),
  phone: yup.string().matches(REGEX.PHONE, INPUT_SCHEMA.phoneMalformed).required(INPUT_SCHEMA.require),
})

export const ComplaintForm = (props: ComplaintFormProps) => {
  const {
    type,
    initialValues,
    exchangeOptions,
    categoryOptions,
    userOptions,
    disabled,
    onSubmit,
    dataCsHandleByOptions,
    handler,
    handleChangeFiles,
    imageFiles,
    page,
    limit,
  } = props
  const auth = useAuth()
  // const { files, thumbnailUrls, setFiles, setThumnailUrls, handleFileChange } = useContext(UploadFileContext)

  const handleSelectFullName = (option: UserOption, form: FormikProps<Complaint>) => {
    form.setFieldValue('userId', option?.value || '')
    form.setFieldValue('email', option?.email || '')
    form.setFieldValue('phone', option?.phone || '')
  }

  const handleSelectExchange = (option: Option, form: FormikProps<Complaint>) => {
    form.setFieldValue('exchangeId', option?.value || '')
  }

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
      validationSchema={complaintFormValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => {
        const newDataCsHandleByOptions = dataCsHandleByOptions?.filter((item) => item.id !== values?.handle_by?.id)
        const disableCondition = disabled || (auth?.user?.role === 'leader' && !handler && type === FormActions.UPDATE)
        return (
          <Form>
            <Card>
              <CardHeader title={`${FormActionLabels[type]} khiếu nại`} sx={{ textTransform: 'capitalize' }} />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <Field
                      name="title"
                      component={InputField}
                      label="Tên đơn khiếu nại"
                      disabled={disableCondition}
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
                      name="fullname"
                      component={AutoCompleteField}
                      label="Tên người khiếu nại"
                      options={userOptions}
                      onSelectOption={handleSelectFullName}
                      disabled={disableCondition}
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
                      name="complaintCategoryId"
                      component={SelectField}
                      label="Loại khiếu nại"
                      options={categoryOptions}
                      disabled={disableCondition}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Field
                      name="email"
                      component={InputField}
                      label="Email"
                      sx={{
                        '&>label::after': {
                          content: "'*'",
                          color: 'red',
                        },
                      }}
                      disabled={disableCondition}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    {/* <Field
                      name="exchangeId"
                      component={SelectField}
                      label="Tên sàn giao dịch"
                      options={exchangeOptions}
                      disabled={disableCondition}
                    /> */}
                    <Field
                      name="exchangeName"
                      component={AutoCompleteField}
                      label="Tên sàn giao dịch"
                      options={exchangeOptions}
                      onSelectOption={handleSelectExchange}
                      disabled={disableCondition}
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
                      name="phone"
                      component={InputField}
                      label="Số điện thoại"
                      sx={{
                        '&>label::after': {
                          content: "'*'",
                          color: 'red',
                        },
                      }}
                      disabled={disableCondition}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Field
                      name="website"
                      component={InputField}
                      label="Website"
                      disabled={disableCondition}
                      sx={{ mb: 3 }}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <Autocomplete
                      // multiple
                      id="tags-outlined"
                      disabled={disabled || auth?.user?.role === 'member'}
                      options={newDataCsHandleByOptions || []}
                      getOptionLabel={(item: any) => {
                        return item?.user?.displayName && item?.cs_team?.name
                          ? `${item?.user?.displayName} - ${item?.cs_team?.name}`
                          : ''
                      }}
                      filterSelectedOptions
                      value={values.handle_by}
                      renderInput={(params) => {
                        return <TextField {...params} label="Tên người xử lý" />
                      }}
                      onChange={(event, newValue) => {
                        setFieldValue('handle_by', newValue)
                      }}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <Field
                      name="images"
                      disabled={disableCondition}
                      slides={true}
                      label="Hình ảnh"
                      imageFiles={imageFiles}
                      handleChangeFiles={handleChangeFiles}
                      component={ImageFieldForm}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Field
                      name="slug"
                      onBlur={() => setFieldValue('slug', convertNameToSlug(values.slug ?? ''))}
                      component={InputField}
                      label="Slug"
                    />
                    <Stack>
                      <Stack direction="row" alignItems="center">
                        <Switch
                          checked={!values.hidden}
                          onChange={() => {
                            setFieldValue('hidden', !values.hidden)
                          }}
                        />
                        <Typography>Hiển thị khiếu nại</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center">
                        <Switch
                          checked={values.highlight_on_broker}
                          onChange={() => {
                            setFieldValue('highlight_on_broker', !values.highlight_on_broker)
                          }}
                        />
                        <Typography>Nổi bật trên trang sàn</Typography>
                      </Stack>
                    </Stack>
                  </Grid>

                  <Grid item md={12} xs={12}>
                    <Field
                      name="description"
                      disabled={disableCondition}
                      component={QuillEditorField}
                      modules={modules}
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
                  disabled={isSubmitting || disabled}
                  type="submit"
                  variant="contained"
                  sx={{ m: 1, textTransform: 'capitalize' }}
                >
                  {FormActionLabels[type]}
                </Button>
                <NextLink
                  href={{
                    pathname: '/dashboard/complaints',
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
        )
      }}
    </Formik>
  )
}
