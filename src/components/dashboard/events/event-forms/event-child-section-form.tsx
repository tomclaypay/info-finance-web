import { OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import useUploadFile from '@app/hooks/use-upload-file'
import { EventChild } from '@app/interfaces/event'
import { FastField, Form, Formik } from 'formik'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import InputField from '../../common/formik-fields/input-field'
import * as yup from 'yup'
import { INPUT_SCHEMA } from '@app/constants/schema'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'

interface ChildSectionInputProps {
  childSection: EventChild[]
  setChildSection: (childSection: EventChild[]) => void
  name: string
  disabled: boolean
}

const eventChildSectionFormValidationSchema = yup.object().shape({
  name: yup.string().required(INPUT_SCHEMA.require),
  description: yup.string().required(INPUT_SCHEMA.require),
})

const initialValuesChildSection = {
  id: '',
  name: '',
  description: '',
}

const EventChildSectionInput = ({ childSection, setChildSection, name, disabled }: ChildSectionInputProps) => {
  const [imageFiles, setImageFile] = useState<any[]>([])
  const [requiredImage, setRequiredImage] = useState(false)

  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.COMPLAINT, type: UPLOAD_TYPE.IMAGE })

  const handleChangeFiles = (e: { target: { files: string | any[] | FileList } }) => {
    if (e.target.files.length > 0) {
      setImageFile([...e.target.files])
      setRequiredImage(false)
    }
  }

  const handleSubmitChildSection = async (
    values: { name: string; description: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    const valueImage = await handleUploadFiles(imageFiles)
    if (valueImage && valueImage?.length > 0) {
      setChildSection([
        ...childSection,
        { id: uuidv4(), name: values.name, description: values.description, images: valueImage },
      ])
      setImageFile([])
      resetForm()
      setRequiredImage(false)
    } else {
      setRequiredImage(true)
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValuesChildSection}
      validationSchema={eventChildSectionFormValidationSchema}
      onSubmit={handleSubmitChildSection}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form>
          <Stack direction="row" alignItems="center">
            <Grid container spacing={2} p={2}>
              <Grid item md={6} xs={12}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                  sx={{
                    borderRadius: 1,
                    opacity: disabled && '0.5',
                    border: '1px solid #E6E8F0',
                    '&:hover svg': {
                      display: 'block',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      borderRadius: '50%',
                    },
                    '&:hover': {
                      opacity: '0.7',
                      borderRadius: '8px',
                    },
                  }}
                >
                  {imageFiles?.length > 0 ? (
                    imageFiles.map((image, index) => (
                      <Box
                        key={index}
                        sx={{
                          borderRadius: '8px',
                          overflow: 'hidden',
                          position: 'relative',
                          width: '100%',
                          paddingTop: '56.25%',
                          '& > span': {
                            position: 'absolute!important',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                          },
                        }}
                      >
                        <HighlightOffOutlinedIcon
                          fontSize="large"
                          sx={{
                            position: 'absolute',
                            display: 'none',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            cursor: 'pointer',
                            color: '#ffffff',
                            zIndex: '2',
                          }}
                          onClick={() => {
                            const indexImage = imageFiles.indexOf(image)
                            if (indexImage > -1) {
                              const newFiles: any = [...imageFiles]
                              newFiles.splice(indexImage, 1)
                              setImageFile([])
                            }
                          }}
                        />
                        <Image
                          src={URL?.createObjectURL(image)}
                          alt="icon"
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          loading="lazy"
                        />
                      </Box>
                    ))
                  ) : (
                    <>
                      <label
                        htmlFor={name}
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '0 10px',
                          cursor: !disabled ? 'pointer' : 'default',
                        }}
                      >
                        <Box sx={{ height: 72, width: 72, position: 'relative' }}>
                          <Image
                            alt="Select file"
                            src={'/static/undraw_add_file2_gvbb.svg'}
                            layout="fill"
                            objectFit="cover"
                            loading="lazy"
                          />
                        </Box>
                        <Box>
                          <Typography color="textPrimary" variant="h3" textTransform="capitalize">
                            Hình ảnh nhà tài trợ
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Typography color="textPrimary" variant="body2">
                              Kéo thả tệp hoặc nhấn để chọn
                            </Typography>
                          </Box>
                        </Box>
                      </label>
                      {disabled ? null : (
                        <input
                          name={name}
                          type="file"
                          id={name}
                          onChange={handleChangeFiles as () => void}
                          style={{ display: 'none' }}
                        />
                      )}
                    </>
                  )}
                </Stack>
                {requiredImage && (
                  <Typography color="#FF1F00" ml={2} mt={0.5} variant="body2" fontSize="0.75rem">
                    Vui lòng tải hình ảnh lên !
                  </Typography>
                )}
              </Grid>

              <Grid item md={6} xs={12}>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <FastField
                      name="name"
                      component={InputField}
                      disabled={disabled}
                      label="Tên nhà tài trợ"
                      sx={{
                        '&>label::after': {
                          content: "'*'",
                          color: 'red',
                        },
                      }}
                    />
                  </Grid>

                  <Grid item md={12} xs={12}>
                    <FastField
                      name="description"
                      disabled={disabled}
                      component={InputField}
                      multiline
                      label="Chi tiết nhà tài trợ"
                      sx={{
                        '&>label::after': {
                          content: "'*'",
                          color: 'red',
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Stack flex={1} direction="row" spacing={2} justifyContent="flex-end">
              <Button
                disabled={isSubmitting || disabled}
                type="button"
                onClick={() => handleSubmit()}
                variant="contained"
                sx={{ textTransform: 'capitalize' }}
              >
                <AddCircleOutlineOutlinedIcon />
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}

export default EventChildSectionInput
