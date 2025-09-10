import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material'
import Image from 'next/image'

const decisions = [
  {
    id: 1,
    icon: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Medal_7e13e7fa74.png?updated_at=2022-10-24T02:31:29.627Z',
    title: 'Chúng tôi mang đến cho Nhà đầu tư những thông tin mới nhất về chất lượng của Sàn môi giới. ',
    detail: 'Chúng tôi mang đến cho Nhà đầu tư những thông tin mới nhất về chất lượng của Sàn môi giới. ',
  },
  {
    id: 2,
    icon: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Megaphone_Simple_641416c646.png?updated_at=2022-10-24T02:31:29.652Z',
    title: 'Chúng tôi đưa ra Bảng xếp hạng Sàn môi giới dựa trên những quy trình & tiêu chuẩn thẩm định của mình.',
    detail: 'Chúng tôi đưa ra Bảng xếp hạng Sàn môi giới dựa trên những quy trình & tiêu chuẩn thẩm định của mình.',
  },
  {
    id: 3,
    icon: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Shield_Check_b3e0322178.png?updated_at=2022-10-24T02:31:29.651Z',
    title:
      'Nhà đầu tư có thể tự mình tìm hiểu về mức độ uy tín của sàn, ngay tại công cụ tra cứu - website của Info Finance.',
    detail:
      'Nhà đầu tư có thể tự mình tìm hiểu về mức độ uy tín của sàn, ngay tại công cụ tra cứu - website của Info Finance.',
  },
  {
    id: 4,
    icon: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Globe_Hemisphere_East_23954580ac.png?updated_at=2022-10-24T02:31:29.692Z',
    title:
      'Chúng tôi hỗ trợ Nhà đầu tư giải quyết mọi khiếu nại - từ các vấn đề xảy ra trong quá trình giao dịch đối với sàn môi giới.',
    detail:
      'Chúng tôi hỗ trợ Nhà đầu tư giải quyết mọi khiếu nại - từ các vấn đề xảy ra trong quá trình giao dịch đối với sàn môi giới.',
  },
  {
    id: 5,
    icon: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Currency_Circle_Dollar_c971eeb795.png?updated_at=2022-10-24T02:31:29.687Z',
    title:
      'Chúng tôi thay mặt Nhà đầu tư, khiếu nại vấn đề khúc mắc lên các cơ quan thẩm quyền và mang lại công bằng cho Nhà đầu tư.',
    detail:
      'Chúng tôi thay mặt Nhà đầu tư, khiếu nại vấn đề khúc mắc lên các cơ quan thẩm quyền và mang lại công bằng cho Nhà đầu tư.',
  },
]

const newArrTitle = [1, 2, 3]
const newArr = [1, 2, 3, 4, 5]

export const HomeDecisions = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        marginTop: '80px',
        marginBottom: '50px',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h1" sx={{ mb: 3 }}>
          We Help You Make Smart Financial Decisions
        </Typography>

        {decisions.map((item) => (
          <Accordion
            key={item.id}
            sx={{
              backgroundColor: '#ffff',
              borderTop: '1px solid #D0D0D0',
              borderRadius: '0!important',
              boxShadow: '0px 1px 0px  #D0D0D0',
              // boxShadow: 'none',
              '&::before': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                pl: '0!important',
                pr: '0!important',
                '&>div': {
                  alignItems: 'center',
                },
              }}
            >
              <Image loading="lazy" src={item.icon} alt="icon" width={40} height={40} />
              <Typography variant="h5" sx={{ flex: '1', marginLeft: '20px' }}>
                {item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.detail}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* <Stack direction="row">
          {newArrTitle.map((item, index) => (
            <Box key={index} sx={{ flex: '1', marginTop: '25px' }}>
              <Typography variant="button">Title</Typography>
              {newArr.map((item, index) => (
                <Typography key={index} sx={{ marginTop: '8px' }}>
                  <NextLink href="/" passHref>
                    <Link
                      variant="subtitle1"
                      sx={{
                        color: 'primary.main',
                        fontWeight: '500',
                      }}
                    >
                      Title
                    </Link>
                  </NextLink>
                </Typography>
              ))}
            </Box>
          ))}
        </Stack> */}
        {/* <Divider sx={{ margin: '40px 0 100px 0' }} /> */}
      </Container>
    </Box>
  )
}
