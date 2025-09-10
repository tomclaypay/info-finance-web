import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import StarIcon from '@mui/icons-material/Star'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Box, IconButton, Tooltip } from '@mui/material'
import { MouseEventHandler, ReactNode } from 'react'

type IActionTypes =
  | 'edit'
  | 'comment'
  | 'remove'
  | 'approve'
  | 'reject'
  | 'show'
  | 'hidden'
  | 'copy'
  | 'detail'
  | 'email'
  | 'user'
  | 'hightLights'
  | string

interface IProps {
  type?: IActionTypes
  customLabel?: string
  customIcon?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  color?: string
  active?: boolean
}

const actionIcons = {
  edit: CreateOutlinedIcon,
  comment: CommentOutlinedIcon,
  remove: DeleteOutlinedIcon,
  approve: CheckIcon,
  reject: ClearIcon,
  show: VisibilityIcon,
  hidden: VisibilityOffIcon,
  copy: ContentCopyIcon,
  detail: ArrowForwardIcon,
  email: EmailIcon,
  user: PersonIcon,
  hightLights: StarIcon,
}

const actionLabel = {
  edit: 'Sửa',
  remove: 'Xoá',
  comment: 'Xem đánh giá',
  approve: 'Chấp thuận',
  reject: 'Từ chối',
  show: 'Hiện',
  hidden: 'Ẩn',
  detail: 'Chi tiết',
  email: 'Gửi email',
  user: 'Danh sách người dùng đăng ký',
  hightLights: 'Nổi bật',
}

const ActionButton = ({ type, customLabel, customIcon, onClick, color }: IProps) => {
  const label = customLabel || actionLabel[type]
  const icon = customIcon || actionIcons[type]

  return (
    <Tooltip title={label}>
      {color ? (
        <IconButton
          sx={{
            border: `1px solid ${color}`,
            borderRadius: 1.5,
            boxShadow: '0 0 4px 1px rgba(0,0,0,0.05)',
            backgroundColor: color,
            '&:hover': { backgroundColor: color },
          }}
          onClick={onClick}
        >
          <Box component={icon} sx={{ color: 'white', fontSize: 20 }} />
        </IconButton>
      ) : (
        <IconButton
          sx={{
            border: `1px solid rgba(0,0,0,0.5)`,
            borderRadius: 1.5,
            boxShadow: '0 0 4px 1px rgba(0,0,0,0.05)',
          }}
          onClick={onClick}
        >
          <Box component={icon} sx={{ color: 'text.primary', fontSize: 20 }} />
        </IconButton>
      )}
    </Tooltip>
  )
}

export default ActionButton
