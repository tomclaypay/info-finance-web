import { watermark } from '@app/constants'
import { OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import { INPUT_SCHEMA } from '@app/constants/schema'
import useUploadFile from '@app/hooks/use-upload-file'
import { DocumentaryEvidence } from '@app/interfaces/documentary-evidence'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { FastField, Form, Formik } from 'formik'
import { toBlob } from 'html-to-image'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as yup from 'yup'
import InputField from '../../common/formik-fields/input-field'

interface LicenseChildSectionFormProps {
  childSection: DocumentaryEvidence[]
  setChildSection: (childSection: DocumentaryEvidence[]) => void
  name: string
}

const eventChildSectionFormValidationSchema = yup.object().shape({
  title: yup.string().required(INPUT_SCHEMA.require),
})

const initialValuesChildSection = {
  id: '',
  title: '',
}

const LicenseChildSectionForm = ({ childSection, setChildSection, name }: LicenseChildSectionFormProps) => {
  const [imageFiles, setImageFile] = useState('')
  const [requiredImage, setRequiredImage] = useState(false)

  const imgRef = useRef(null)

  const { handleUploadFiles } = useUploadFile({ objectType: OBJECT_TYPE.COMPLAINT, type: UPLOAD_TYPE.IMAGE })

  const handleChangeFiles = async (e: { target: { files: string | any[] | FileList } }) => {
    if (e.target.files.length > 0) {
      setRequiredImage(false)
      const valueImage = await handleUploadFiles([...e.target.files])
      setImageFile(valueImage?.[0] as string)
    }
  }

  const handleHtmlToFile = async () => {
    if (imgRef.current === null) {
      return
    }
    return await toBlob(imgRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const fileImg = new File([dataUrl as Blob], 'convert-img')
        return fileImg
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSubmitChildSection = async (values: { title: string }, { resetForm }: { resetForm: () => void }) => {
    // const newImg = await handleHtmlToFile()
    // const valueImage = await handleUploadFiles([newImg as File])
    // if (valueImage && valueImage?.length > 0) {
    //   setChildSection([...childSection, { id: uuidv4(), title: values.title, file: valueImage?.[0] }])
    //   setImageFile('')
    //   resetForm()
    //   setRequiredImage(false)
    // } else {
    //   setRequiredImage(true)
    // }

    // const newImg = await handleHtmlToFile()
    // const valueImage = await handleUploadFiles([newImg as File])
    if (imageFiles && imageFiles?.length > 0) {
      setChildSection([...childSection, { id: uuidv4(), title: values.title, file: imageFiles }])
      setImageFile('')
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
            <Grid container>
              <Grid item md={6} xs={12}>
                <FastField
                  name="title"
                  component={InputField}
                  label="Tiêu đề"
                  sx={{
                    '&>label::after': {
                      content: "'*'",
                      color: 'red',
                    },
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <label
                  htmlFor={name}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0 10px',
                    cursor: 'pointer',
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
                      Hình ảnh minh chứng
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography color="textPrimary" variant="body2">
                        Kéo thả tệp hoặc nhấn để chọn
                      </Typography>
                    </Box>
                  </Box>
                </label>
                <input
                  name={name}
                  type="file"
                  accept="image/*"
                  id={name}
                  onChange={handleChangeFiles as unknown as () => void}
                  style={{ display: 'none' }}
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
                sx={{
                  borderRadius: 1,
                  border: '1px solid #E6E8F0',
                }}
              >
                {imageFiles && (
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                    ref={imgRef}
                    sx={{
                      cursor: 'pointer',
                      position: 'relative',
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
                    <Box
                      sx={{
                        overflow: 'hidden',
                        position: 'relative',
                        width: 'max-content',
                        // paddingTop: '50.25%',
                        '& > span': {
                          position: 'absolute!important',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                        },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
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
                          setImageFile('')
                        }}
                      />
                      <img src={imageFiles} alt="icon" width="100%" height="100%" />
                      {/* <Image src={imageFiles} alt="icon" layout="fill" objectFit="contain" objectPosition="center" /> */}
                    </Box>
                    <Grid
                      container
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        opacity: '0.3',
                      }}
                    >
                      {watermark.map((img, index) => (
                        <Grid
                          item
                          key={index}
                          xs={4}
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            transform: 'rotate(-20deg)',
                          }}
                        >
                          <Image src={img} height="40px" width="90px" alt="icon" loading="lazy" />
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>
                )}

                {/* {imageFiles !== '' ? (
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                    sx={{
                      cursor: 'pointer',
                      position: 'relative',
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
                    <Box
                      sx={{
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
                        // onClick={() => {
                        //   const indexImage = imageFiles.indexOf(image)
                        //   if (indexImage > -1) {
                        //     const newFiles: any = [...imageFiles]
                        //     newFiles.splice(indexImage, 1)
                        //     setImageFile([])
                        //   }
                        // }}
                        onClick={() => {
                          setImageFile('')
                          setImageWatermark('')
                        }}
                      />
                      <Image src={imageFiles} alt="icon" layout="fill" objectFit="contain" objectPosition="center" />
                    </Box>
                    <Grid
                      container
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        opacity: '0.3',
                      }}
                    >
                      {watermark.map((img, index) => (
                        <Grid
                          item
                          key={index}
                          xs={4}
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            transform: 'rotate(-20deg)',
                          }}
                        >
                          <Image src={img} height="40px" width="90px" alt="icon" />
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>
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
                        cursor: 'pointer',
                      }}
                    >
                      <Box sx={{ height: 72, width: 72, position: 'relative' }}>
                        <Image
                          alt="Select file"
                          src={'/static/undraw_add_file2_gvbb.svg'}
                          layout="fill"
                          objectFit="cover"
                        />
                      </Box>
                      <Box>
                        <Typography color="textPrimary" variant="h3" textTransform="capitalize">
                          Hình ảnh minh chứng
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Typography color="textPrimary" variant="body2">
                            Kéo thả tệp hoặc nhấn để chọn
                          </Typography>
                        </Box>
                      </Box>
                    </label>
                    <input
                      name={name}
                      type="file"
                      accept="image/*"
                      id={name}
                      onChange={handleChangeFiles as unknown as () => void}
                      style={{ display: 'none' }}
                    />
                  </>
                )} */}
                {requiredImage && (
                  <Typography color="#FF1F00" ml={2} mt={0.5} variant="body2" fontSize="0.75rem">
                    Vui lòng tải hình ảnh lên !
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Stack flex={1} direction="row" spacing={2} justifyContent="flex-end">
              <Button
                disabled={isSubmitting}
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

export default LicenseChildSectionForm
