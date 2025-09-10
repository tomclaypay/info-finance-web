import { PropertyListItem } from '@app/components/dashboard/complaints/complaint-details/property-list-item'
import { COMPLAINT_STATUS, COMPLAINT_STATUS_COLOR, COMPLAINT_STATUS_LABEL } from '@app/constants/complaint'
import { useAuth } from '@app/hooks/use-auth'
import { Complaint } from '@app/interfaces/complaint'
import { CsMember } from '@app/interfaces/cs-member'
import {
  Box,
  Card,
  CardHeader,
  Divider,
  List,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Theme } from '@mui/system'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

interface CsMemberDetailsProps {
  csMember: CsMember
}

export const CsMemberDetails = ({ csMember }: CsMemberDetailsProps) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const auth = useAuth()
  const align = mdUp ? 'horizontal' : 'vertical'
  const router = useRouter()

  return (
    <Box>
      <Card>
        <CardHeader title="Thông tin CS member" />
        <Divider />
        <List disablePadding>
          <PropertyListItem align={align} label="Tên Cs member" value={csMember?.user?.displayName} />
          <PropertyListItem align={align} label="Email" value={csMember?.user?.email} />
          <PropertyListItem align={align} label="Số điện thoại" value={csMember?.user?.phone} />
          <PropertyListItem align={align} label="Role" value={csMember?.user?.role} />
        </List>
      </Card>

      <Card sx={{ mt: 5 }}>
        <CardHeader title="Thông tin CS team" />
        {csMember?.cs_team?.id ? (
          <>
            <Divider />
            <List disablePadding>
              <PropertyListItem align={align} label="Tên Cs team">
                {auth?.user?.role === 'member' ? (
                  <Typography variant="body2">{csMember.cs_team.name}</Typography>
                ) : (
                  <Typography
                    variant="body2"
                    color="primary.main"
                    onClick={() =>
                      router.push({
                        pathname: '/dashboard/csteam/teams',
                        query: { csTeamName: csMember.cs_team.name },
                      })
                    }
                    sx={{ cursor: 'pointer', fontWeight: '500' }}
                  >
                    {csMember.cs_team.name}
                  </Typography>
                )}
              </PropertyListItem>

              {csMember.cs_team?.csLeader.length > 0 && (
                <PropertyListItem align={align} label="Leader">
                  {auth?.user?.role === 'member' ? (
                    <Typography variant="body2">{csMember.cs_team.csLeader?.[0].user.displayName}</Typography>
                  ) : (
                    <NextLink href={`/dashboard/csteam/members/${csMember.cs_team.csLeader?.[0].id}`} passHref>
                      <Typography variant="body2" color="primary.main" sx={{ cursor: 'pointer', fontWeight: '500' }}>
                        {csMember.cs_team.csLeader?.[0].user.displayName}
                      </Typography>
                    </NextLink>
                  )}
                </PropertyListItem>
              )}

              {csMember.cs_team?.csMembers.length > 0 && (
                <PropertyListItem align={align} label="Members">
                  {auth?.user?.role === 'member' ? (
                    <>
                      {csMember.cs_team?.csMembers
                        ?.filter((item: CsMember) => item?.user?.id === auth?.user?.id)
                        ?.map((item: CsMember) => (
                          <NextLink href={`/dashboard/csteam/members/${item.id}`} passHref key={item.id}>
                            <Typography
                              variant="body2"
                              color="primary.main"
                              sx={{ cursor: 'pointer', fontWeight: '500' }}
                            >
                              {item.user.displayName}
                            </Typography>
                          </NextLink>
                        ))}
                    </>
                  ) : (
                    <>
                      {csMember.cs_team?.csMembers?.map((item: CsMember) => (
                        <NextLink href={`/dashboard/csteam/members/${item.id}`} passHref key={item.id}>
                          <Typography
                            variant="body2"
                            color="primary.main"
                            sx={{ cursor: 'pointer', fontWeight: '500' }}
                          >
                            {item.user.displayName}
                          </Typography>
                        </NextLink>
                      ))}
                    </>
                  )}
                </PropertyListItem>
              )}
            </List>
          </>
        ) : (
          <>
            <Divider />
            <List disablePadding>
              <PropertyListItem align={align} label="Team" value="Chưa thuộc team nào" />
            </List>
          </>
        )}
      </Card>

      <Card sx={{ mt: 5 }}>
        <CardHeader
          title={`Thông tin các khiếu nại đang xử lý (${csMember?.complaints_aggregate?.aggregate?.count})`}
        />

        <Divider />
        {csMember?.complaints.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên khiếu nại</TableCell>

                <TableCell align="center">Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {csMember?.complaints?.map((complaint: Complaint) => {
                const { id, title, status, cancelRequests } = complaint
                return (
                  <TableRow
                    hover
                    key={id}
                    // sx={{
                    //   backgroundColor: status === COMPLAINT_STATUS.PENDING ? '#FFE9E6' : 'transparent',
                    // }}
                  >
                    <TableCell sx={{ width: '80%' }}>
                      <Typography
                        sx={{
                          // maxWidth: 'max-content',
                          cursor: 'pointer',
                          color: 'primary.main',
                          fontWeight: 'bold',
                          fontSize: '14px',
                        }}
                        onClick={() =>
                          router.push({
                            pathname: '/dashboard/complaints',
                            query: {
                              complaintTile: title,
                            },
                          })
                        }
                      >
                        {title}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ width: '20%' }}>
                      <Stack
                        alignItems="center"
                        sx={{
                          py: 0.5,
                          borderRadius: '10px',
                          bgcolor:
                            cancelRequests?.[0]?.status === 'pending'
                              ? '#FFCD1A'
                              : COMPLAINT_STATUS_COLOR[status as COMPLAINT_STATUS],
                          color: cancelRequests?.[0]?.status === 'pending' ? 'black' : 'white',
                          fontWeight: 600,
                          textAlign: 'center',
                          px: 5,
                        }}
                      >
                        {cancelRequests?.[0]?.status === 'pending'
                          ? 'Yêu cầu huỷ'
                          : COMPLAINT_STATUS_LABEL[status as COMPLAINT_STATUS]}
                      </Stack>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          <>
            <List disablePadding>
              <PropertyListItem align={align} label="Tên khiếu nại" value="Đang không xử lý khiếu nại nào" />
            </List>
          </>
        )}
      </Card>
      {csMember?.complaints?.length < csMember?.complaints_aggregate?.aggregate?.count && (
        <Stack direction="row" alignItems="center" justifyContent="flex-end" px={2} mt={1.5}>
          <Typography
            variant="body2"
            color="primary.main"
            onClick={() =>
              router.push({
                pathname: '/dashboard/complaints',
                query: {
                  handleById: csMember.id,
                  displayName: csMember.user.displayName,
                },
              })
            }
            sx={{ cursor: 'pointer', fontWeight: '500', textDecoration: 'underline' }}
          >
            Xem tất cả
          </Typography>
        </Stack>
      )}
    </Box>
  )
}
