import { useAuth } from '@app/hooks/use-auth'
import { Complaint } from '@app/interfaces/complaint'
import { Box, Card, CardHeader, Divider, List, useMediaQuery } from '@mui/material'
import { Stack, Theme } from '@mui/system'
import ComplaintUpdateStatus from '../../complaint-cell/complaint-update-status'
import { PropertyListItem } from '../property-list-item'

interface ComplaintDetailsSectionProps {
  complaint?: Complaint
}

export const ComplaintDetailsSection = ({ complaint }: ComplaintDetailsSectionProps) => {
  const auth = useAuth()
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const align = mdUp ? 'horizontal' : 'vertical'

  return (
    <Box>
      <Card>
        <CardHeader title="Thông tin khiếu nại" />
        <Divider />
        <List disablePadding>
          <PropertyListItem align={align} label="Tên người khiếu nại" value={complaint?.user?.displayName} />
          <PropertyListItem align={align} label="Email người khiếu nại" value={complaint?.user?.email} />
          <PropertyListItem align={align} label="Số điện thoại" value={complaint?.user?.phone} />
          <PropertyListItem align={align} label="Tên khiếu nại" value={complaint?.title} />
          <PropertyListItem align={align} label="Sàn" value={complaint?.exchange?.name} />
          <PropertyListItem align={align} label="Loại khiếu nại" value={complaint?.category?.name} />
          {complaint?.status && (
            <Stack direction="row">
              <PropertyListItem
                align={align}
                label="Trạng thái"
                style={true}
                value={complaint?.status}
                cancel={complaint?.cancelRequests?.[0]}
              />
              <ComplaintUpdateStatus
                handledByMemberId={complaint?.handle_by?.user?.id === auth?.user?.id ? true : false}
              />
            </Stack>
          )}
          {complaint?.description && (
            <PropertyListItem align={align} parse={true} label="Nội dung khiếu nại" value={complaint?.description} />
          )}
          {complaint?.closeReason && (
            <PropertyListItem align={align} label="Lý do đóng" value={complaint?.closeReason} />
          )}
          {complaint?.cancelRequests && complaint?.cancelRequests?.length > 0 && (
            <PropertyListItem align={align} label="Lý do huỷ khiếu nại" value={complaint?.cancelRequests?.[0].reason} />
          )}
          <PropertyListItem align={align} label="Website" value={complaint?.website} />
        </List>
      </Card>
    </Box>
  )
}
