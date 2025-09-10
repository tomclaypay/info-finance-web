import { ROWS_PER_PAGE_OPTIONS } from '@app/components/common'
import TextCellGrid from '@app/components/common/TextCellGrid'
import ThumbnailCell from '@app/components/common/ThumbnailCell'
import ActionButton from '@app/components/dashboard/common/action-button'
import { License } from '@app/interfaces/license'
import { Stack } from '@mui/material'
// import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro'
import { format, parseISO } from 'date-fns'
import { useRouter } from 'next/router'

interface NationalsListTableDataGridProps {
  licenses?: License[]
  totalRows?: number
  rowsPerPage: number
  page: number
  onPaginationModelChange: (model: any, details: any) => void
  handleSortFromServer?: (column: any) => void
}

const LicensesListTableDataGrid = (props: NationalsListTableDataGridProps) => {
  const { licenses, totalRows, page, rowsPerPage, onPaginationModelChange, handleSortFromServer } = props
  const router = useRouter()

  const columns: GridColDef[] = [
    // {
    //   field: 'exchange',
    //   headerName: 'LOGO SÀN',
    //   filterable: false,
    //   sortable: false,
    //   width: 180,
    //   renderCell: (params: any) => <ThumbnailCell src={params.value?.logo} />,
    // },
    {
      field: 'supervision_license',
      headerName: 'SỐ GIẤY PHÉP',
      filterable: false,
      align: 'center',
      // sortable: false,
      headerAlign: 'center',
      width: 190,
      renderCell: (params) => <TextCellGrid>{params.value}</TextCellGrid>,
    },
    {
      field: 'exchange',
      headerName: 'SÀN GIAO DỊCH',
      filterable: false,
      align: 'left',
      sortable: false,
      headerAlign: 'center',
      width: 250,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center">
          <ThumbnailCell src={params.value?.logo} />
          <TextCellGrid>{params.value?.name}</TextCellGrid>
        </Stack>
      ),
    },
    {
      field: 'supervisory_authority',
      headerName: 'CƠ QUAN GIÁM SÁT ',
      filterable: false,
      align: 'center',
      sortable: false,
      headerAlign: 'center',
      width: 190,
      renderCell: (params) => <TextCellGrid wrap={true}>{params.value?.abbreviation_name}</TextCellGrid>,
    },

    // {
    //   field: 'icon',
    //   headerName: 'ICON',
    //   filterable: false,
    //   sortable: false,
    //   width: 180,
    //   renderCell: (params: any) => <ThumbnailCell src={params.value} />,
    // },
    {
      field: 'status',
      headerName: 'TÌNH TRẠNG',
      filterable: false,
      align: 'center',
      // sortable: false,
      headerAlign: 'center',
      width: 230,
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
      field: 'user_update',
      headerName: 'NGƯỜI CHỈNH SỬA CUỐI',
      filterable: false,
      align: 'center',
      sortable: false,
      headerAlign: 'center',
      width: 190,
      renderCell: (params) => <TextCellGrid>{params.value?.email}</TextCellGrid>,
    },
    {
      field: 'id',
      sortable: false,
      filterable: false,
      headerName: 'HÀNH ĐỘNG',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5}>
          <ActionButton
            type="edit"
            onClick={() =>
              router.push({
                pathname: `/dashboard/licenses/${params.value}/edit`,
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
      rows={licenses || []}
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

export default LicensesListTableDataGrid
