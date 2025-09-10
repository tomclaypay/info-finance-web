import { PropertyListItem } from '@app/components/dashboard/complaints/complaint-details/property-list-item'
import { COMPLAINT_STATUS, COMPLAINT_STATUS_COLOR, COMPLAINT_STATUS_LABEL } from '@app/constants/complaint'
import { Complaint } from '@app/interfaces/complaint'
import { Exchange } from '@app/interfaces/exchange'
import { Feedback } from '@app/interfaces/feedback'
import { License } from '@app/interfaces/license'
import {
  Box,
  Card,
  CardHeader,
  Divider,
  List,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Theme } from '@mui/system'
import { useRouter } from 'next/router'

interface ExchangeDetailProps {
  exchange: Exchange
}

export const ExchangeDashboardDetail = ({ exchange }: ExchangeDetailProps) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const align = mdUp ? 'horizontal' : 'vertical'
  const router = useRouter()

  const transferTopBrokerPositions = (position: number) => {
    if (position === 1) {
      return 'Trái'
    }
    if (position === 2) {
      return 'Giữa'
    }
    if (position === 3) {
      return 'Phải'
    }
  }

  const transferTraderAllChoosePositions = (position: number) => {
    if (position === 1) {
      return 'Trên bên trái'
    }
    if (position === 2) {
      return 'Trên bên phải'
    }
    if (position === 3) {
      return 'Dưới bên phải'
    }

    if (position === 4) {
      return 'Dưới bên trái'
    }
  }

  return (
    <Box>
      <Card>
        <CardHeader title="Tra cứu sàn giao dịch" />
        <Divider />
        <List disablePadding>
          <PropertyListItem align={align} label="Tên sàn giao dịch" value={exchange?.name} />
          <PropertyListItem align={align} label="Tên viết tắt" value={exchange?.abbreviation} />
          <PropertyListItem align={align} label="Website" value={exchange?.website} />
          <PropertyListItem align={align} label="Quốc gia" value={exchange?.national?.name} />
          <PropertyListItem align={align} label="Tình trạng giám sát" value={exchange?.supervision_status} />
          <PropertyListItem align={align} label="Thời gian giám sát" value={exchange?.supervision_time} />
          <PropertyListItem align={align} label="Nền tản giao dịch" value={exchange?.trading_platform?.toString()} />
          <PropertyListItem align={align} label="Sản phẩm giao dịch" value={exchange?.trading_product?.toString()} />
          <PropertyListItem align={align} label="Email hỗ trợ" value={exchange?.email} />
          <PropertyListItem align={align} label="Điện thoại liên hệ" value={exchange?.phone} />
          {exchange?.is_top_broker && exchange.rate_top_broker && (
            <PropertyListItem
              align={align}
              label="Hiển thị sàn môi giới hàng đầu"
              value={transferTopBrokerPositions(exchange.rate_top_broker)}
            />
          )}

          {exchange?.is_trader_all_choose && exchange.rate_trader_all_choose && (
            <PropertyListItem
              align={align}
              label="Hiển thị sàn môi giới hàng đầu"
              value={transferTraderAllChoosePositions(exchange.rate_trader_all_choose)}
            />
          )}
        </List>
      </Card>

      <Card sx={{ mt: 5 }}>
        <CardHeader title={`Giấy phép (${exchange?.licenses_aggregate.aggregate.count})`} />
        <Divider />
        {exchange?.licenses_aggregate.aggregate.count > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cơ quan giám sát</TableCell>
                <TableCell align="center">Số giấy phép</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exchange?.licenses?.map((license: License) => {
                const { id, supervisory_authority, supervision_license } = license
                return (
                  <TableRow
                    hover
                    key={id}
                    sx={{
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      router.push({
                        pathname: '/dashboard/licenses',
                        query: {
                          licenseNumber: supervision_license,
                        },
                      })
                    }
                  >
                    <TableCell
                      sx={{
                        width: '80%',
                      }}
                    >
                      <Typography
                        sx={{
                          cursor: 'pointer',
                          color: 'primary.main',
                          fontWeight: 'bold',
                          fontSize: '14px',
                        }}
                      >
                        {supervisory_authority.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ width: '20%' }}>
                      <Typography variant="body2">{supervision_license}</Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          <>
            <List disablePadding>
              <PropertyListItem align={align} label="Giấy phép" value="Sàn đang không có giấy phép" />
            </List>
          </>
        )}
      </Card>

      <Card sx={{ mt: 5 }}>
        <CardHeader
          title={`Thông tin các khiếu nại gửi đến sàn (${exchange?.complaints_aggregate?.aggregate?.count})`}
        />
        <Divider />
        {exchange?.complaints.length && exchange?.complaints.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên khiếu nại</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exchange?.complaints?.map((complaint: Complaint) => {
                const { id, title, status, cancelRequests } = complaint
                return (
                  <TableRow
                    hover
                    key={id}
                    sx={{
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      router.push({
                        pathname: '/dashboard/complaints',
                        query: {
                          complaintTile: title,
                        },
                      })
                    }
                  >
                    <TableCell
                      sx={{
                        width: '80%',
                      }}
                    >
                      <Typography
                        sx={{
                          color: 'primary.main',
                          fontWeight: 'bold',
                          fontSize: '14px',
                        }}
                      >
                        {title}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ width: '20%' }}>
                      <Stack
                        alignItems="center"
                        sx={{
                          py: 0.5,
                          borderRadius: '10px',
                          bgcolor:
                            cancelRequests?.[0]?.status === 'pending'
                              ? '#FFCD1A'
                              : COMPLAINT_STATUS_COLOR[status as COMPLAINT_STATUS],
                          color: cancelRequests?.[0]?.status === 'pending' ? 'black' : 'white',
                          fontWeight: 600,
                          textAlign: 'center',
                          px: 5,
                        }}
                      >
                        {cancelRequests?.[0]?.status === 'pending'
                          ? 'Yêu cầu huỷ'
                          : COMPLAINT_STATUS_LABEL[status as COMPLAINT_STATUS]}
                      </Stack>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          <>
            <List disablePadding>
              <PropertyListItem align={align} label="Tên khiếu nại" value="Đang không khiếu nại nào gửi đến sàn" />
            </List>
          </>
        )}
      </Card>
      {exchange?.complaints?.length < exchange?.complaints_aggregate?.aggregate?.count && (
        <Stack direction="row" alignItems="center" justifyContent="flex-end" px={2} mt={1.5}>
          <Typography
            variant="body2"
            color="primary.main"
            onClick={() =>
              router.push({
                pathname: '/dashboard/complaints',
                query: {
                  exchangeId: exchange.id,
                  exchangeName: exchange.name,
                },
              })
            }
            sx={{ cursor: 'pointer', fontWeight: '500', textDecoration: 'underline' }}
          >
            Xem tất cả
          </Typography>
        </Stack>
      )}

      <Card sx={{ mt: 5 }}>
        <CardHeader title={`Thông tin các review gửi đến sàn (${exchange?.feedbacks_aggregate.aggregate.count})`} />
        <Divider />
        {exchange?.feedbacks.length && exchange?.feedbacks.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nội dung</TableCell>
                <TableCell align="center">Điểm</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exchange?.feedbacks?.map((feedback: Feedback) => {
                const { id, comment, point } = feedback
                return (
                  <TableRow
                    hover
                    key={id}
                    sx={{
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    <TableCell
                      sx={{
                        width: '90%',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '14px',
                        }}
                        // onClick={() =>
                        //   router.push({
                        //     pathname: '/dashboard/complaints',
                        //     query: {
                        //       complaintTile: title,
                        //     },
                        //   })
                        // }
                      >
                        {comment}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ width: '10%' }}>
                      <Rating
                        precision={0.5}
                        name="simple-controlled"
                        value={(point as number) / 2}
                        readOnly
                        size="medium"
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          <>
            <List disablePadding>
              <PropertyListItem align={align} label="Nội dung" value="Đang không có review nào gửi đến sàn" />
            </List>
          </>
        )}
      </Card>

      {exchange?.feedbacks.length < exchange?.feedbacks_aggregate.aggregate.count && (
        <Stack direction="row" alignItems="center" justifyContent="flex-end" px={2} mt={1.5}>
          <Typography
            variant="body2"
            color="primary.main"
            onClick={() =>
              router.push({
                pathname: '/dashboard/feedbacks',
                query: {
                  exchangeId: exchange.id,
                  exchangeName: exchange.name,
                },
              })
            }
            sx={{ cursor: 'pointer', fontWeight: '500', textDecoration: 'underline' }}
          >
            Xem tất cả
          </Typography>
        </Stack>
      )}
    </Box>
  )
}
