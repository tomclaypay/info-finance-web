import { User } from '@app/interfaces/user'
import { Avatar, Box, Chip, Typography } from '@mui/material'
interface UserProfileProps {
  user?: User
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <Avatar
        src={user?.avatar}
        sx={{
          height: 64,
          mr: 2,
          width: 64,
        }}
      />
      <div>
        <Typography noWrap variant="h4">
          {user?.email}
        </Typography>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <Typography variant="subtitle2">user_id:</Typography>
          <Chip label={user?.id} size="small" sx={{ ml: 1 }} />
        </Box>
      </div>
    </Box>
  )
}
