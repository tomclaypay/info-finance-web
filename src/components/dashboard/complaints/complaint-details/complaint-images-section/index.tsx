import CustomImage from '@app/components/dashboard/common/custom-image'
import { Complaint } from '@app/interfaces/complaint'
import { Box, Card, CardHeader, Divider, Stack, Typography } from '@mui/material'

interface ComplaintImagesSectionProps {
  complaint?: Complaint
}

export default function ComplaintImagesSection({ complaint }: ComplaintImagesSectionProps) {
  return (
    <Card>
      <CardHeader title="Hình ảnh liên quan" />
      <Divider />
      <Stack direction="row" spacing={3} p={3} flexWrap="wrap">
        {complaint?.images?.map((image, index) => (
          <CustomImage internet={true} key={image} image={image} index={index} slides={complaint?.images} />
        ))}
        {complaint?.images?.length === 0 && (
          <Box>
            <Typography>Chưa có hình ảnh nào</Typography>
          </Box>
        )}
      </Stack>
    </Card>
  )
}
