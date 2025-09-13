import { Complaint } from '@app/interfaces/complaint'
import { Box, Card, CardHeader, Divider, Link, List, Typography, useMediaQuery } from '@mui/material'
import { Theme } from '@mui/system'
import { PropertyListItem } from '../property-list-item'
import NextLink from 'next/link'

interface ComplaintHandleSectionProps {
  complaint?: Complaint
}

export const ComplaintHandleSection = ({ complaint }: ComplaintHandleSectionProps) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const align = mdUp ? 'horizontal' : 'vertical'

  return (
    <Box>
      <Card>
        <CardHeader title="Thông tin người xử lý" />
        <Divider />
        <List disablePadding>
          <PropertyListItem align={align} label="Tên người xử lý">
            <Link
              component={NextLink}
              href={`/dashboard/csteam/members/${complaint?.handle_by?.id}`}
              passHref
              target="_blank"
            >
              <Typography color="primary.main" fontWeight="500" variant="body2" sx={{ cursor: 'pointer' }}>
                {complaint?.handle_by?.user?.displayName}
              </Typography>
            </Link>
          </PropertyListItem>
        </List>
      </Card>
    </Box>
  )
}
