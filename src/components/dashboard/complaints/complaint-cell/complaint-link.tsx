import { CsMember } from '@app/interfaces/cs-member'
import { Box, Link, Stack, Typography } from '@mui/material'
import NextLink from 'next/link'

interface ComplaintLinkProps {
  id?: string
  content?: CsMember
}

export default function ComplaintLink({ content, id }: ComplaintLinkProps) {
  return (
    <Box>
      {content && id ? (
        <Stack>
          <NextLink href={`/dashboard/csteam/members/${id}`} passHref>
            <Link>{content?.user?.displayName}</Link>
          </NextLink>
          <Typography variant="body2">{content?.user?.email}</Typography>
        </Stack>
      ) : (
        'Chưa có'
      )}
    </Box>
  )
}
