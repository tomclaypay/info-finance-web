import { COMPLAINT_STATUS } from '@app/constants/complaint'
import { ComplaintLog } from '@app/interfaces/complaint'
import { Card, CardHeader, Divider, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import ComplaintLogRow from './complaint-log-row'

interface ComplaintLogsSectionProps {
  logs?: ComplaintLog[]
  status?: COMPLAINT_STATUS
}

export const ComplaintLogsSection = ({ logs, status }: ComplaintLogsSectionProps) => {
  return (
    <Card>
      <CardHeader title="Lịch sử" />
      <Divider />
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ minWidth: '110px' }}>Người tạo</TableCell>
            <TableCell sx={{ minWidth: '120px' }}>Tên ghi chú</TableCell>
            <TableCell>Ghi chú</TableCell>
            <TableCell sx={{ minWidth: '120px' }}>Thời gian cập nhật</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs?.map((log, index) => (
            <ComplaintLogRow key={index} log={log} />
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
