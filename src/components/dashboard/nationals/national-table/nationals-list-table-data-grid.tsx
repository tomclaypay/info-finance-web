import { ROWS_PER_PAGE_OPTIONS } from '@app/components/common'
import TextCellGrid from '@app/components/common/TextCellGrid'
import ThumbnailCell from '@app/components/common/ThumbnailCell'
import ActionButton from '@app/components/dashboard/common/action-button'
import { National } from '@app/interfaces/national'
import { Stack } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { format, parseISO } from 'date-fns'
import { useRouter } from 'next/router'

interface NationalsListTableDataGridProps {
  nationals?: National[]
  totalRows?: number
  rowsPerPage: number
  page: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (event: any) => void

  handleSortFromServer?: (column: any) => void
}

const NationalsListTableDataGrid = (props: NationalsListTableDataGridProps) => {
  const { nationals, totalRows, page, rowsPerPage, onPageChange, onRowsPerPageChange, handleSortFromServer } = props
  const router = useRouter()

  const columns: GridColDef[] = [
    {
      field: 'logo',
      headerName: 'Logo',
      filterable: false,
      sortable: false,
      width: 180,
      renderCell: (params: any) => <ThumbnailCell src={params.value} />,
    },
    {
      field: 'name',
      headerName: 'TÊN (TIẾNG ANH)',
      filterable: false,
      align: 'center',
      // sortable: false,
      headerAlign: 'center',
      width: 190,
      renderCell: (params) => <TextCellGrid>{params.value}</TextCellGrid>,
    },
    {
      field: 'name_vn',
      headerName: 'TÊN (TIẾNG VIỆT)',
      filterable: false,
      align: 'center',
      // sortable: false,
      headerAlign: 'center',
      width: 190,
      renderCell: (params) => <TextCellGrid>{params.value}</TextCellGrid>,
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
      width: 210,
      align: 'right',
      headerAlign: 'right',
      disableColumnMenu: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5}>
          <ActionButton
            type="edit"
            onClick={() =>
              // router.push(`/dashboard/nationals/${params.value}/edit`)
              router.push({
                pathname: `/dashboard/nationals/${params.value}/edit`,
                query: {
                  page: page,
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
    <DataGrid
      sx={{
        '& .mui-style-gu2l4n': {
          backgroundColor: '#F3F4F6',
        },

        '& .mui-style-1qmq5yi-MuiDataGrid-columnHeaders': {
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

        '& .MuiDataGrid-iconSeparator': {
          color: 'rgba(0,0,0,0.5)',
        },

        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },

        '& .MuiDataGrid-row': {
          borderTop: '0.5px solid rgba(0,0,0,0.2)',
        },

        '& .mui-style-1b75ola-MuiDataGrid-footerContainer': {
          borderTop: '0.5px solid rgba(0,0,0,0.5)',
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
      // filterMode="server"
      onSortModelChange={handleSortFromServer}
      // onFilterModelChange={handleFilterFromServer}
      rowCount={totalRows}
      rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
      page={page}
      pageSize={rowsPerPage}
      rows={nationals || []}
      columns={columns}
      onPageChange={onPageChange}
      onPageSizeChange={onRowsPerPageChange}
      disableSelectionOnClick
    />
  )
}

export default NationalsListTableDataGrid
