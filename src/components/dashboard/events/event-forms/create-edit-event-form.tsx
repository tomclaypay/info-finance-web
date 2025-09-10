import { useMutation } from '@apollo/client'
import ImageFieldForm from '@app/components/form/imageForm'
import VideoFieldForm from '@app/components/form/videoForm'
import { FormActionLabels, FormActions, OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import { INPUT_SCHEMA } from '@app/constants/schema'
import useUploadFile from '@app/hooks/use-upload-file'
import { Event } from '@app/interfaces/event'
import DELETE_EVENT from '@app/operations/mutations/events/delete-event'
import { Delete as DeleteIcon } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { FastField, Field, Form, Formik } from 'formik'
import dynamic from 'next/dynamic'
import { useMemo, useRef, useState, forwardRef } from 'react'
import toast from 'react-hot-toast'
import 'react-quill/dist/quill.snow.css'
import * as yup from 'yup'
import DatePickerField from '../../common/formik-fields/date-picker-field'
import InputField from '../../common/formik-fields/input-field'
import CreateEditEventChildSection from '../section/create-edit-event-child-section'

interface CreateEditEventFormProps {
  type: FormActions
  event?: Event
  initialValues: Event
  onClose: () => void
  disabled?: boolean
  onSubmit: (formValues: Event) => void
  refetchDataEvents: () => void
  handleChangeFiles: (event: any, type: string, name: string) => void
  imageFiles: { images: any[]; images_event_end: any[] }
  video: any
  handleDropVideo: (event: any) => void
  handleRemoveVideo: () => void
}

// const Quill = dynamic(
//   async () => {
//     const { default: RQ } = await import('react-quill')

//     // eslint-disable-next-line react/display-name
//     return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />
//   },
//   {
//     ssr: false,
//   }
// )

const Quill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    // Trả về component có forwardRef để dùng ref bình thường
    return forwardRef<any, any>((props, ref) => <RQ ref={ref} {...props} />)
  },
  { ssr: false, loading: () => null }
)

const QuillEditorRoot = styled(Quill)(({ theme }) => ({
  border: 1,
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  borderStyle: 'solid',
  display: 'flex',
  flexDirection: 'column',
  '& .ql-snow.ql-toolbar': {
    borderColor: theme.palette.divider,
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    '& .ql-picker-label:hover': {
      color: theme.palette.primary.main,
    },
    '& .ql-picker-label.ql-active': {
      color: theme.palette.primary.main,
    },
    '& .ql-picker-item:hover': {
      color: theme.palette.primary.main,
    },
    '& .ql-picker-item.ql-selected': {
      color: theme.palette.primary.main,
    },
    '& button:hover': {
      color: theme.palette.primary.main,
      '& .ql-stroke': {
        stroke: theme.palette.primary.main,
      },
    },
    '& button:focus': {
      color: theme.palette.primary.main,
      '& .ql-stroke': {
        stroke: theme.palette.primary.main,
      },
    },
    '& button.ql-active': {
      '& .ql-stroke': {
        stroke: theme.palette.primary.main,
      },
    },
    '& .ql-stroke': {
      stroke: theme.palette.text.primary,
    },
    '& .ql-picker': {
      color: theme.palette.text.primary,
    },
    '& .ql-picker-options': {
      backgroundColor: theme.palette.background.paper,
      border: 'none',
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[10],
      padding: theme.spacing(2),
    },
  },
  '& .ql-snow.ql-container': {
    borderBottom: 'none',
    borderColor: theme.palette.divider,
    borderLeft: 'none',
    borderRight: 'none',
    flexGrow: 1,
    overflow: 'hidden',
    '& .ql-editor': {
      color: theme.palette.text.primary,
      minHeight: '280px !important',
      fontFamily: theme.typography.body1.fontFamily,
      fontSize: theme.typography.body1.fontSize,
      padding: theme.spacing(2),
      '&.ql-blank::before': {
        color: theme.palette.text.secondary,
        fontStyle: 'normal',
        left: theme.spacing(2),
      },
    },
  },
}))

const eventFormValidationSchema = yup.object().shape({
  title: yup.string().required(INPUT_SCHEMA.require),
  location: yup.string().required(INPUT_SCHEMA.require),
  start: yup.string().required(INPUT_SCHEMA.require),
  end: yup.string().required(INPUT_SCHEMA.require),
  fake_participant_num: yup.number().required(INPUT_SCHEMA.require),
})

