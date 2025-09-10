import { Button, InputBase } from '@mui/material'
import { Box } from '@mui/system'
import React, { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { SearchHeaderIcon } from '@app/icons'
import { useTranslation } from 'next-i18next'

const SearchHeader = ({ onClose }: any) => {
  const { t } = useTranslation(['common'])
  const [fieldSearch, setFieldSearch] = useState('')
  const router = useRouter()
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldSearch(e.target.value)
  }

  const handleSearch = () => {
    onClose()
    router.push({
      pathname: '/search',
      query: { keyword: fieldSearch },
    })
  }
  return (
    <Box
      sx={{
        width: '100vw',
        backgroundColor: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        maxWidth="lg"
        sx={{
          display: 'flex',
          height: '100%',
          margin: '0',
          gap: '24px',
          paddingY: '16px',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            borderRadius: '50px',
            backgroundColor: 'background.default',
            display: 'flex',
            paddingX: '24px',
            alignItems: 'center',
            width: '90%',
            maxWidth: '1140px',
          }}
        >
          <SearchHeaderIcon />
          <InputBase
            onKeyDown={(ev) => {
              if (ev.key === 'Enter') {
                onClose()
                router.push({
                  pathname: '/search',
                  query: { keyword: fieldSearch },
                })
              }
            }}
            placeholder={t('searchPlacehoder')}
            inputProps={{ 'aria-label': 'search' }}
            value={fieldSearch}
            onChange={handleInput}
            sx={{
              color: 'inherit',
              '& .MuiInputBase-input': {
                paddingLeft: '8px',
                paddingY: '12px',
                fontFamily: 'Montserrat',
                height: '24px',
                fontWeight: 600,
                lineHeight: '20px',
                fontSize: '14px',
              },
              width: '100%',
            }}
          />
        </Box>
        <Button
          sx={{
            borderRadius: 4,
            backgroundColor: 'background.default',
            color: 'primary.main',
            fontSize: '14px',
            fontWeight: '600',
            '&:hover': {
              color: 'white',
            },
          }}
          variant="contained"
          size="medium"
          onClick={handleSearch}
        >
          {t('search')}
        </Button>
      </Box>
    </Box>
  )
}

export default SearchHeader
