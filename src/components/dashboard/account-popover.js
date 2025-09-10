import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import { Box, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from '../../hooks/use-auth'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { useTranslation } from 'next-i18next'

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props
  const router = useRouter()
  const { logout } = useAuth()
  const { t } = useTranslation('common')

  const handleLogout = async () => {
    try {
      onClose?.()
      await logout()
      router.push('/')
    } catch (err) {
      toast.error('Unable to logout.')
    }
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
      transformOrigin={{
        vertical: -10,
        horizontal: 'right',
      }}
      keepMounted
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 'max-content' } }}
      transitionDuration={0}
      {...other}
    >
      <Box sx={{ my: 1 }}>
        <MenuItem
          onClick={async () => await router.push(`/${router.locale === 'vi' ? 'ho-so' : 'profile'}`)}
          sx={{ '&:hover svg,&:hover p ': { color: 'primary.main' } }}
        >
          <ListItemIcon sx={{ mr: 1 }}>
            <PersonOutlineRoundedIcon fontSize="medium" />
          </ListItemIcon>
          {t('profile')}
          <ListItemText primary={<Typography variant="body1"></Typography>} />
        </MenuItem>
        <MenuItem
          onClick={async () => {
            await router.push(
              `/${router.locale === 'vi' ? 'danh-gia-san/danh-gia-cua-ban' : 'exchange-review/your-review'}`
            )
            await onClose?.()
          }}
          sx={{ '&:hover svg,&:hover p ': { color: 'primary.main' } }}
        >
          <ListItemIcon sx={{ mr: 1 }}>
            <WarningAmberRoundedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body1">{t('complaints.my')}</Typography>} />
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ '&:hover svg,&:hover p ': { color: 'primary.main' } }}>
          <ListItemIcon sx={{ mr: 1 }}>
            <LogoutIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body1">{t('logOut')}</Typography>} />
        </MenuItem>
      </Box>
    </Popover>
  )
}

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