export const CreateEditEventForm = (props: CreateEditEventFormProps) => {
  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.EVENT, type: UPLOAD_TYPE.IMAGE })

  const {
    type,
    initialValues,
    disabled,
    onSubmit,
    video,
    handleDropVideo,
    handleRemoveVideo,
    imageFiles,
    handleChangeFiles,
    event,
    onClose,
    refetchDataEvents,
  } = props

  const [deleteEvent] = useMutation(DELETE_EVENT)
  const handleDeleteEvent = async () => {
    await deleteEvent({
      variables: {
        id: event && event.id,
      },
    })
    refetchDataEvents()
    setOpenPopupVerify(false)
    onClose()
    toast.success('Xoá sự kiện thành công')
  }
  const [openPopupVerify, setOpenPopupVerify] = useState(false)

  const editorRef = useRef<any>(null)

  const insertToEditor = (url: string) => {
    // if (editorRef.current) {
    const count = editorRef.current?.getEditor().getSelection().index
    editorRef.current?.getEditor().insertEmbed(count, 'image', url)
    // }
  }

  const saveToServer = async (file: any) => {
    const images = await handleUploadFiles([file])
    if (images?.[0]) {
      insertToEditor(images?.[0])
    }
  }

  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = () => {
      if (input?.files?.[0]) {
        const file = input.files[0]
        if (/^image\//.test(file.type)) {
          saveToServer(file)
        } else {
          console.warn('You could only upload images.')
        }
      }
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
          ['image'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  )

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={eventFormValidationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <Grid container spacing={2} p={2}>
              <Grid item md={12} xs={12}>
                <Typography align="center" gutterBottom variant="h5">
                  {event !== undefined ? 'Chỉnh sửa sự kiện' : 'Tạo sự kiện'}
                </Typography>
              </Grid>

              <Grid item md={6} xs={12}>
                <FastField
                  name="title"
                  component={InputField}
                  label="Tên sự kiện"
                  disabled={disabled}
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
                  name="location"
                  component={InputField}
                  label="Địa điểm diễn ra"
                  disabled={disabled}
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
                  name="fake_participant_num"
                  component={InputField}
                  label="Số người tham gia (ảo)"
                  disabled={disabled}
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
                  name="participant_num"
                  component={InputField}
                  label="Số người tham gia (thực)"
                  disabled={true}
                  sx={{
                    '&>label::after': {
                      content: "'*'",
                      color: 'red',
                    },
                  }}
                />
              </Grid>

              {/* <Grid item md={12} xs={12}>
                <Field name="description" disabled={disabled} component={QuillEditorField} />
              </Grid> */}

              <Grid item md={12} xs={12}>
                <QuillEditorRoot
                  modules={modules}
                  ref={editorRef}
                  value={values.description}
                  onChange={(value: any) => setFieldValue('description', value)}
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <Box
                  sx={{
                    border: '1px solid rgb(0,0,0,1)',
                    borderRadius: '8px',
                  }}
                >
                  <Field
                    name="images"
                    disabled={disabled}
                    label="Banner 1 ngang - 1 dọc"
                    imageFiles={imageFiles}
                    handleChangeFiles={handleChangeFiles}
                    component={ImageFieldForm}
                  />
                </Box>
              </Grid>

              <Grid item md={6} xs={12}>
                <Field
                  name="start"
                  component={DatePickerField}
                  label="Ngày bắt đầu"
                  disabled={disabled}
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
                  name="end"
                  component={DatePickerField}
                  label="Ngày kết thúc"
                  disabled={disabled}
                  sx={{
                    '&>label::after': {
                      content: "'*'",
                      color: 'red',
                    },
                  }}
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <Field
                  name="event_sponsors"
                  disabled={disabled}
                  label="Nhà tài trợ"
                  component={CreateEditEventChildSection}
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <Field
                  name="event_organizers"
                  disabled={disabled}
                  label="Ban tổ chức"
                  component={CreateEditEventChildSection}
                />
              </Grid>

              {new Date(event?.end) < new Date() && (
                <>
                  {' '}
                  <Grid item md={12} xs={12}>
                    <Box
                      sx={{
                        border: '1px solid rgb(0,0,0,1)',
                        borderRadius: '8px',
                      }}
                    >
                      <Field
                        name="images_event_end"
                        disabled={disabled}
                        label="Hình ảnh trong sự kiện"
                        imageFiles={imageFiles}
                        handleChangeFiles={handleChangeFiles}
                        component={ImageFieldForm}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Box
                      sx={{
                        border: '1px solid rgb(0,0,0,1)',
                        borderRadius: '8px',
                      }}
                    >
                      <Field
                        name="video_url"
                        disabled={disabled}
                        label="Video trong sự kiện"
                        component={VideoFieldForm}
                        isSubmitting={isSubmitting}
                        video={video}
                        handleDropVideo={handleDropVideo}
                        handleRemoveVideo={handleRemoveVideo}
                      />
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>

            <Divider />
            <Stack direction="row" p={2}>
              {event && !disabled && (
                <IconButton onClick={() => setOpenPopupVerify(true)}>
                  <DeleteIcon fontSize="large" />
                </IconButton>
              )}
              <Stack flex={1} direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  disabled={isSubmitting || disabled}
                  type="submit"
                  variant="contained"
                  sx={{ textTransform: 'capitalize' }}
                >
                  {FormActionLabels[type]}
                </Button>
                <Button disabled={isSubmitting} variant="outlined" onClick={onClose}>
                  Đóng
                </Button>
              </Stack>
            </Stack>
            <Dialog maxWidth="lg" open={openPopupVerify}>
              <DialogTitle>Bạn thật sự muốn xoá sự kiện này không</DialogTitle>
              <DialogActions>
                <Stack flex={1} direction="row" spacing={2} justifyContent="space-between">
                  <Button
                    disabled={isSubmitting || disabled}
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ textTransform: 'capitalize' }}
                    onClick={handleDeleteEvent}
                  >
                    Xác nhận
                  </Button>
                  <Button
                    disabled={isSubmitting || disabled}
                    variant="outlined"
                    fullWidth
                    onClick={() => setOpenPopupVerify(false)}
                  >
                    Đóng
                  </Button>
                </Stack>
              </DialogActions>
            </Dialog>
          </Form>
        )}
      </Formik>
    </>
  )
}
