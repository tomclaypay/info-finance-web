import { ROWS_PER_PAGE_OPTIONS } from '@app/components/common'
import TextCellGrid from '@app/components/common/TextCellGrid'
import ActionButton from '@app/components/dashboard/common/action-button'
import { useAuth } from '@app/hooks/use-auth'
import { CsMember } from '@app/interfaces/cs-member'
import { CsTeam } from '@app/interfaces/cs-team'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { format, parseISO } from 'date-fns'
import { DataGridPro, GridColDef, getGridStringOperators } from '@mui/x-data-grid-pro'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

interface CsTeamListTableDataGridProps {
  teams?: CsTeam[]
  totalRows?: number
  rowsPerPage: number
  page: number
  // onPageChange: (page: number) => void
  // onRowsPerPageChange: (event: any) => void
  handleDeleteCsTeam: (csTeam: CsTeam) => void
  openPopupVerify: { csTeam: CsTeam; open: boolean }
  handleOpenPopupVerify: (csTeam: CsTeam) => void
  handleClosePopupVerify: () => void
  handleSortFromServer?: (column: any) => void
  handleFilterFromServer?: (column: any) => void
  onPaginationModelChange: (model: any, details: any) => void
}

const CsTeamListTableDataGrid = (props: CsTeamListTableDataGridProps) => {
  const {
    teams,
    totalRows,
    handleOpenPopupVerify,
    openPopupVerify,
    handleDeleteCsTeam,
    page,
    rowsPerPage,
    // onPageChange,
    // onRowsPerPageChange,
    handleClosePopupVerify,
    onPaginationModelChange,
    handleSortFromServer,
    handleFilterFromServer,
  } = props
  const auth = useAuth()
  const router = useRouter()

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'TÊN TEAM',
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains' || operator.value === 'equals'
      ),
      // filterable: false,
      // sortable: false,
      width: 200,
      renderCell: (params) => <TextCellGrid>{params.value}</TextCellGrid>,
    },
    // {
    //   field: 'description',
    //   headerName: 'MÔ TẢ',
    //   // filterable: false,
    //   // sortable: false,
    //   width: 250,
    //   renderCell: (params: any) => <TextCellGrid>{params.value}</TextCellGrid>,
    // },
    {
      field: 'leader',
      headerName: 'LEADER',
      filterable: false,
      sortable: false,
      // filterOperators: getGridStringOperators().filter(
      //   (operator) => operator.value === 'contains' || operator.value === 'equals'
      // ),
      width: 200,
      renderCell: (params) => {
        const leader = params?.row?.cs_members?.filter((member: CsMember) => member?.user?.role === 'leader')
        return (
          <>
            {leader?.length > 0 ? (
              <NextLink href={`/dashboard/csteam/members/${leader?.[0].id}`} passHref>
                <Link target="_blank" sx={{ cursor: 'pointer' }}>
                  <TextCellGrid fontWeight="500" color="primary.main">
                    {leader?.[0]?.user.displayName}
                  </TextCellGrid>
                </Link>
              </NextLink>
            ) : (
              <Typography variant="body2">Chưa có</Typography>
            )}
          </>
        )
      },
    },
    {
      field: 'members',
      headerName: 'MEMBERS',
      filterable: false,
      // sortable: false,
      width: 200,
      renderCell: (params) => {
        const members = params?.row?.cs_members?.filter((member: CsMember) => member?.user?.role === 'member')
        return <TextCellGrid>{members?.length}</TextCellGrid>
      },
    },
    {
      field: 'created_at',
      headerName: 'TẠO NGÀY',
      filterable: false,
      // sortable: false,
      width: 200,
      renderCell: (params) => <TextCellGrid>{`${format(parseISO(params.value), 'dd/MM/yyyy HH:mm')}`}</TextCellGrid>,
    },
    {
      field: 'updated_at',
      headerName: 'CHỈNH SỬA LẦN CUỐI',
      filterable: false,
      // sortable: false,
      width: 200,
      renderCell: (params) => <TextCellGrid>{`${format(parseISO(params.value), 'dd/MM/yyyy HH:mm')}`}</TextCellGrid>,
    },
    {
      field: 'id',
      sortable: false,
      filterable: false,
      headerName: 'HÀNH ĐỘNG',
      width: 180,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5}>
          {auth?.user?.role === 'super_admin' && (
            <>
              <ActionButton type="remove" onClick={() => handleOpenPopupVerify(params.row)} />
              <ActionButton
                type="edit"
                onClick={() =>
                  router.push({
                    pathname: `/dashboard/csteam/teams/${params.value}/edit`,
                    query: {
                      page,
                      limit: rowsPerPage,
                    },
                  })
                }
              />
            </>
          )}
          <ActionButton
            type="detail"
            onClick={() => router.push({ pathname: `/dashboard/csteam/members`, query: params?.row })}
          />
        </Stack>
      ),
    },
  ]

  return (
    <>
      <DataGridPro
        sx={{
          '& .mui-style-1iyq7zh-MuiDataGrid-columnHeaders': {
            backgroundColor: '#F3F4F6',
          },

          '& .mui-style-y599qu': {
            backgroundColor: '#F3F4F6',
          },
          '& .mui-style-1fe2u81': {
            backgroundColor: '#F3F4F6',
          },
          '& .mui-style-9ffb5l': {
            borderTop: '0.5px solid rgba(0,0,0,0.5)!important',
          },

          '& .mui-style-8ruzqp-MuiDataGrid-pinnedColumnHeaders': {
            backgroundColor: '#F3F4F6',
          },

          '& .mui-style-1jbbcbn-MuiDataGrid-columnHeaderTitle': {
            fontWeight: '600',
            fontSize: '12px',
            color: '#374151',
          },

          '& .mui-style-cc8tf1': {
            fontWeight: '600',
            fontSize: '12px',
            color: '#374151',
          },

          '& .MuiDataGrid-columnSeparator': {
            visibility: 'visible',
          },

          '& .MuiDataGrid-iconSeparator': {
            color: 'rgba(0,0,0,0.5)',
          },

          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },

          '& .MuiDataGrid-row': {
            borderTop: '0.5px solid rgba(0,0,0,0.2)',
          },

          '& .MuiDataGrid-cell': {
            border: 'none',
          },
        }}
        componentsProps={{
          pagination: {
            labelRowsPerPage: 'Số hàng trên 1 trang',
          },
        }}
        rowHeight={84}
        autoHeight
        pagination
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        onSortModelChange={handleSortFromServer}
        onFilterModelChange={handleFilterFromServer}
        rowCount={totalRows}
        rows={teams || []}
        columns={columns}
        // rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        // page={page}
        // pageSize={rowsPerPage}
        // onPageChange={onPageChange}
        // onPageSizeChange={onRowsPerPageChange}
        // disableSelectionOnClick

        pageSizeOptions={ROWS_PER_PAGE_OPTIONS}
        paginationModel={{ page: page, pageSize: rowsPerPage }}
        onPaginationModelChange={onPaginationModelChange}
        disableRowSelectionOnClick
        initialState={{ pinnedColumns: { right: ['id'] } }}
      />

      <Dialog maxWidth="xs" open={openPopupVerify?.open as boolean}>
        <DialogTitle>
          <Stack direction="row" alignContent="flex-end">
            <Typography variant="h4" mr={0.5}>
              Xác nhận xóa nhóm
            </Typography>
            <Typography variant="h4" color="primary.main">
              {openPopupVerify.csTeam.name}
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
              onClick={() => handleDeleteCsTeam(openPopupVerify.csTeam)}
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

export default CsTeamListTableDataGrid
