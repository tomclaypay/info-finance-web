import { CsMember } from '@app/interfaces/cs-member'
import { Card, CardHeader, Divider, Link, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import NextLink from 'next/link'

interface ComplaintHandleLogProps {
  handledBy?: CsMember
}

export const ComplaintHandleLog = ({ handledBy }: ComplaintHandleLogProps) => {
  return (
    <Card>
      <CardHeader title="Lịch sử" />
      <Divider />
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ minWidth: '110px' }}>Người xử lý</TableCell>
            <TableCell sx={{ minWidth: '120px' }}>Người chia quyền</TableCell>
            {/* <TableCell>Ghi chú</TableCell> */}
            <TableCell sx={{ minWidth: '120px' }}>Thời gian cập nhật</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {handledBy?.id ? (
            <>
              <TableCell sx={{ minWidth: '110px' }}>
                <NextLink href={`/dashboard/csteam/members/${handledBy?.id}`} passHref>
                  <Link target="_blank" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                    {handledBy?.user?.displayName}
                  </Link>
                </NextLink>
              </TableCell>
              <TableCell sx={{ minWidth: '120px' }}>Chưa cập nhập</TableCell>
              {/* <TableCell>Ghi chú</TableCell> */}
              <TableCell sx={{ minWidth: '120px' }}>Thời gian cập nhật</TableCell>
            </>
          ) : (
            <TableCell sx={{ minWidth: '120px' }}>Chưa có người xử lý</TableCell>
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
