import { useAuth } from '@app/hooks/use-auth'
import { ArrowRight as ArrowRightIcon } from '@app/icons/arrow-right'
import { PencilAlt as PencilAltIcon } from '@app/icons/pencil-alt'
import { CsMember } from '@app/interfaces/cs-member'
import { getInitials } from '@app/utils/get-initials'
import {
  Avatar,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import NextLink from 'next/link'

interface CsMemberListTableProps {
  csMembers?: CsMember[]
  totalRows?: number
  rowsPerPage: number
  page: number
  onPageChange: (event: any, newPage: number) => void
  onRowsPerPageChange: (event: any) => void
  // handleDeleteCsMember: (memberId: string) => void
}

const CsMemberListTable = (props: CsMemberListTableProps) => {
  const { csMembers, totalRows, rowsPerPage, page, onPageChange, onRowsPerPageChange } = props
  const auth = useAuth()
  return (
    <>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Số điện thoại</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Số khiếu nại xử lý</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {csMembers?.map(({ user, id: memberId, cs_team, complaints_aggregate }) => {
            return (
              <TableRow hover key={memberId}>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  >
                    <Avatar
                      src={user?.avatar}
                      sx={{
                        height: 42,
                        width: 42,
                      }}
                    >
                      {getInitials(user?.displayName || '')}
                    </Avatar>
                    <Box sx={{ ml: 1 }}>
                      <Typography fontWeight="bold">{user?.displayName}</Typography>
                      <Typography color="textSecondary" variant="body2">
                        {user?.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{user?.phone}</TableCell>
                <TableCell>
                  {cs_team?.id ? (
                    <NextLink href={`/dashboard/csteam/teams/${cs_team?.id}`} passHref>
                      {cs_team?.name}
                    </NextLink>
                  ) : (
                    'Tự do'
                  )}
                </TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell>{complaints_aggregate.aggregate.count}</TableCell>

                <TableCell align="right">
                  {auth?.user?.role === 'super_admin' && (
                    <NextLink href={`/dashboard/csteam/members/${memberId}/edit`} passHref>
                      <IconButton component="a">
                        <Tooltip title="Cập nhật">
                          <PencilAltIcon fontSize="small" />
                        </Tooltip>
                      </IconButton>
                    </NextLink>
                  )}
                  <NextLink href={`/dashboard/csteam/members/${memberId}`} passHref>
                    <IconButton component="a">
                      <Tooltip title="Chi tiết">
                        <ArrowRightIcon fontSize="small" />
                      </Tooltip>
                    </IconButton>
                  </NextLink>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={totalRows || 0}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  )
}

export default CsMemberListTable
