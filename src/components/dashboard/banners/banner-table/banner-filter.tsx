import { Grid, SelectChangeEvent, Stack } from '@mui/material'
import { ReactNode } from 'react'
import SelectField from '../../common/form-fields/select-field'
import { LanguageOptions, PositionOptions } from '../banner-form'

interface BannerFilterProps {
  onLanguageChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
  language?: string
  onPositionChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
  position?: string
}

export default function BannerFilter({ onLanguageChange, language, position, onPositionChange }: BannerFilterProps) {
  return (
    <Stack
      p={3}
      m={-1.5}
      sx={{
        flexWrap: 'wrap',
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <SelectField
            name="language"
            options={LanguageOptions}
            label="Ngôn ngữ"
            value={language}
            onChange={onLanguageChange}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectField
            name="position"
            options={PositionOptions}
            label="Vị trí"
            value={position}
            onChange={onPositionChange}
          />
        </Grid>
      </Grid>
    </Stack>
  )
}
