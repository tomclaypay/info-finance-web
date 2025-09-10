import { OBJECT_TYPE, UPLOAD_TYPE } from '@app/constants/common'
import { COMPLAINT_STATUS } from '@app/constants/complaint'
import ComplaintProvider from '@app/contexts/complaint-context'
import UploadFileProvider from '@app/contexts/upload-file-context'
import { UpdatingCancelRequest } from '@app/interfaces/cancel-request'
import { Complaint, UpdatingComplaintStatus, UploadingComplaintContract } from '@app/interfaces/complaint'
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material'
import { withStyles } from '@mui/styles'
import { format, parseISO } from 'date-fns'
import ComplaintActions from '../complaint-cell/complaint-action'
import ComplaintAvatar from '../complaint-cell/complaint-avatar'
import ComplaintCancelStatus from '../complaint-cell/complaint-cancel-status'
import ComplaintLink from '../complaint-cell/complaint-link'
import ComplaintText from '../complaint-cell/complaint-text'
import ComplaintUpdateStatus from '../complaint-cell/complaint-update-status'

interface ComplaintListTableProps {
  complaints?: Complaint[]
  dataComplaintByMemberId?: Complaint[]
  dataComplaintOutSideTeam?: Complaint[]
  page: number
  totalRows?: number
  rowsPerPage: number
  updateComplaintLoading: boolean
  onPageChange: (event: any, newPage: number) => void
  onChangeHiddenComplaint: (complaintId: string, hidden: boolean) => void
  onChangeHighlightComplaint: (complaintId: string, highlight_on_broker: boolean) => void
  onDeleteComplaint: (complaintId: string) => void
  onRowsPerPageChange: (event: any) => void
  onUpdateComplaintStatus: (complaint: UpdatingComplaintStatus) => void
  onUploadContract: (contract: UploadingComplaintContract) => void
  onUpdateCancelRequest: (cancelRequest: UpdatingCancelRequest) => void
}

const ComplaintListTable = (props: ComplaintListTableProps) => {
  const {
    page,
    totalRows,
    rowsPerPage,
    complaints,
    updateComplaintLoading,
    onPageChange,
    onRowsPerPageChange,
    onUpdateComplaintStatus,
    onChangeHiddenComplaint,
    onChangeHighlightComplaint,
    onDeleteComplaint,
    onUploadContract,
    onUpdateCancelRequest,
    dataComplaintByMemberId,
    dataComplaintOutSideTeam,
  } = props

  const StickyTableCell = withStyles(() => ({
    head: {
      right: 0,
      position: 'sticky',
    },
    body: {
      right: 0,
      position: 'sticky',
    },
  }))(TableCell)

  return (
    <>
      <Table sx={{ minWidth: 700, position: 'relative', overflowX: 'scroll' }}>
        <TableHead>
          <TableRow>
            <TableCell>Thông tin người tạo</TableCell>
            <TableCell>Người xử lý</TableCell>
            <TableCell>Tên khiếu nại</TableCell>
            <TableCell sx={{ width: '100px' }}>Loại khiếu nại</TableCell>
            <TableCell>Số điện thoại</TableCell>
            <TableCell>Tên sàn</TableCell>
            <TableCell>Slug</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Ngày gửi</TableCell>
            <StickyTableCell
              sx={{
                backgroundColor: '#F3F4F6',
              }}
            >
              <TableCell>Hành động</TableCell>
              <TableCell align="right">Cập nhật trạng thái</TableCell>
            </StickyTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {complaints?.map((complaint) => {
            const {
              id,
              title,
              email,
              fullname,
              slug,
              phone,
              createdAt,
              status,
              exchange,
              handle_by,
              user,
              category,
              hidden,
              highlight_on_broker,
            } = complaint

            const handledByMemberId = !!dataComplaintByMemberId?.find((complaint) => complaint.id === id)
            const complaintOutSideTeam = !!dataComplaintOutSideTeam?.find((complaint) => complaint.id === id)
            return (
              <ComplaintProvider
                key={id}
                complaint={complaint}
                updateComplaintLoading={updateComplaintLoading}
                onUpdateComplaintStatus={onUpdateComplaintStatus}
                onUploadContract={onUploadContract}
                onUpdateCancelRequest={onUpdateCancelRequest}
              >
                <UploadFileProvider
                  objectId={complaint.id}
                  type={UPLOAD_TYPE.DOCUMENT}
                  objectType={OBJECT_TYPE.COMPLAINT}
                >
                  <TableRow
                    hover
                    sx={{
                      backgroundColor: status === COMPLAINT_STATUS.PENDING ? '#FFE9E6' : 'transparent',
                    }}
                  >
                    <TableCell>
                      <ComplaintAvatar id={id} email={email} user={user} fullname={fullname} />
                    </TableCell>
                    <TableCell>
                      <ComplaintLink content={handle_by} id={handle_by?.id} />
                    </TableCell>
                    <TableCell>
                      <ComplaintText content={title} />
                    </TableCell>
                    <TableCell>
                      <ComplaintText content={category?.name} />
                    </TableCell>
                    <TableCell width={50}>
                      <ComplaintText content={phone} />
                    </TableCell>
                    <TableCell>
                      <ComplaintText content={exchange?.name} />
                    </TableCell>
                    <TableCell>
                      <ComplaintText content={slug} />
                    </TableCell>
                    <TableCell>
                      <ComplaintCancelStatus status={status} />
                    </TableCell>
                    <TableCell>
                      <ComplaintText content={format(parseISO(createdAt), 'dd/MM/yyyy')} />
                    </TableCell>
                    <StickyTableCell
                      sx={{
                        backgroundColor: status === COMPLAINT_STATUS.PENDING ? '#FFE9E6' : '#FFFFFF',
                      }}
                    >
                      <TableCell
                        sx={{
                          borderBottom: 'none',
                        }}
                      >
                        <ComplaintActions
                          id={id}
                          page={page}
                          limit={rowsPerPage}
                          status={status}
                          hidden={hidden}
                          highlight_on_broker={highlight_on_broker}
                          complaintOutSideTeam={complaintOutSideTeam}
                          handledByMemberId={handledByMemberId}
                          onChangeHiddenComplaint={onChangeHiddenComplaint}
                          onDeleteComplaint={onDeleteComplaint}
                          onChangeHighlightComplaint={onChangeHighlightComplaint}
                        />
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          borderBottom: 'none',
                        }}
                      >
                        <ComplaintUpdateStatus handledByMemberId={handledByMemberId} />
                      </TableCell>
                    </StickyTableCell>
                  </TableRow>
                </UploadFileProvider>
              </ComplaintProvider>
            )
          })}
        </TableBody>
      </Table>
      <TablePagination
        labelRowsPerPage="Số hàng trên 1 trang"
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

export default ComplaintListTable
