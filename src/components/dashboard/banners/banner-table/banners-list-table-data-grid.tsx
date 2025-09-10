import { ROWS_PER_PAGE_OPTIONS } from '@app/components/common'
import TextCellGrid from '@app/components/common/TextCellGrid'
import ThumbnailCell from '@app/components/common/ThumbnailCell'
import ActionButton from '@app/components/dashboard/common/action-button'
import { Banner } from '@app/interfaces/banner'
import { Stack } from '@mui/material'
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro'
import { format, parseISO } from 'date-fns'
import { useRouter } from 'next/router'
import { LanguageOptions, PositionOptions } from '../banner-form'

interface BannersListTableDataGridProps {
  banners?: Banner[]
  totalRows?: number
  rowsPerPage: number
  page: number
  onPaginationModelChange: (model: any, details: any) => void
  handleSortFromServer?: (column: any) => void
}

const positionOptionsObject = PositionOptions.reduce((acc: any, option) => {
  acc[option.value] = option.label
  return acc
}, {})

const languageOptionsObject = LanguageOptions.reduce((acc: any, option) => {
  acc[option.value] = option.label
  return acc
}, {})

const BannersListTableDataGrid = (props: BannersListTableDataGridProps) => {
  const { banners, totalRows, page, rowsPerPage, onPaginationModelChange, handleSortFromServer } = props
  const router = useRouter()

  const columns: GridColDef[] = [
    {
      field: 'link',
      headerName: 'BANNER',
      filterable: false,
      sortable: false,
      width: 180,
      renderCell: (params: any) => <ThumbnailCell src={params.value?.[0]} />,
    },
    {
      field: 'position',
      headerName: 'VỊ TRÍ',
      filterable: false,
      align: 'center',
      // sortable: false,
      headerAlign: 'center',
      width: 300,
      renderCell: (params) => <TextCellGrid>{positionOptionsObject[params.value]}</TextCellGrid>,
    },
    {
      field: 'language',
      headerName: 'NGÔN NGỮ',
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      // sortable: false,
      width: 250,
      renderCell: (params: any) => <TextCellGrid>{languageOptionsObject[params.value]}</TextCellGrid>,
    },
    {
      field: 'created_at',
      headerName: 'TẠO NGÀY',
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      // sortable: false,
      width: 180,
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
      width: 150,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5}>
          <ActionButton type="edit" onClick={() => router.push(`/dashboard/banners/${params.value}/edit`)} />
        </Stack>
      ),
    },
  ]

  return (
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
      rows={banners || []}
      rowCount={totalRows}
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
  )
}

export default BannersListTableDataGrid
