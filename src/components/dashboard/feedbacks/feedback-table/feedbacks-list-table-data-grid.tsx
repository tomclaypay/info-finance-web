import { ROWS_PER_PAGE_OPTIONS } from '@app/components/common'
import TextCellGrid from '@app/components/common/TextCellGrid'
import ActionButton from '@app/components/dashboard/common/action-button'
import { useAuth } from '@app/hooks/use-auth'
import { Feedback } from '@app/interfaces/feedback'
import { getInitials } from '@app/utils/get-initials'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
// import { DataGrid, getGridStringOperators, GridColDef } from '@mui/x-data-grid'
import { DataGridPro, getGridStringOperators, GridColDef } from '@mui/x-data-grid-pro'
import { format, parseISO } from 'date-fns'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface FeedbackListTableDataGridProps {
  feedbacks?: Feedback[]
  totalRows?: number
  rowsPerPage: number
  page: number
  handleSortFromServer?: (column: any) => void
  onPaginationModelChange: (model: any, details: any) => void
  handleChangeHiddenFeedback: (feedback: Feedback) => void
}

const FeedbackListTableDataGrid = (props: FeedbackListTableDataGridProps) => {
  const {
    feedbacks,
    totalRows,
    page,
    rowsPerPage,
    handleSortFromServer,
    onPaginationModelChange,
    handleChangeHiddenFeedback,
  } = props
  const auth = useAuth()
  const router = useRouter()

  const [popup, setPopup] = useState({ open: false, feedback: {} })

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
      field: 'seeder',
      headerName: 'SEEDER',
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
            src={params?.row?.seeder?.avatar}
            sx={{
              height: 42,
              width: 42,
            }}
          >
            {getInitials(params?.row?.seeder?.fullname || 'seeder')}
          </Avatar>
          <Box sx={{ ml: 1 }}>
            <Typography fontWeight="bold">{params?.row?.seeder?.fullname}</Typography>
            <Typography color="textSecondary" variant="body2">
              {params?.row?.seeder?.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'exchange',
      headerName: 'TÊN SÀN GIAO DỊCH',
      // filterOperators: getGridStringOperators().filter(
      //   (operator) => operator.value === 'contains' || operator.value === 'equals'
      // ),
      filterable: false,
      sortable: false,
      headerAlign: 'center',
      width: 190,
      renderCell: (params) => <TextCellGrid>{params.value?.name}</TextCellGrid>,
    },
    {
      field: 'comment',
      headerName: 'NỘI DUNG',
      headerAlign: 'center',
      filterable: false,
      // sortable: false,
      width: 300,
      renderCell: (params: any) => <TextCellGrid>{params.value}</TextCellGrid>,
    },
    {
      field: 'point',
      headerName: 'ĐIỂM',
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      // sortable: false,
      width: 120,
      renderCell: (params: any) => <TextCellGrid>{params.value}</TextCellGrid>,
    },

    {
      field: 'created_at',
      headerName: 'TẠO NGÀY',
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      // sortable: false,
      width: 160,
      renderCell: (params) => <TextCellGrid>{`${format(parseISO(params.value), 'dd/MM/yyyy HH:mm')}`}</TextCellGrid>,
    },
    {
      field: 'updated_at',
      headerName: 'CHỈNH SỬA LẦN CUỐI',
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      // sortable: false,
      width: 180,
      renderCell: (params) => <TextCellGrid>{`${format(parseISO(params.value), 'dd/MM/yyyy HH:mm')}`}</TextCellGrid>,
    },

    {
      field: 'id',
      sortable: false,
      filterable: false,
      headerName: 'HÀNH ĐỘNG',
      width: 170,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5}>
          {auth?.user?.role === 'super_admin' && (
            <>
              <ActionButton
                type={params.row.hidden ? 'hidden' : 'show'}
                onClick={() => setPopup({ open: true, feedback: params.row })}
              />
              <ActionButton
                type="edit"
                onClick={() =>
                  router.push({
                    pathname: `/dashboard/feedbacks/${params.value}/edit`,
                    query: {
                      page: page,
                      limit: rowsPerPage,
                    },
                  })
                }
              />
            </>
          )}
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
        onSortModelChange={handleSortFromServer}
        rowCount={totalRows}
        rows={feedbacks || []}
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

      <Dialog maxWidth="xs" open={popup.open} onClose={() => setPopup({ open: false, feedback: {} })}>
        <DialogTitle>
          <Stack direction="row" alignContent="flex-end">
            <Typography variant="h4" mr={0.5}>
              {!popup.feedback?.hidden ? 'Xác nhận ẩn review' : 'Xác nhận hiển thị review'}
            </Typography>
          </Stack>
        </DialogTitle>
        <Divider />

        <DialogContent>
          {popup.feedback?.hidden ? (
            <Typography variant="body2">
              Thao tác sẽ làm review này <b>hiển thị</b> lên website và sẽ ảnh hưởng đến số liệu của sàn trên Website
            </Typography>
          ) : (
            <Typography variant="body2">
              Thao tác sẽ khiến review này <b>không hiển thị</b> lên website và sẽ ảnh hưởng đến số liệu của sàn trên
              Website
            </Typography>
          )}
          <Typography variant="body2">Bạn có muốn tiếp tục thao tác?</Typography>
        </DialogContent>

        <DialogActions>
          <Stack flex={1} direction="row" spacing={2} justifyContent="space-between">
            <Button
              // disabled={isSubmitting || disabled}
              type="submit"
              variant="contained"
              fullWidth
              sx={{ textTransform: 'capitalize' }}
              onClick={() => {
                handleChangeHiddenFeedback(popup.feedback)
                setPopup({ open: false, feedback: {} })
              }}
            >
              Xác nhận
            </Button>
            <Button
              // disabled={isSubmitting || disabled}
              variant="outlined"
              fullWidth
              onClick={() => setPopup({ open: false, feedback: {} })}
            >
              Đóng
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default FeedbackListTableDataGrid
