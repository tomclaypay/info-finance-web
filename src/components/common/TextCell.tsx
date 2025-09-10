import { Tooltip, Typography, TypographyProps } from '@mui/material'
import { ReactNode } from 'react'

interface IProps {
  children: string | ReactNode
  typographyProps?: TypographyProps
}

const TextCell = ({ children, typographyProps }: IProps) => (
  <Tooltip title={children || 'Chưa cập nhật'}>
    <Typography color={children ? 'text.primary' : 'text.secondary'} noWrap variant="subtitle2" {...typographyProps}>
      {children || 'Chưa cập nhật'}
    </Typography>
  </Tooltip>
)

export default TextCell
