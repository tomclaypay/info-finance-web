import { Box, Button, ButtonProps } from '@mui/material'
import { FC } from 'react'

interface ISocialLoginButtonProps extends ButtonProps {
  icon: any
}

const SocialLoginButton: FC<ISocialLoginButtonProps> = ({ icon, ...rest }) => {
  return (
    <Button
      startIcon={
        <Box component="img" src={icon} alt="social-login-button" width={22} />
      }
      variant="outlined"
      {...rest}
    >
      {rest.children}
    </Button>
  )
}

export default SocialLoginButton
