import { Tooltip, Typography, TypographyProps } from '@mui/material'
import { ReactNode } from 'react'

interface IProps {
  children: string | ReactNode
  typographyProps?: TypographyProps
  fontWeight?: string
  color?: string
  wrap?: boolean
}

const TextCellGrid = ({ children, color, typographyProps, fontWeight, wrap }: IProps) => (
  <Tooltip title={children || '...'}>
    <Typography
      color={color ? color : 'text.primary'}
      noWrap={wrap ? false : true}
      fontWeight={fontWeight}
      textAlign={wrap ? 'center' : 'left'}
      variant="body2"
      {...typographyProps}
      whiteSpace={wrap ? 'normal' : 'nowrap'}
    >
      {children || '...'}
    </Typography>
  </Tooltip>
)

export default TextCellGrid
