import { Exchange } from '@app/interfaces/exchange'
import { Box, Stack } from '@mui/system'
import React from 'react'
import Image from 'next/image'
import { Divider, Link, Typography } from '@mui/material'
import { getColorFromScore } from '@app/utils/exchange'
import NextLink from 'next/link'
import { useMobile } from '@app/components/common'
import { useQuery } from '@apollo/client'
import GET_NATIONALS from '@app/operations/queries/nationals/get-nationals'
import { useRouter } from 'next/router'

export interface IExchangeGridCardProps {
  exchange: Exchange
}
export default function ExchangeGridCard({ exchange }: IExchangeGridCardProps) {
  const isMobile = useMobile()
  const { data: dataNationals } = useQuery(GET_NATIONALS)
  const { locale } = useRouter()

  return (
    <Link component={NextLink} href={`/${locale === 'vi' ? 'tra-cuu-san' : 'broker'}/${exchange.slug}`} passHref>
      <Stack
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          border: '0.5px solid rgba(0,0,0,0.12)',
          cursor: 'pointer',
        }}
        position="relative"
      >
        <Box
          sx={{
            p: 2,
            position: 'relative',
            width: 1,
            aspectRatio: '1 / 1', // giữ tỉ lệ 1:1
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Image
            src={
              exchange?.logo ||
              'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2018_12_16_at_21_06_29_f07726afef.png?updated_at=2022-11-30T08:25:12.500Z'
            }
            alt="logo"
            fill // fill vào Box ở trên
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 243px"
            style={{ objectFit: 'contain', display: 'block' }} // luôn fit, không tràn
            loading="lazy"
          />
        </Box>
        <Divider />

        <Stack sx={{ padding: 2, height: '100%' }} spacing={2}>
          <Typography
            sx={{
              ...getColorFromScore(exchange.total_point ?? 0),
              fontWeight: 600,
              fontSize: isMobile ? 16 : 14,
              borderRadius: isMobile ? 1 : 2,
              paddingX: isMobile ? 1 : 3,
              paddingY: isMobile ? 1 : 0.75,
              textAlign: 'center',
              width: isMobile ? 'fit-content' : 'none',
              position: isMobile ? 'absolute' : 'none',
              top: '8px',
              right: '8.5px',
            }}
          >
            <Typography sx={{ display: 'inline', fontSize: 16, fontWeight: 700 }}>{exchange.total_point}</Typography>
          </Typography>
          <Stack direction="row" alignItems={'center'} justifyContent={'center'} gap={'12px'}>
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'primary.main',
              }}
            >
              {exchange?.name}
            </Typography>

            <Box>
              <Stack direction="row" gap={1} flexWrap="wrap">
                {exchange?.website?.map((web) => (
                  <NextLink href={web.url} target="_blank" rel="noreferrer" key={web.url}>
                    <Stack key={web.url} direction="row">
                      <Image
                        src={dataNationals?.nationals?.find((e: any) => e.id === web.national_id)?.logo ?? ''}
                        alt="logo"
                        width={21.33}
                        height={16}
                        loading="lazy"
                      />
                    </Stack>
                  </NextLink>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Link>
  )
}
