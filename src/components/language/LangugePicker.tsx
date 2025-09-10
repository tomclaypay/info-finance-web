import { Box, MenuItem, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { NextLinkComposed } from './Link'
import SAVE_LANGUAGE from '@app/operations/mutations/save-language'
import { useMutation, useQuery } from '@apollo/client'
import GET_LOCALIZATION from '@app/operations/rests/articles/get-localization'
// import getURLByLocale from '@app/hooks/useGetURLByLocale'
import { useTranslation } from 'next-i18next'
import getURLByLocale from '@app/hooks/useGetURLByLocale'

const localeOptions = [
  {
    id: 'en',
    flag: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/flag_UK_95865079eb.png?updated_at=2022-10-26T07:38:18.102Z',
    label: 'EN',
    value: 'en',
  },
  {
    id: 'vi',
    flag: 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Flag_of_Vietnam_svg_0e37387000.png?updated_at=2022-10-26T07:39:03.250Z',
    label: 'VN',
    value: 'vi',
  },
]

interface LanguagePickerProps {
  openMiniDrawer?: boolean
}

const LanguagePicker = ({ openMiniDrawer = true }: LanguagePickerProps) => {
  const [updateLanguage] = useMutation(SAVE_LANGUAGE)
  const { locale: routerLocale, query, asPath } = useRouter()
  const [locale, setLocale] = useState(routerLocale)
  const { t } = useTranslation('common')
  const { data: localeData } = useQuery(GET_LOCALIZATION, {
    context: { clientName: 'strapi' },
    variables: {
      filters: {
        slug: { eq: query.newsSlug },
      },
      locale,
    },
  })

  const handleChangeLocale = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      await updateLanguage({
        variables: { language: event.target.value === 'vi' ? 'VN' : 'EN' },
      })
    } catch (error) {}
    setLocale(event.target.value)
    const date = new Date()
    const expireMs = 100 * 24 * 60 * 60 * 1000 // 100 days
    date.setTime(date.getTime() + expireMs)
    document.cookie = `NEXT_LOCALE=${event.target.value};expires=${date.toUTCString()};path=/`
  }

  return (
    <>
      {openMiniDrawer ? (
        <TextField
          fullWidth
          size="small"
          select
          value={locale}
          onChange={handleChangeLocale}
          sx={{
            width: '100px',
          }}
        >
          {localeOptions.map((option) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <MenuItem
              key={option.value}
              component={NextLinkComposed}
              to={getURLByLocale(query, asPath, localeData, t, option.value)}
              value={option.value}
              locale={option.value}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Image loading="lazy" src={option.flag} alt="icon" width={32} height={20} />
                <Box component="span">{option.label}</Box>
              </Stack>
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <Image
          src={
            locale === 'en'
              ? 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/flag_UK_95865079eb.png?updated_at=2022-10-26T07:38:18.102Z'
              : 'https://infofinance-dev.s3.ap-southeast-1.amazonaws.com/Flag_of_Vietnam_svg_0e37387000.png?updated_at=2022-10-26T07:39:03.250Z'
          }
          alt="icon"
          width={32}
          height={20}
          loading="lazy"
        />
      )}
    </>
  )
}

export default LanguagePicker
