import CustomImage from '@app/components/dashboard/common/custom-image'
import { Complaint } from '@app/interfaces/complaint'
import { Box, Card, CardHeader, Divider, Link, Stack, Typography } from '@mui/material'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined'
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined'
import NextLink from 'next/link'

interface ComplaintContractSectionProps {
  complaint?: Complaint
}

export default function ComplaintContractSection({ complaint }: ComplaintContractSectionProps) {
  const changeFiles = (value: any, type: string) => {
    const files = value.filter(
      (file: any) => file.includes('.pdf') || file.includes('.docx') || file.includes('.txt') || file.includes('.xlsx')
    )

    const images = value.filter(
      (file: any) =>
        !file.includes('.pdf') && !file.includes('.docx') && !file.includes('.txt') && !file.includes('.xlsx')
    )

    if (type === 'image') {
      return images
    }

    if (type === 'file') {
      return files
    }
  }

  return (
    <Card>
      <CardHeader title="Hợp đồng" />
      <Divider />
      <Stack spacing={3} p={3} flexWrap="wrap">
        {/* {complaint?.attachments[0]?.files?.map((file, index) => (
          <NextLink href={file} passHref key={index}>
            <Link target="_blank">
              <Stack direction="row">
                {file.includes('.pdf') ? <PictureAsPdfOutlinedIcon /> : <FilePresentOutlinedIcon />}
                <Typography variant="body2">{file.split('/')[file.split('/').length - 1]}</Typography>
              </Stack>
            </Link>
          </NextLink>
        ))} */}
        <Stack>
          {complaint?.attachments[0]?.files &&
            complaint?.attachments[0].files?.length > 0 &&
            changeFiles(complaint?.attachments[0]?.files, 'file').map((file: any, index: any) => (
              <Link component={NextLink} target="_blank" href={file} passHref key={index}>
                <Stack direction="row">
                  {file.includes('.pdf') ? <PictureAsPdfOutlinedIcon /> : <FilePresentOutlinedIcon />}
                  <Typography variant="body2">{file.split('/')[file.split('/').length - 1]}</Typography>
                </Stack>
              </Link>
            ))}
        </Stack>
        <Stack direction="row" spacing={3}>
          {complaint?.attachments[0]?.files &&
            complaint.attachments[0].files.length > 0 &&
            changeFiles(complaint?.attachments[0]?.files, 'image').map((image: any, index: any) => (
              <CustomImage
                internet={true}
                key={image}
                image={image}
                index={index}
                slides={changeFiles(complaint?.attachments[0]?.files, 'image')}
              />
            ))}
        </Stack>
        {complaint?.attachments?.length === 0 && (
          <Box>
            <Typography>Chưa có hợp đồng</Typography>
          </Box>
        )}
      </Stack>
    </Card>
  )
}
