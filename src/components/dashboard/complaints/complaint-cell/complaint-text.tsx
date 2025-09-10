import { Box } from '@mui/material'

interface ComplaintTextProps {
  content?: string
  bold?: boolean
}

export default function ComplaintText({ content }: ComplaintTextProps) {
  return <Box>{content || 'Chưa cập nhật'}</Box>
}
