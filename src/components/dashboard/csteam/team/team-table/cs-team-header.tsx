import { useAuth } from '@app/hooks/use-auth'
import { Download as DownloadIcon } from '@app/icons/download'
import { Plus as PlusIcon } from '@app/icons/plus'
import { Upload as UploadIcon } from '@app/icons/upload'
import { Box, Button, Grid, Typography } from '@mui/material'

interface CsTeamHeaderProps {
  handleCreateCsTeam: () => void
}

export default function CsTeamHeader({ handleCreateCsTeam }: CsTeamHeaderProps) {
  const auth = useAuth()

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container justifyContent="space-between" spacing={3}>
        <Grid item>
          <Typography variant="h4">CS Teams</Typography>
        </Grid>
        {auth?.user?.role === 'super_admin' && (
          <Grid item>
            <Button startIcon={<PlusIcon fontSize="small" />} variant="contained" onClick={handleCreateCsTeam}>
              Tạo CS Team
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
