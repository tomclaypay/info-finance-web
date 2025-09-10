import { CsTeam } from '@app/interfaces/cs-team'
import { Autocomplete, Box, TextField } from '@mui/material'

interface CsMemberFilterProps {
  handleFilterHeader: (event: any) => void
  dataCsTeamOptions?: CsTeam[]
  initialTeamOption?: CsTeam
}

export default function CsMemberFilter({
  handleFilterHeader,
  dataCsTeamOptions,
  initialTeamOption,
}: CsMemberFilterProps) {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        m: -1.5,
        p: 3,
      }}
    >
      <Box width="30%">
        <Autocomplete
          // multiple
          id="tags-outlined"
          fullWidth
          options={dataCsTeamOptions || []}
          getOptionLabel={(item: any) => item?.name || ''}
          filterSelectedOptions
          defaultValue={initialTeamOption}
          renderInput={(params) => <TextField {...params} label="Team" />}
          onChange={(event, newValue) => {
            handleFilterHeader(newValue)
          }}
        />
      </Box>
    </Box>
  )
}
