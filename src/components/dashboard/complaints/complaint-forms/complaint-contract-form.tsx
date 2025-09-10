import FileFieldForm from '@app/components/form/fileForm'
import { OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import { ComplaintContext } from '@app/contexts/complaint-context'
import useUploadFile from '@app/hooks/use-upload-file'
import { Button, Card, CardActions, CardContent, Grid } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import NextLink from 'next/link'
import { useContext } from 'react'

interface ComplaintContractFormProps {
  complaintId: string
  handleClose: () => void
}

export const ComplaintContractForm = ({ complaintId, handleClose }: ComplaintContractFormProps) => {
  const { onUploadContract } = useContext(ComplaintContext)
  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.COMPLAINT, type: UPLOAD_TYPE.DOCUMENT })

  const handleUploadContract = async (formValues: any) => {
    try {
      const files = await handleUploadFiles(formValues.files)
      onUploadContract({
        complaintId,
        files,
      })
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik enableReinitialize initialValues={{ files: [] }} onSubmit={handleUploadContract}>
      {({ isSubmitting }) => (
        <Form>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={12}>
                  <Field name="files" component={FileFieldForm} limit={5} label="Tải lên tệp tin" />
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
                Tải lên
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
                  onClick={handleClose}
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
