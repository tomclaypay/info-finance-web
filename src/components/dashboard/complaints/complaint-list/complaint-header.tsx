import { useAuth } from '@app/hooks/use-auth'
import { Plus as PlusIcon } from '@app/icons/plus'
import { Box, Button, Grid, Typography } from '@mui/material'
import Link from 'next/link'

interface ComplaintHeaderProps {
  isJoinedCsTeam: boolean
}

export default function ComplaintHeader({ isJoinedCsTeam }: ComplaintHeaderProps) {
  const auth = useAuth()
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container justifyContent="space-between" spacing={3}>
        <Grid item>
          <Typography variant="h4">Quản lý khiếu nại</Typography>
        </Grid>
        {(auth?.user?.role === 'super_admin' || isJoinedCsTeam) && (
          <Grid item>
            <Link href="/dashboard/complaints/create" passHref>
              <Button startIcon={<PlusIcon fontSize="small" />} variant="contained">
                Tạo khiếu nại
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>
      {/* <Box
        sx={{
          m: -1,
          mt: 3,
        }}
      >
        <Button startIcon={<UploadIcon fontSize="small" />} sx={{ m: 1 }}>
          Import
        </Button>
        <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ m: 1 }}>
          Export
        </Button>
      </Box> */}
    </Box>
  )
}
