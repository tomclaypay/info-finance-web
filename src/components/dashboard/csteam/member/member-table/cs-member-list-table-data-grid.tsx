import TextCellGrid from '@app/components/common/TextCellGrid'
import ActionButton from '@app/components/dashboard/common/action-button'
import { useAuth } from '@app/hooks/use-auth'
import { CsMember } from '@app/interfaces/cs-member'
import { getInitials } from '@app/utils/get-initials'
import { Avatar, Box, Stack, Typography } from '@mui/material'
// import { DataGrid, getGridStringOperators, GridColDef } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import { DataGridPro, GridColDef, getGridStringOperators } from '@mui/x-data-grid-pro'

import { format, parseISO } from 'date-fns'
import { ROWS_PER_PAGE_OPTIONS } from '@app/components/common'

interface CsMemberListTableDataGridProps {
  csMembers?: CsMember[]
  totalRows?: number
  rowsPerPage: number
  page: number
  // onPageChange: (page: number) => void
  // onRowsPerPageChange: (event: any) => void
  handleSortFromServer?: (column: any) => void
  handleFilterFromServer?: (column: any) => void
  onPaginationModelChange: (model: any, details: any) => void
}

const CsMemberListTableDataGrid = (props: CsMemberListTableDataGridProps) => {
  const {
    csMembers,
    totalRows,
    page,
    rowsPerPage,
    // onPageChange,
    // onRowsPerPageChange,
    onPaginationModelChange,
    handleSortFromServer,
    handleFilterFromServer,
  } = props
  const auth = useAuth()
  const router = useRouter()

  const columns: GridColDef[] = [
    {
      field: 'information',
      headerName: 'THÔNG TIN',
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains' || operator.value === 'equals'
      ),
      filterable: false,
      sortable: false,
      width: 300,
      renderCell: (params) => (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Avatar
            src={params?.row?.user?.avatar}
            sx={{
              height: 42,
              width: 42,
            }}
          >
            {getInitials(params?.row?.user?.displayName || '')}
          </Avatar>
          <Box sx={{ ml: 1 }}>
            <Typography fontWeight="bold">{params?.row?.user?.displayName}</Typography>
            <Typography color="textSecondary" variant="body2">
              {params?.row?.user?.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'phone',
      headerName: 'SỐ ĐIỆN THOẠI',
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'contains' || operator.value === 'equals'
      ),
      filterable: false,
      // sortable: false,
      width: 150,
      renderCell: (params: any) => <TextCellGrid>{params?.row?.user?.phone}</TextCellGrid>,
    },
    {
      field: 'cs_team',
      headerName: 'NHÓM',
      filterable: false,
      // sortable: false,
      // filterOperators: getGridStringOperators().filter(
      //   (operator) => operator.value === 'contains' || operator.value === 'equals'
      // ),
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {params?.value?.id ? (
              auth?.user?.role === 'member' ? (
                <TextCellGrid>{params?.value?.name}</TextCellGrid>
              ) : (
                <Box
                  onClick={() =>
                    router.push({
                      pathname: '/dashboard/csteam/teams',
                      query: { csTeamName: params?.value?.name },
                    })
                  }
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <TextCellGrid fontWeight="500" color="primary.main">
                    {params?.value?.name}
                  </TextCellGrid>
                </Box>
              )
            ) : (
              <TextCellGrid>...</TextCellGrid>
            )}
          </>
        )
      },
    },
    {
      field: 'role',
      headerName: 'CHỨC VỤ',
      filterable: false,
      // sortable: false,
      width: 150,
      renderCell: (params) => <TextCellGrid>{params?.row?.user?.role}</TextCellGrid>,
    },
    {
      field: 'complaints_aggregate',
      headerName: 'SỐ KHIẾU NẠI XỬ LÝ',
      filterable: false,
      // sortable: false,
      headerAlign: 'center',
      align: 'center',
      width: 200,
      renderCell: (params) => (
        <TextCellGrid>{params.value.aggregate.count ? params.value.aggregate.count : '0'}</TextCellGrid>
      ),
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
          {/* {auth?.user?.role === 'super_admin' && (
            <ActionButton type="remove" onClick={() => handleOpenPopupVerify(params.row)} />
          )} */}
          {auth?.user?.role === 'super_admin' && (
            <ActionButton
              type="edit"
              onClick={() =>
                router.push({
                  pathname: `/dashboard/csteam/members/${params.value}/edit`,
                  query: {
                    page,
                    limit: rowsPerPage,
                  },
                })
              }
            />
          )}
          <ActionButton
            type="detail"
            onClick={() =>
              router.push({
                pathname: `/dashboard/csteam/members/${params.value}`,
                query: {
                  page,
                  limit: rowsPerPage,
                },
              })
            }
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

          '& .mui-style-wop1k0-MuiDataGrid-footerContainer': {
            borderTop: '0.5px solid rgba(0,0,0,0.5)',
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
        rows={csMembers || []}
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

      {/* <Dialog maxWidth="xs" open={openPopupVerify?.open as boolean}>
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
      </Dialog> */}
    </>
  )
}

export default CsMemberListTableDataGrid
