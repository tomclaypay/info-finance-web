import { Box, Dialog, DialogContent, Grid, Stack, Typography } from '@mui/material'
import { FieldProps } from 'formik'
import Image from 'next/image'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import EmblaCarousel from '../dashboard/common/embla-carousel'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { IImageObjectBanner } from '@app/interfaces/banner'
import { reorder } from '@app/utils/common'
import { string } from 'prop-types'

export interface IImageFieldFormBannerProps extends FieldProps {
  label: string
  placeholder: string
  disabled: boolean
  slides?: boolean
  type: string
  setImageObjectUpload?: Dispatch<SetStateAction<IImageObjectBanner[]>>
}

const ImageFieldFormBanner = (props: IImageFieldFormBannerProps) => {
  const { field, label, disabled, setImageObjectUpload } = props
  const { name, value } = field
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const checkFileType = (value: string) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
    const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv']

    const extension = value.split('.').pop().toLowerCase()

    if (imageExtensions.includes(extension)) {
      return 'image'
    } else if (videoExtensions.includes(extension)) {
      return 'video'
    } else {
      return 'unknown'
    }
  }

  const [renderImage, setRenderImage] = useState<IImageObjectBanner[]>(
    value.map((img: string) => ({ url: img, imgType: 'FROM_API', typeFile: checkFileType(img) })) || []
  )
  useEffect(
    () =>
      setRenderImage([
        ...value.map((img: string) => ({ url: img, imgType: 'FROM_API', typeFile: checkFileType(img) })),
      ]),
    [value]
  )

  const handleRemoveImage = (imageObj: IImageObjectBanner) => {
    setRenderImage(renderImage?.filter((oldImage: IImageObjectBanner) => oldImage.url !== imageObj.url))
  }
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return
    const newImageFiles = reorder(renderImage, source.index, destination.index)
    setRenderImage(newImageFiles)
  }

  useEffect(() => {
    if (setImageObjectUpload) setImageObjectUpload(renderImage)
  }, [renderImage, setImageObjectUpload])

  return (
    <Stack
      p={1}
      pt={2}
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{
        position: 'relative',
        // border: '1px solid rgb(0,0,0,1)',
        // borderRadius: '8px',
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
        py={2}
        sx={{
          borderRadius: 1,
          opacity: disabled ? '0.5' : '1',
          border: '1px solid #E6E8F0',
          '&:hover': {
            backgroundColor: disabled ? 'default' : 'action.hover',
          },
        }}
      >
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
              loading="lazy"
              alt="Select file"
              src={'/static/undraw_add_file2_gvbb.svg'}
              layout="fill"
              objectFit="cover"
            />
          </Box>
          <Box>
            <Typography color="textPrimary" variant="h3" textTransform="capitalize">
              {label}
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
            multiple
            type="file"
            id={name}
            onChange={(event) => {
              const files = event.target.files
              console.log('files', files)
              setRenderImage([
                ...renderImage,
                ...Object.values(files ?? {})?.map((file) => ({
                  url: URL.createObjectURL(file),
                  imgType: 'FROM_FILE',
                  file,
                  typeFile: checkFileType(file.name),
                })),
              ])
            }}
            style={{ display: 'none' }}
          />
        )}
      </Stack>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list" direction="horizontal">
          {(providedParent) => (
            <Grid ref={providedParent.innerRef} {...providedParent.droppableProps} container direction="row">
              {renderImage?.length > 0 &&
                renderImage.map((image, index: number) => (
                  <Draggable key={image.url} draggableId={image.url} index={index}>
                    {(provided) => (
                      <Grid
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        item
                        xs={4}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover svg': {
                            display: disabled ? 'none' : 'block',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            borderRadius: '50%',
                          },
                          '&:hover': {
                            opacity: '0.7',
                            borderRadius: '8px',
                          },
                        }}
                        onClick={() => setOpen(true)}
                      >
                        <HighlightOffOutlinedIcon
                          fontSize="large"
                          sx={{
                            position: 'absolute',
                            display: 'none',
                            cursor: 'pointer',
                            color: '#ffffff',
                            zIndex: '2',
                          }}
                          onClick={(e) => {
                            handleRemoveImage(image)
                            e.stopPropagation()
                          }}
                        />
                        <Box
                          sx={{
                            borderRadius: '8px',
                            overflow: 'hidden',
                            position: 'relative',
                            border: '1px solid #E6E8F0',
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
                          {image?.typeFile === 'image' ? (
                            <Image
                              loading="lazy"
                              src={image.url}
                              alt="icon"
                              layout="fill"
                              objectFit="cover"
                              objectPosition="center"
                            />
                          ) : (
                            <span>
                              <video
                                controlsList="nodownload"
                                preload="none"
                                style={{
                                  objectFit: 'cover',
                                  objectPosition: 'center',
                                  borderRadius: '8px',
                                  backgroundColor: 'rgba(0,0,0,0.7)',
                                  cursor: 'pointer',
                                }}
                              >
                                <source src={image.url} type="video/mp4" />
                              </video>
                            </span>
                          )}
                        </Box>
                      </Grid>
                    )}
                  </Draggable>
                ))}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ width: 600 }}>
          <EmblaCarousel internet={false} slides={renderImage} />
        </DialogContent>
      </Dialog>
    </Stack>
  )
}

export default ImageFieldFormBanner
