import { useAuth } from '@app/hooks/use-auth'
import { ArrowRight as ArrowRightIcon } from '@app/icons/arrow-right'
import { PencilAlt as PencilAltIcon } from '@app/icons/pencil-alt'
import { Trash as TrashIcon } from '@app/icons/trash'
import { CsTeam } from '@app/interfaces/cs-team'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
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

interface UserListTableProps {
  teams?: CsTeam[]
  totalRows?: number
  rowsPerPage: number
  page: number
  onPageChange: (event: any, newPage: number) => void
  onRowsPerPageChange: (event: any) => void
  handleDeleteCsTeam: (teamId: string) => void
  openPopupVerify: { teamId: string; open: boolean; teamName: string }
  handleOpenPopupVerify: (teamId: string, teamName: string) => void
  handleClosePopupVerify: () => void
}

const CsTeamListTable = (props: UserListTableProps) => {
  const {
    teams,
    totalRows,
    rowsPerPage,
    page,
    onPageChange,
    onRowsPerPageChange,
    openPopupVerify,
    handleDeleteCsTeam,
    handleOpenPopupVerify,
    handleClosePopupVerify,
  } = props
  const auth = useAuth()

  return (
    <>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            {/* <TableCell>Avatar</TableCell> */}
            <TableCell>Tên team</TableCell>
            <TableCell>Mô tả</TableCell>
            <TableCell>Leader</TableCell>
            <TableCell>Members</TableCell>
            {auth?.user?.role !== 'member' && <TableCell align="right">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {teams?.map(({ id, name, description, cs_members }) => {
            const dataCsLeader = cs_members?.filter((member) => member.user.role === 'leader')
            const dataCsMembers = cs_members?.filter((member) => member.user.role === 'member')
            return (
              <TableRow hover key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>
                  {dataCsLeader?.length > 0 ? (
                    <NextLink href={`/dashboard/csteam/members/${dataCsLeader?.[0]?.id}`} passHref>
                      {dataCsLeader?.[0]?.user.displayName}
                    </NextLink>
                  ) : (
                    'Chưa có'
                  )}
                </TableCell>
                {dataCsMembers?.length > 0 ? (
                  <TableCell>
                    {auth?.user?.role === 'super_admin' ? (
                      dataCsMembers?.length
                    ) : (
                      <Stack>
                        {dataCsMembers.map((member) => (
                          <NextLink key={member.id} href={`/dashboard/csteam/members/${member?.id}`} passHref>
                            {member?.user.displayName}
                          </NextLink>
                        ))}
                      </Stack>
                    )}
                  </TableCell>
                ) : (
                  <TableCell>Chưa có</TableCell>
                )}

                {auth?.user?.role !== 'member' && (
                  <TableCell align="right">
                    {auth?.user?.role === 'super_admin' && (
                      <>
                        <IconButton onClick={() => handleOpenPopupVerify(id, name)}>
                          <Tooltip title="Xoá">
                            <TrashIcon fontSize="small" />
                          </Tooltip>
                        </IconButton>

                        <NextLink href={`/dashboard/csteam/teams/${id}/edit`}>
                          <IconButton component="a">
                            <Tooltip title="Cập nhập">
                              <PencilAltIcon fontSize="small" />
                            </Tooltip>
                          </IconButton>
                        </NextLink>
                      </>
                    )}
                    <NextLink href={`/dashboard/csteam/teams/${id}`} passHref>
                      <IconButton component="a">
                        <Tooltip title="Chi tiết">
                          <ArrowRightIcon fontSize="small" />
                        </Tooltip>
                      </IconButton>
                    </NextLink>
                  </TableCell>
                )}
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

      <Dialog maxWidth="xs" open={openPopupVerify?.open as boolean}>
        <DialogTitle>
          <Stack direction="row" alignContent="flex-end">
            <Typography variant="h4" mr={0.5}>
              Xác nhận xóa nhóm
            </Typography>
            <Typography variant="h4" color="primary.main">
              {openPopupVerify.teamName}
            </Typography>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography variant="body2">
            {`Bạn có chắc chắn muốn xóa nhóm này? Tất cả các vụ khiếu nại mà nhóm đang xử lý sẽ được chuyển thành "Chưa có
          ai xử lý".`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Stack flex={1} direction="row" spacing={2} justifyContent="space-between">
            <Button
              // disabled={isSubmitting || disabled}
              type="submit"
              variant="contained"
              fullWidth
              sx={{ textTransform: 'capitalize' }}
              onClick={() => handleDeleteCsTeam(openPopupVerify.teamId)}
            >
              Xác nhận
            </Button>
            <Button
              // disabled={isSubmitting || disabled}
              variant="outlined"
              fullWidth
              onClick={handleClosePopupVerify}
            >
              Đóng
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CsTeamListTable
