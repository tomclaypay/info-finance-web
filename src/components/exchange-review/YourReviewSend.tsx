import { useQuery } from '@apollo/client'
import {
  CANCEL_REQUEST_STATUS,
  CANCEL_REQUEST_STATUS_BACKGROUND_COLOR,
  CANCEL_REQUEST_STATUS_COLOR,
  CANCEL_REQUEST_STATUS_LABEL,
  COMPLAINT_STATUS,
  COMPLAINT_STATUS_BACKGROUND_COLOR,
  COMPLAINT_STATUS_COLOR,
  COMPLAINT_STATUS_LABEL,
} from '@app/constants/userComplaint'
import { AuthContext } from '@app/contexts/amplify-context'
import GET_COMPLAINTS_BY_USER from '@app/operations/queries/complaints/get-complaints-by-user'
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

const YourReviewSend = () => {
  const { locale } = useRouter()
  const value = useContext(AuthContext)
  const { loading, data } = useQuery(GET_COMPLAINTS_BY_USER, {
    variables: {
      id: value?.user?.id,
      limit: 100,
    },
  })

  return (
    <Grid container spacing={1} sx={{}}>
      {loading && (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      )}
      {data &&
        data.complaints.map((item: any) => (
          <Grid key={item.id} item xs={12}>
            <NextLink
              href={`/${locale === 'vi' ? 'danh-gia-san/danh-gia-cua-ban' : 'exchange-review/your-review'}/${item.id}`}
              passHref
            >
              <Stack
                direction="row"
                sx={{ backgroundColor: '#FFFFFF', py: 2, px: 3, alignItems: 'center', cursor: 'pointer' }}
              >
                <Typography sx={{ flex: '1', textAlign: 'start' }}>
                  {format(new Date(item.createdAt), 'dd/MM/yyyy')}
                </Typography>
                <Typography
                  sx={{
                    flex: '3',
                    textAlign: 'center',
                    WebkitLineClamp: 2,
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography sx={{ flex: '2', textAlign: 'center' }}>{item.category.name}</Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ flex: '1.5', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                  {item.exchange?.logo && (
                    <Box
                      sx={{
                        border: '0.5px solid #d0d0d0',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        height: '48px',
                        width: '64px',
                        position: 'relative',
                      }}
                    >
                      <Image
                        src={item.exchange?.logo}
                        alt="logo sàn"
                        layout="fill"
                        objectFit="contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
                        loading="lazy"
                      />
                    </Box>
                  )}
                  <Typography sx={{ fontWeight: '600' }}>{item.exchange.name}</Typography>
                </Stack>
                <Stack
                  sx={{
                    flex: '2',
                    alignItems: 'flex-end',
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: 'center',
                      width: 'max-content',
                      py: 1,
                      px: 2,
                      borderRadius: '17px',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      backgroundColor:
                        (item.cancelRequests.length > 0 &&
                          item.cancelRequests[item.cancelRequests.length - 1].status === 'rejected') ||
                        item.cancelRequests.length <= 0
                          ? COMPLAINT_STATUS_BACKGROUND_COLOR[item.status as COMPLAINT_STATUS]
                          : CANCEL_REQUEST_STATUS_BACKGROUND_COLOR[
                              item.cancelRequests[item.cancelRequests.length - 1].status as CANCEL_REQUEST_STATUS
                            ],
                      color:
                        (item.cancelRequests.length > 0 &&
                          item.cancelRequests[item.cancelRequests.length - 1].status === 'rejected') ||
                        item.cancelRequests.length <= 0
                          ? COMPLAINT_STATUS_COLOR[item.status as COMPLAINT_STATUS]
                          : CANCEL_REQUEST_STATUS_COLOR[
                              item.cancelRequests[item.cancelRequests.length - 1].status as CANCEL_REQUEST_STATUS
                            ],
                    }}
                  >
                    {(item.cancelRequests.length > 0 &&
                      item.cancelRequests[item.cancelRequests.length - 1].status === 'rejected') ||
                    item.cancelRequests.length <= 0
                      ? COMPLAINT_STATUS_LABEL[item.status as COMPLAINT_STATUS]
                      : CANCEL_REQUEST_STATUS_LABEL[
                          item.cancelRequests[item.cancelRequests.length - 1].status as CANCEL_REQUEST_STATUS
                        ]}
                  </Typography>
                </Stack>
              </Stack>
            </NextLink>
          </Grid>
        ))}
    </Grid>
  )
}

export default YourReviewSend
