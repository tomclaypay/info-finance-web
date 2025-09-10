import { ROWS_PER_PAGE_OPTIONS } from '@app/components/common'
import TextCellGrid from '@app/components/common/TextCellGrid'
import ThumbnailCell from '@app/components/common/ThumbnailCell'
import ActionButton from '@app/components/dashboard/common/action-button'
import { useAuth } from '@app/hooks/use-auth'
import { Exchange } from '@app/interfaces/exchange'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, Typography } from '@mui/material'
// import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro'
import { format, parseISO } from 'date-fns'
import { useRouter } from 'next/router'
import { useState } from 'react'

type PopupType = 'hidden' | 'delete'
interface ExchangesListTableDataGridProps {
  exchanges?: Exchange[]
  totalRows?: number
  rowsPerPage: number
  page: number
  onPaginationModelChange: (model: any, details: any) => void
  // onRowsPerPageChange: (event: any) => void
  handleSortFromServer?: (column: any) => void
  handleChangeHiddenExchange: (exchange: Exchange) => void
  handleDeleteExchange: (exchangeId: string) => void
}

const ExchangesListTableDataGrid = (props: ExchangesListTableDataGridProps) => {
  const {
    exchanges,
    totalRows,
    page,
    rowsPerPage,
    onPaginationModelChange,
    // onRowsPerPageChange,
    handleSortFromServer,
    handleChangeHiddenExchange,
    handleDeleteExchange,
  } = props
  const auth = useAuth()
  const router = useRouter()

  const [popup, setPopup] = useState<{ open: boolean; exchange: Exchange; popupType: PopupType }>({
    open: false,
    exchange: {} as Exchange,
    popupType: 'hidden',
  })

  const columns: GridColDef[] = [
    {
      field: 'logo',
      headerName: 'ẢNH',
      filterable: false,
      sortable: false,
      width: 150,
      renderCell: (params: any) => <ThumbnailCell src={params.value} />,
    },
    {
      field: 'name',
      headerName: 'TÊN SÀN GIAO DỊCH',
      // filterOperators: getGridStringOperators().filter(
      //   (operator) => operator.value === 'contains' || operator.value === 'equals'
      // ),
      filterable: false,
      // sortable: false,
      headerAlign: 'center',
      width: 190,
      renderCell: (params) => <TextCellGrid>{params.value}</TextCellGrid>,
    },
    {
      field: 'website',
      headerName: 'WEBSITE',
      headerAlign: 'center',
      filterable: false,
      // sortable: false,
      width: 300,
      renderCell: (params: any) => <TextCellGrid>{params.value?.[0]?.url}</TextCellGrid>,
    },
    // {
    //   field: 'national',
    //   headerName: 'QUỐC GIA',
    //   headerAlign: 'center',

    //   filterable: false,
    //   sortable: false,
    //   width: 120,
    //   renderCell: (params: any) => <TextCellGrid>{params?.value?.name}</TextCellGrid>,
    // },
    {
      field: 'total_point',
      headerName: 'ĐIỂM ĐÁNH GIÁ',
      headerAlign: 'center',
      filterable: false,
      align: 'center',
      // sortable: false,
      width: 150,
      renderCell: (params: any) => <TextCellGrid>{params.value}</TextCellGrid>,
    },

    {
      field: 'is_top_broker',
      headerName: 'SÀN MÔI GIỚI HÀNG ĐẦU',
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      // sortable: false,
      width: 150,
      renderCell: (params) => (
        <>{params.value ? <CheckRoundedIcon sx={{ color: '#2a559c' }} /> : <HorizontalRuleRoundedIcon />}</>
      ),
    },
    {
      field: 'is_trader_all_choose',
      headerName: 'NGƯỜI DÙNG TIN CHỌN',
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      // sortable: false,
      width: 150,
      renderCell: (params) => (
        <>{params.value ? <CheckRoundedIcon sx={{ color: '#2a559c' }} /> : <HorizontalRuleRoundedIcon />}</>
      ),
    },
    {
      field: 'licenses_aggregate',
      headerName: 'SỐ GIẤY PHÉP',
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      sortable: false,
      width: 120,
      renderCell: (params: any) => <TextCellGrid>{params.value.aggregate.count}</TextCellGrid>,
    },
    {
      field: 'feedbacks_aggregate',
      headerName: 'SỐ REVIEW',
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      sortable: false,
      width: 120,
      renderCell: (params: any) => <TextCellGrid>{params.value.aggregate.count}</TextCellGrid>,
    },

    {
      field: 'complaints_aggregate',
      headerName: 'SỐ KHIẾU NẠI',
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      sortable: false,
      width: 120,
      renderCell: (params: any) => <TextCellGrid>{params.value.aggregate.count}</TextCellGrid>,
    },
    {
      field: 'createdAt',
      headerName: 'TẠO NGÀY',
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      // sortable: false,
      width: 160,
      renderCell: (params) => <TextCellGrid>{`${format(parseISO(params.value), 'dd/MM/yyyy HH:mm')}`}</TextCellGrid>,
    },
    {
      field: 'updatedAt',
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
      width: 200,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5}>
          {auth?.user?.role === 'super_admin' && (
            <>
              <ActionButton
                type={params.row.hidden ? 'hidden' : 'show'}
                onClick={() => setPopup({ open: true, exchange: params.row, popupType: 'hidden' })}
              />
              <ActionButton
                type="remove"
                onClick={() => setPopup({ open: true, exchange: params.row, popupType: 'delete' })}
              />

              <ActionButton
                type="edit"
                onClick={() =>
                  router.push({
                    pathname: `/dashboard/exchanges/${params.value}/edit`,
                    query: {
                      page,
                      limit: rowsPerPage,
                    },
                  })
                }
              />
              <ActionButton
                type="detail"
                onClick={() =>
                  router.push({
                    pathname: `/dashboard/exchanges/${params.value}`,
                    query: {
                      page,
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
          // '& .mui-style-gu2l4n': {
          //   backgroundColor: '#F3F4F6',
          // },

          '& .mui-style-y599qu': {
            backgroundColor: '#F3F4F6',
          },
          '& .mui-style-1fe2u81': {
            backgroundColor: '#F3F4F6',
          },
          '& .mui-style-9ffb5l': {
            borderTop: '0.5px solid rgba(0,0,0,0.5)!important',
          },

          '& .mui-style-1iyq7zh-MuiDataGrid-columnHeaders': {
            backgroundColor: '#F3F4F6',
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
        rows={exchanges || []}
        columns={columns}
        // pageSize={rowsPerPage}
        // page={page}
        // rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        // onPageChange={onPageChange}
        // disableSelectionOnClick
        // onPageSizeChange={onRowsPerPageChange}

        pageSizeOptions={ROWS_PER_PAGE_OPTIONS}
        paginationModel={{ page: page, pageSize: rowsPerPage }}
        onPaginationModelChange={onPaginationModelChange}
        disableRowSelectionOnClick
        initialState={{ pinnedColumns: { right: ['id'] } }}
      />

      <Dialog
        maxWidth="xs"
        open={popup.open}
        onClose={() => setPopup({ ...popup, open: false, exchange: {} as Exchange })}
      >
        <DialogTitle>
          <Stack direction="row" alignContent="flex-end">
            <Typography variant="h4" mr={0.5}>
              {popup.popupType === 'delete'
                ? 'Xác nhận xoá sàn'
                : !popup.exchange.hidden
                ? 'Xác nhận ẩn sàn'
                : 'Xác nhận hiển thị sàn'}
            </Typography>
          </Stack>
        </DialogTitle>
        <Divider />

        <DialogContent>
          {popup.popupType === 'delete' ? (
            <Typography variant="body2">
              Thao tác sẽ <b>xoá sàn giao dịch</b> này và sẽ ảnh hưởng đến số liệu của sàn trên Website
            </Typography>
          ) : popup.exchange.hidden ? (
            <Typography variant="body2">
              Thao tác sẽ làm sàn giao dịch này <b>hiển thị</b> lên website và sẽ ảnh hưởng đến số liệu của sàn trên
              Website
            </Typography>
          ) : (
            <Typography variant="body2">
              Thao tác sẽ khiến sàn giao dịch này <b>không hiển thị</b> lên website và sẽ ảnh hưởng đến số liệu của sàn
              trên Website
            </Typography>
          )}
          <Typography variant="body2">Bạn có muốn tiếp tục thao tác?</Typography>
        </DialogContent>

        <DialogActions>
          <Stack flex={1} direction="row" spacing={2} justifyContent="space-between">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ textTransform: 'capitalize' }}
              onClick={() => {
                if (popup.popupType === 'delete') {
                  handleDeleteExchange(popup.exchange.id)
                } else {
                  handleChangeHiddenExchange(popup.exchange)
                }
                setPopup({ ...popup, open: false, exchange: {} as Exchange })
              }}
            >
              Xác nhận
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setPopup({ ...popup, open: false, exchange: {} as Exchange })}
            >
              Đóng
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ExchangesListTableDataGrid
