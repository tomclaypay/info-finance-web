import { Exchange } from '@app/interfaces/exchange'
import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import NextLink from 'next/link'

interface ExchangeMobileCardProps {
  exchange?: Exchange
}

const ExchangeMobileCard = ({ exchange }: ExchangeMobileCardProps) => {
  const { t } = useTranslation('exchange')

  return (
    <Stack gap={1}>
      <Box
        width={123}
        height={113}
        position="relative"
        boxShadow="4px 4px 40px 0px rgba(0, 0, 0, 0.05)"
        borderRadius={1}
        overflow="hidden"
      >
        <Image
          src={
            exchange?.logo ||
            'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2018_12_16_at_21_06_29_f07726afef.png?updated_at=2022-11-30T08:25:12.500Z'
          }
          alt="exchangecard"
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 60vw"
          loading="lazy"
        />
      </Box>
      <Typography textAlign="center" lineHeight="24px" fontWeight={700} fontSize={16}>
        {exchange?.name}
      </Typography>
    </Stack>
  )
}

export default ExchangeMobileCard
