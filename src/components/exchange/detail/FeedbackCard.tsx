import { Feedback } from '@app/interfaces/feedback'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-initials-sprites'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Popover, Rating, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useState } from 'react'

interface FeedbackCardProps {
  data: Feedback
  edit?: boolean
  handleOpenComment?: () => void
  handleDeleteCommentSubmit?: (feedbackId: string) => void
}
const FeedbackCard = ({ data, edit, handleOpenComment, handleDeleteCommentSubmit }: FeedbackCardProps) => {
  const userDataType = data?.seeder ? data?.seeder : data?.user
  const defaultAvatar = createAvatar(style, {
    seed: userDataType ? userDataType?.displayName || userDataType?.fullname : '',
    dataUri: true,
  })

  const { t } = useTranslation(['exchange', 'common'])

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  return (
    <Stack direction="row">
      <Stack sx={{ justifyContent: 'space-between', pr: 3, width: '100%' }}>
        <Stack spacing={1}>
          <Stack alignItems="center" direction="row" spacing={1}>
            <Stack>
              <Image
                src={userDataType?.avatar || defaultAvatar}
                style={{ borderRadius: 40 }}
                alt="image of user"
                width="40px"
                height="40px"
                loading="lazy"
              />
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'space-between', flex: '1', alignItems: 'center' }}>
              <Stack sx={{ flex: '1' }}>
                <Typography>
                  {userDataType?.displayName ? userDataType?.displayName : userDataType?.fullname}
                </Typography>
                <Rating precision={0.5} name="simple-controlled" value={data.point / 2} readOnly />
              </Stack>
              <Typography variant="body2" sx={{ color: 'subtitle.main' }}>
                {format(new Date(data.created_at), 'dd/MM/yyyy')}
              </Typography>
            </Stack>
            {edit && handleOpenComment && handleDeleteCommentSubmit && (
              <>
                <Stack
                  px={0.5}
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={(event: any) => setAnchorEl(event.currentTarget)}
                >
                  <MoreVertIcon />
                </Stack>
                <Popover
                  open={!!anchorEl}
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{
                    vertical: 30,
                    horizontal: -100,
                  }}
                >
                  <Typography
                    textAlign="center"
                    variant="body2"
                    px={2}
                    py={1}
                    sx={{
                      cursor: 'pointer',
                      color: 'primary.main',
                      fontWeight: '500',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                      },
                    }}
                    onClick={() => {
                      setAnchorEl(null)
                      handleOpenComment()
                    }}
                  >
                    {t('comment.edit')}
                  </Typography>
                  <Typography
                    textAlign="center"
                    variant="body2"
                    px={2}
                    py={1}
                    sx={{
                      cursor: 'pointer',
                      color: 'primary.main',
                      fontWeight: '500',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                      },
                    }}
                    onClick={() => handleDeleteCommentSubmit(data.id as string)}
                  >
                    {t('comment.delete')}
                  </Typography>
                </Popover>
              </>
            )}
          </Stack>

          <Stack>
            {data.comment && (
              <Typography
                dangerouslySetInnerHTML={{
                  __html: data.comment,
                }}
                sx={{
                  textAlign: 'justify',
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 10,
                }}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default FeedbackCard
