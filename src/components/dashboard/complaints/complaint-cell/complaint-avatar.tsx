import { User } from '@app/interfaces/user'
import { getInitials } from '@app/utils/get-initials'
import { Avatar, Box, Link, Typography } from '@mui/material'
import NextLink from 'next/link'

interface ComplaintAvatarProps {
  id: string
  email: string
  fullname?: string
  user?: User
}

export default function ComplaintAvatar({ id, email, fullname, user }: ComplaintAvatarProps) {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
      }}
    >
      {user?.avatar ? (
        <Avatar
          src={user?.avatar}
          sx={{
            height: 42,
            width: 42,
          }}
        />
      ) : (
        <Avatar
          sx={{
            height: 42,
            width: 42,
          }}
        >
          {fullname && getInitials(fullname)}
        </Avatar>
      )}

      <Box sx={{ ml: 1 }}>
        <NextLink href={`/dashboard/complaints/${id}`} passHref>
          <Link color="inherit" variant="subtitle2">
            {fullname}
          </Link>
        </NextLink>
        <Typography color="textSecondary" variant="body2">
          {email}
        </Typography>
      </Box>
    </Box>
  )
}
