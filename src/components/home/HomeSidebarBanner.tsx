import { Box, Typography } from '@mui/material'

interface SidebarBannerProps {
  position: 'left' | 'right'
  text?: string
}

const SidebarBanner = ({ position, text }: SidebarBannerProps) => {
  return (
    <Box
      sx={{
        width: '160px',
        height: '100%', // Điều chỉnh chiều cao phù hợp
        backgroundColor: '#f1f1f1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
        position: 'relative',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        {text || `Banner ${position === 'left' ? 'Trái' : 'Phải'}`}
      </Typography>
    </Box>
  )
}

export default SidebarBanner
