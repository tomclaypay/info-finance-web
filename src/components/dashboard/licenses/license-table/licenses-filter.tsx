import { Grid, Stack } from '@mui/material'
import { ChangeEvent } from 'react'
import InputField from '../../common/form-fields/input-field'

interface SupervisoriesFilterProps {
  onLicenseNumberChange: (event: ChangeEvent<HTMLInputElement>) => void
  onExchangeNameChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSupervisoryNameChange: (event: ChangeEvent<HTMLInputElement>) => void
  initialSearch?: any
}

export default function LicensesFilter({
  onLicenseNumberChange,
  onExchangeNameChange,
  onSupervisoryNameChange,
  initialSearch,
}: SupervisoriesFilterProps) {
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
          <InputField
            fullWidth
            label="Tìm kiếm theo số giấy phép"
            defaultValue={initialSearch?.licenseNumber}
            onChange={onLicenseNumberChange}
          />
        </Grid>

        <Grid item xs={3}>
          <InputField fullWidth label="Tìm kiếm theo sàn" onChange={onExchangeNameChange} />
        </Grid>

        <Grid item xs={3}>
          <InputField fullWidth label="Tìm kiếm theo cơ quan giám sát" onChange={onSupervisoryNameChange} />
        </Grid>
      </Grid>
    </Stack>
  )
}
