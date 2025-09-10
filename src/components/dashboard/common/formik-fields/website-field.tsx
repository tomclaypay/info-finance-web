import { WebsiteOption } from '@app/interfaces/common'
import { IWebsite } from '@app/interfaces/exchange'
import { getDomainFromUrl, getIconFlagFromNationId } from '@app/utils/exchange'
import { Autocomplete, Avatar, Button, Chip, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { FieldProps } from 'formik'
import React, { useState } from 'react'

export interface IWebsiteFieldProps extends FieldProps {
  options: WebsiteOption[]
}

export default function WebsiteField({ options, field, form }: IWebsiteFieldProps) {
  const { name, value } = field
  const [currentIcon, setCurrentIcon] = useState<WebsiteOption>()
  const [currentUrl, setCurrentUrl] = useState<string>('')

  const [showError, setShowError] = useState({ title: '', isDisplay: false })

  const addWebsiteHandle = () => {
    if (value?.length >= 5) {
      setShowError({ title: 'Đã đạt giới hạn tối đa 5 website!', isDisplay: true })
      return
    }

    if (!currentUrl || !currentIcon?.value) {
      setShowError({ title: 'Vui lòng chọn quốc gia và nhập link website!', isDisplay: true })
      return
    }

    form.setFieldValue(name, [...value, { url: `https://${currentUrl}`, national_id: currentIcon?.value }])
    setCurrentUrl('')
    setShowError({ title: '', isDisplay: false })
  }

  const deleteWebsiteHandle = (url: string) => {
    const newWebsites = value?.filter((web: IWebsite) => web.url !== url)
    form.setFieldValue(name, newWebsites)
  }

  return (
    <Box sx={{ display: 'grid', rowGap: '16px' }}>
      <Stack direction="row" gap={1} flexWrap="wrap">
        {value?.map((web: IWebsite) => (
          <Chip
            key={web.url}
            avatar={<Avatar alt="Flag" src={getIconFlagFromNationId(web.national_id, options)} />}
            label={getDomainFromUrl(web.url)}
            variant="outlined"
            onDelete={() => deleteWebsiteHandle(web.url)}
          />
        ))}
      </Stack>

      <Stack direction="row" spacing={2}>
        <Autocomplete
          fullWidth
          onChange={(_, option: WebsiteOption | null) => {
            if (option) setCurrentIcon(option)
          }}
          options={options || []}
          renderInput={(params) => (
            <>
              <TextField {...params} label="Quốc gia" fullWidth />
            </>
          )}
        />

        <TextField
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          onBlur={(e) => setCurrentUrl(getDomainFromUrl(e.target.value))}
          fullWidth
          variant="outlined"
          label="Url"
          placeholder="Url"
          type="text"
        />
        <Button onClick={() => addWebsiteHandle()}>Thêm</Button>
      </Stack>
      {showError.isDisplay && <Typography color="red">{showError.title}</Typography>}
    </Box>
  )
}
