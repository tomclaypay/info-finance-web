import { COMPLAINT_STATUS } from '@app/constants/complaint'
import { useAuth } from '@app/hooks/use-auth'
import { PencilAlt as PencilAltIcon } from '@app/icons/pencil-alt'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import NextLink from 'next/link'
import { useState } from 'react'
import ComplaintUploadContractDialog from '../complaint-dialogs/complaint-upload-contract-dialog'
import { DeleteForever } from '@mui/icons-material'

interface ComplaintActionsProps {
  id: string
  status: COMPLAINT_STATUS
  complaintOutSideTeam?: boolean
  hidden?: boolean
  highlight_on_broker?: boolean
  handledByMemberId?: boolean
  onChangeHiddenComplaint: (complaintId: string, hidden: boolean) => void
  onChangeHighlightComplaint: (complaintId: string, highlight_on_broker: boolean) => void
  onDeleteComplaint: (complaintId: string) => void
  page: number
  limit: number
}

export default function ComplaintActions({
  id,
  status,
  complaintOutSideTeam,
  handledByMemberId,
  onChangeHiddenComplaint,
  highlight_on_broker,
  onChangeHighlightComplaint,
  onDeleteComplaint,
  hidden,
  page,
  limit,
}: ComplaintActionsProps) {
  const auth = useAuth()
  const [open, setOpen] = useState(false)
  const [openHiddenPopup, setOpenHiddenPopup] = useState({
    hidden: false,
    hightLight: false,
    delete: false,
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangeHiddenComplaint = (id: string) => {
    onChangeHiddenComplaint(id, !hidden)
    setOpenHiddenPopup({
      hidden: false,
      hightLight: false,
      delete: false,
    })
  }

  const handleChangeHighlightComplaint = (id: string) => {
    onChangeHighlightComplaint(id, !highlight_on_broker)
    setOpenHiddenPopup({
      hidden: false,
      hightLight: false,
      delete: false,
    })
  }

  const handleDeleteComplaint = (id: string) => {
    onDeleteComplaint && onDeleteComplaint(id)
    setOpenHiddenPopup({
      hidden: false,
      hightLight: false,
      delete: false,
    })
  }

  return (
    <Stack direction="row">
      {auth?.user?.role === 'super_admin' || !complaintOutSideTeam ? (
        <NextLink
          href={{
            pathname: `/dashboard/complaints/${id}/edit`,
            query: { handledByMemberId, page, limit },
          }}
          passHref
        >
          <IconButton component="a">
            <Tooltip title="Cập nhật">
              <PencilAltIcon fontSize="small" />
            </Tooltip>
          </IconButton>
        </NextLink>
      ) : null}

      <NextLink href={{ pathname: `/dashboard/complaints/${id}`, query: { page, limit } }} passHref>
        <IconButton component="a">
          <Tooltip title="Chi tiết">
            <ArrowForwardIcon fontSize="small" />
          </Tooltip>
        </IconButton>
      </NextLink>

      {(auth?.user?.role === 'super_admin' || handledByMemberId) && (
        <>
          <IconButton
            onClick={() =>
              setOpenHiddenPopup({
                hidden: true,
                hightLight: false,
                delete: false,
              })
            }
          >
            <Tooltip title={hidden ? 'Hiển thị khiếu nại' : 'Ẩn khiếu nại'}>
              {hidden ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
            </Tooltip>
          </IconButton>
        </>
      )}

      {auth?.user?.role === 'super_admin' && (
        <IconButton
          onClick={() =>
            setOpenHiddenPopup({
              hidden: false,
              hightLight: true,
              delete: false,
            })
          }
        >
          <Tooltip title={highlight_on_broker ? 'Nổi bật trên trang sàn' : 'Không nổi bật trên trang sàn'}>
            <StarRoundedIcon
              fontSize="small"
              sx={{
                color: highlight_on_broker ? 'secondary.main' : 'unactive.main',
              }}
            />
          </Tooltip>
        </IconButton>
      )}

      {auth?.user?.role === 'super_admin' && (
        <IconButton
          onClick={() =>
            setOpenHiddenPopup({
              hidden: false,
              hightLight: false,
              delete: true,
            })
          }
        >
          <Tooltip title="Xóa khiếu nại!">
            <DeleteForever
              fontSize="small"
              sx={{
                color: 'unactive.main',
              }}
            />
          </Tooltip>
        </IconButton>
      )}

      {status === COMPLAINT_STATUS.CONTRACT_REQUESTED && (handledByMemberId || auth?.user?.role === 'super_admin') ? (
        <IconButton onClick={handleClickOpen}>
          <Tooltip title="Tải lên hợp đồng">
            <UploadFileIcon fontSize="small" />
          </Tooltip>
        </IconButton>
      ) : null}

      <ComplaintUploadContractDialog complaintId={id} open={open} handleClose={handleClose} />

      <Dialog
        maxWidth="xs"
        open={openHiddenPopup.hidden || openHiddenPopup.hightLight || openHiddenPopup.delete}
        onClose={() => setOpenHiddenPopup({ hidden: false, hightLight: false, delete: false })}
      >
        <DialogTitle>
          <Stack direction="row" alignContent="flex-end">
            {openHiddenPopup.hidden && (
              <Typography variant="h4" mr={0.5}>
                {!hidden ? 'Xác nhận ẩn khiếu nại' : 'Xác nhận hiển thị khiếu nại'}
              </Typography>
            )}

            {openHiddenPopup.hightLight && (
              <Typography variant="h4" mr={0.5}>
                {!highlight_on_broker ? 'Xác nhận nổi bật khiếu nại' : 'Xác nhận không nổi bật khiếu nại'}
              </Typography>
            )}

            {openHiddenPopup.delete && (
              <Typography variant="h4" mr={0.5}>
                Xác nhận xóa khiếu nại
              </Typography>
            )}
          </Stack>
        </DialogTitle>
        <Divider />
        {openHiddenPopup.hidden && (
          <DialogContent>
            {hidden ? (
              <Typography variant="body2">
                Thao tác sẽ khiến khiếu nại này <b>hiển thị</b> lên website và sẽ ảnh hưởng đến số liệu của sàn trên
                Website
              </Typography>
            ) : (
              <Typography variant="body2">
                Thao tác sẽ khiến khiếu nại này <b>không hiển thị</b> lên website và sẽ ảnh hưởng đến số liệu của sàn
                trên Website
              </Typography>
            )}
            <Typography variant="body2">Bạn có muốn tiếp tục thao tác?</Typography>
          </DialogContent>
        )}

        {openHiddenPopup.hightLight && (
          <DialogContent>
            {!highlight_on_broker ? (
              <Typography variant="body2">
                Thao tác sẽ làm khiếu nại này <b>nổi bật</b> lên trang sàn trên Website
              </Typography>
            ) : (
              <Typography variant="body2">
                Thao tác sẽ làm khiếu nại này <b>không nổi bật</b> lên trang sàn trên Website
              </Typography>
            )}

            <Typography variant="body2">Bạn có muốn tiếp tục thao tác?</Typography>
          </DialogContent>
        )}

        {openHiddenPopup.delete && (
          <DialogContent>
            <Typography variant="body2">
              Thao tác sẽ khiến khiếu nại này <b>xóa khỏi hệ thống</b> và sẽ ảnh hưởng đến số liệu của sàn trên Website
            </Typography>
          </DialogContent>
        )}

        <DialogActions>
          <Stack flex={1} direction="row" spacing={2} justifyContent="space-between">
            <Button
              // disabled={isSubmitting || disabled}
              type="submit"
              variant="contained"
              fullWidth
              color={openHiddenPopup.delete ? 'error' : 'primary'}
              sx={{ textTransform: 'capitalize' }}
              onClick={() => {
                if (openHiddenPopup.hidden) {
                  handleChangeHiddenComplaint(id)
                }

                if (openHiddenPopup.hightLight) {
                  handleChangeHighlightComplaint(id)
                }
                if (openHiddenPopup.delete) {
                  handleDeleteComplaint(id)
                }
              }}
            >
              {openHiddenPopup.delete ? 'Xóa khiếu nại' : 'Xác nhận'}
            </Button>
            <Button
              // disabled={isSubmitting || disabled}
              variant="outlined"
              fullWidth
              onClick={() => setOpenHiddenPopup({ hidden: false, hightLight: false, delete: false })}
            >
              Đóng
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}
