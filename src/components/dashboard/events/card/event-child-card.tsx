import { EventChild } from '@app/interfaces/event'
import { Stack, Typography, Box, Button, Grid } from '@mui/material'
import Image from 'next/image'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'

interface ChildSectionItemProps {
  child: EventChild
  childSection: EventChild[]
  setChildSection: (childSection: EventChild[]) => void
  index: number
  label: string
  disabled: boolean
}

const EventChildCard = ({ child, childSection, setChildSection, index, label, disabled }: ChildSectionItemProps) => {
  const handleRemoveChild = (childId?: string) => {
    setChildSection(childSection.filter((child) => child.id !== childId))
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        position: 'relative',
        border: '0.5px solid rgb(0,0,0,1)',
        borderRadius: '8px',
      }}
    >
      <Typography
        fontSize="0.75rem"
        sx={{
          position: 'absolute',
          top: '-11px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '10',
          padding: '0 2px',
          backgroundColor: '#ffffffff',
        }}
      >
        {`${label} ${index + 1} `}
      </Typography>
      <Grid container spacing={2} p={2}>
        <Grid item md={6} xs={12}>
          {child?.images?.length > 0 && (
            <Stack sx={{}}>
              <Box
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
                <Image
                  loading="lazy"
                  src={child.images[0]}
                  alt="icon"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </Box>
              <Box></Box>
            </Stack>
          )}
        </Grid>

        <Grid item md={6} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <Typography
                variant="h3"
                sx={{
                  color: 'text.main',
                  textWrap: 'wrap',
                  WebkitLineClamp: 2,
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  mt: 1,
                }}
              >
                {child.name}
              </Typography>
            </Grid>

            <Grid item md={12} xs={12}>
              <Typography
                dangerouslySetInnerHTML={{
                  __html: child?.description,
                }}
                sx={{
                  textAlign: 'justify',
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 'none',
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Stack flex={1} direction="row" spacing={2} justifyContent="flex-end">
        <Button
          disabled={disabled}
          onClick={() => handleRemoveChild(child.id)}
          variant="contained"
          sx={{ textTransform: 'capitalize' }}
        >
          <RemoveCircleOutlineOutlinedIcon />
        </Button>
      </Stack>
    </Stack>
  )
}

export default EventChildCard
