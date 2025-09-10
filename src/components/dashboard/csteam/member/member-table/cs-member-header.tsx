import { useAuth } from '@app/hooks/use-auth'
import { Plus as PlusIcon } from '@app/icons/plus'
import { Box, Button, Grid, Typography } from '@mui/material'

interface CsMemberHeaderProps {
  handleCsCreateMember: () => void
}

export default function CsMemberHeader({ handleCsCreateMember }: CsMemberHeaderProps) {
  const auth = useAuth()
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container justifyContent="space-between" spacing={3}>
        <Grid item>
          <Typography variant="h4">CS Members</Typography>
        </Grid>
        {auth?.user?.role === 'super_admin' && (
          <Grid item>
            <Button startIcon={<PlusIcon fontSize="small" />} variant="contained" onClick={handleCsCreateMember}>
              Tạo CS Member
            </Button>
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
