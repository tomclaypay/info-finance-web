import FileFieldForm from '@app/components/form/fileForm'
import { ComplaintLog } from '@app/interfaces/complaint'
import { Button, Card, CardActions, CardContent, Grid } from '@mui/material'
import { FastField, Field, Form, Formik } from 'formik'
import NextLink from 'next/link'
import InputField from '../../common/formik-fields/input-field'

interface ComplaintLogFormProps {
  complaintId?: string
  onSubmit: (log: Partial<ComplaintLog>) => void
}

export default function ComplaintLogForm({ complaintId, onSubmit }: ComplaintLogFormProps) {
  const initialValues: Partial<ComplaintLog> = {
    complaintId: complaintId || '',
    name: '',
    note: '',
    attachments: [],
  }

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FastField name="name" component={InputField} label="Tên" />
                </Grid>
                <Grid item xs={12}>
                  <FastField name="note" component={InputField} label="Ghi chú" multiline minRows={3} />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="attachments"
                    component={FileFieldForm}
                    flexWrap={true}
                    limit={10}
                    label="Tải lên tệp tin"
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
                Tạo
              </Button>
              <NextLink href="/dashboard/complaints" passHref>
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
