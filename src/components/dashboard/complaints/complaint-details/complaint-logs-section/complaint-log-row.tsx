import CustomImage from '@app/components/dashboard/common/custom-image'
import { ComplaintLog } from '@app/interfaces/complaint'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Link, Stack, Typography } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { format } from 'date-fns'
import { Fragment, useState } from 'react'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined'
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined'
import NextLink from 'next/link'

interface ComplaintLogRowProps {
  log: ComplaintLog
}

function ComplaintLogRow({ log }: ComplaintLogRowProps) {
  const [open, setOpen] = useState(false)
  const changeFiles = (value: any, type: string) => {
    const files = value.filter(
      (file: any) => file.includes('.pdf') || file.includes('.docx') || file.includes('.txt') || file.includes('.xlsx')
    )
    const images = value.filter(
      (file: any) =>
        !file.includes('.pdf') && !file.includes('.docx') && !file.includes('.txt') && !file.includes('.xlsx')
    )

    if (type === 'image') {
      return images
    }

    if (type === 'file') {
      return files
    }
  }

  return (
    <Fragment key={log.id}>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>{log.user.fullname || log.user.displayName}</TableCell>
        <TableCell>{log?.name}</TableCell>
        <TableCell>{log.note}</TableCell>
        <TableCell>{format(new Date(log.createdAt), 'HH:mm - dd/MM')}</TableCell>
        <TableCell>
          {log.attachments.length > 0 && (
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Stack spacing={3} py={2} flexWrap="wrap">
              <Stack>
                {log.attachments.length > 0 &&
                  changeFiles(log.attachments, 'file').map((file: any, index: any) => (
                    <NextLink href={file} passHref key={index}>
                      <Link target="_blank">
                        <Stack direction="row">
                          {file.includes('.pdf') ? <PictureAsPdfOutlinedIcon /> : <FilePresentOutlinedIcon />}
                          <Typography variant="body2">{file.split('/')[file.split('/').length - 1]}</Typography>
                        </Stack>
                      </Link>
                    </NextLink>
                  ))}
              </Stack>
              <Stack direction="row" spacing={3}>
                {log.attachments.length > 0 &&
                  changeFiles(log.attachments, 'image').map((image: any, index: any) => (
                    <CustomImage
                      image={image}
                      key={image}
                      index={index}
                      internet={true}
                      slides={changeFiles(log.attachments, 'image')}
                    />
                  ))}
              </Stack>
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default ComplaintLogRow
