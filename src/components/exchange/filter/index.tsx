import { Button, Divider, InputAdornment, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { ChangeEvent } from 'react'

import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FILTER_KEY, LAYOUT_TYPE, SCORE_RANGE } from '@app/constants/exchange'
import {
  activeLayoutButtonStyle,
  activeRangeButton0_3Style,
  activeRangeButton4_6Style,
  activeRangeButton7_10Style,
  activeRangeButtonAllStyle,
  normalLayoutButtonStyle,
  normalRangeButton0_3Style,
  normalRangeButton4_6Style,
  normalRangeButton7_10Style,
  normalRangeButtonAllStyle,
  rangeTypographyStyle,
} from './style'
import { SearchHeaderIcon } from '@app/icons'
import { useMobile } from '@app/components/common'

export interface IFiter {
  handleSearchChangeName: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function Filter({ handleSearchChangeName }: IFiter) {
  const { t } = useTranslation('exchange')
  const router = useRouter()
  const { query } = router
  const isMobile = useMobile()
  const layout = query[FILTER_KEY.LAYOUT] as string
  const scoreRange = query[FILTER_KEY.SCORE_RANGE] as string

  if (typeof window !== 'undefined' && !Object.values(SCORE_RANGE).includes(scoreRange)) {
    router.push({
      pathname: router.locale === 'vi' ? '/tra-cuu-san' : '/broker',
      query: { ...query, [FILTER_KEY.SCORE_RANGE]: SCORE_RANGE.ALL },
    })
  }

  if (typeof window !== 'undefined' && !Object.values(LAYOUT_TYPE).includes(layout)) {
    router.push({
      pathname: router.locale === 'vi' ? '/tra-cuu-san' : '/broker',
      query: { ...query, [FILTER_KEY.LAYOUT]: LAYOUT_TYPE.GRID },
    })
  }

  const handleChangeScoreRange = (type: string) => {
    router.push({ query: { ...query, [FILTER_KEY.SCORE_RANGE]: type } }, undefined, { shallow: true })
  }
  const handleChangeLayout = (type: string) => {
    router.push({ query: { ...query, [FILTER_KEY.LAYOUT]: type } }, undefined, { shallow: true })
  }
  return (
    <Stack>
      <Box>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchHeaderIcon />
              </InputAdornment>
            ),
            sx: { borderRadius: 8 },
          }}
          fullWidth
          placeholder={t('search')}
          onChange={handleSearchChangeName}
        />
      </Box>
      <Stack
        mt={5}
        direction={isMobile ? 'column' : 'row'}
        alignItems={isMobile ? 'flex-start' : 'center'}
        justifyContent="space-between"
        gap={2}
      >
        <Typography fontWeight={600} fontSize={20} color="#0E0E2C" whiteSpace="nowrap">
          {t('filter.score')}
        </Typography>
        {isMobile && <Divider orientation="horizontal" sx={{ width: '100%' }} />}
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          width="100%"
          justifyContent={isMobile ? 'flex-start' : 'flex-end'}
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography whiteSpace="nowrap">{t('filter.name')}</Typography>

            <Divider sx={{ height: 24 }} orientation="vertical" />
          </Stack>
          <Stack flexGrow={isMobile ? 1 : 0}>
            <Button
              sx={layout === LAYOUT_TYPE.GRID ? activeLayoutButtonStyle : normalLayoutButtonStyle}
              variant="contained"
              startIcon={<GridViewOutlinedIcon />}
              onClick={() => handleChangeLayout(LAYOUT_TYPE.GRID)}
            >
              <Typography whiteSpace="nowrap" variant="h4" fontSize={[14, 14]} lineHeight={20}>
                {t('filter.grid')}
              </Typography>
            </Button>
          </Stack>
          <Stack flexGrow={isMobile ? 1 : 0}>
            <Button
              sx={layout === LAYOUT_TYPE.LIST ? activeLayoutButtonStyle : normalLayoutButtonStyle}
              variant="contained"
              startIcon={<FormatListBulletedOutlinedIcon />}
              onClick={() => handleChangeLayout(LAYOUT_TYPE.LIST)}
            >
              <Typography whiteSpace="nowrap" variant="h4" fontSize={[14, 14]} lineHeight={20}>
                {t('filter.list')}
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Box overflow="auto">
        <Stack mt={2} direction="row" spacing={2}>
          <Box
            onClick={() => handleChangeScoreRange(SCORE_RANGE.ALL)}
            sx={scoreRange === SCORE_RANGE.ALL ? activeRangeButtonAllStyle : normalRangeButtonAllStyle}
            minWidth={185}
          >
            <Typography sx={rangeTypographyStyle} whiteSpace="nowrap">
              {t('all')}
            </Typography>
          </Box>
          <Box
            onClick={() => handleChangeScoreRange(SCORE_RANGE['0_3'])}
            sx={scoreRange === SCORE_RANGE['0_3'] ? activeRangeButton0_3Style : normalRangeButton0_3Style}
            minWidth={185}
          >
            <NotInterestedOutlinedIcon sx={{ margin: 1.5 }} />
            <Divider sx={{ height: 24 }} orientation="vertical" />
            <Typography sx={rangeTypographyStyle} whiteSpace="nowrap">
              0 - 3
            </Typography>
          </Box>

          <Box
            onClick={() => handleChangeScoreRange(SCORE_RANGE['4_6'])}
            sx={scoreRange === SCORE_RANGE['4_6'] ? activeRangeButton4_6Style : normalRangeButton4_6Style}
            minWidth={185}
          >
            <WarningAmberRoundedIcon sx={{ margin: 1.5 }} />
            <Divider sx={{ height: 24 }} orientation="vertical" />
            <Typography sx={rangeTypographyStyle} whiteSpace="nowrap">
              4 - 6
            </Typography>
          </Box>

          <Box
            onClick={() => handleChangeScoreRange(SCORE_RANGE['7_10'])}
            sx={scoreRange === SCORE_RANGE['7_10'] ? activeRangeButton7_10Style : normalRangeButton7_10Style}
            minWidth={185}
          >
            <VerifiedOutlinedIcon sx={{ margin: 1.5 }} />
            <Divider sx={{ height: 24 }} orientation="vertical" />
            <Typography sx={rangeTypographyStyle} whiteSpace="nowrap">
              7 - 10
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  )
}
