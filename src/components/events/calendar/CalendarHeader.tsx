import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { Box, Button, IconButton, TextField, Typography, Stack } from '@mui/material'
import ViewConfigIcon from '@mui/icons-material/ViewComfy'
import { ChevronRight } from '@app/icons/chevron-right'
import { ChevronLeft } from '@app/icons/chevron-left'

const viewOptions = [
  {
    icon: ViewConfigIcon,
    label: 'Month',
    value: 'dayGridMonth',
  },
]

interface CalendarHeaderProps {
  date: Date
  onDateNext: () => void
  onDatePrev: () => void
  onDateToday: () => void
  onViewChange: (newView: any) => void
  view: string
  mobile: boolean
  addEvent?: boolean
}

export const CalendarHeader = (props: CalendarHeaderProps) => {
  const { date, mobile, onDateNext, onDatePrev, onViewChange, view, ...other } = props

  const handleViewChange = (event: any) => {
    onViewChange?.(event.target.value)
  }

  return (
    <Stack {...other} direction="row" alignItems="center" justifyContent="space-between">
      <IconButton onClick={onDatePrev}>
        <ChevronLeft fontSize="small" />
      </IconButton>
      <Typography variant="h5">{format(date, 'MMMM')}</Typography>
      <Typography
        sx={{
          fontWeight: 400,
          ml: 1,
        }}
        variant="h5"
      >
        {format(date, 'y')}
      </Typography>
      <IconButton onClick={onDateNext}>
        <ChevronRight fontSize="small" />
      </IconButton>
    </Stack>
  )
}

CalendarHeader.propTypes = {
  children: PropTypes.node,
  date: PropTypes.instanceOf(Date).isRequired,
  mobile: PropTypes.bool,
  onAddClick: PropTypes.func,
  onDateNext: PropTypes.func,
  onDatePrev: PropTypes.func,
  onDateToday: PropTypes.func,
  onViewChange: PropTypes.func,
  view: PropTypes.oneOf(['dayGridMonth', 'timeGridWeek', 'timeGridDay', 'listWeek']),
}
