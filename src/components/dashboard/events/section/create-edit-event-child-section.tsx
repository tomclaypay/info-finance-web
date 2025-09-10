import { EventChild } from '@app/interfaces/event'
import { Stack, Typography } from '@mui/material'
import { FieldProps } from 'formik'
import EventChildCard from '../card/event-child-card'

import EventChildSectionInput from '../event-forms/event-child-section-form'

export interface CreateEditEventChildSectionProps extends FieldProps {
  label: string
  placeholder: string
  disabled: boolean
  type: string
}

const CreateEditEventChildSection = (props: CreateEditEventChildSectionProps) => {
  const { field, form, label, disabled } = props
  const { name, value } = field

  return (
    <Stack
      p={1}
      pt={2}
      sx={{
        position: 'relative',
        border: '2px solid #2a559c',
        borderRadius: '8px',
      }}
    >
      <Typography
        fontSize="0.75rem"
        fontWeight="800"
        sx={{
          position: 'absolute',
          top: '-11px',
          left: '10px',
          zIndex: '10',
          padding: '0 2px',
          backgroundColor: '#ffffffff',
        }}
      >
        {label}
      </Typography>

      <Stack spacing={2}>
        {value?.map((child: EventChild, index: number) => (
          <EventChildCard
            key={child.id}
            index={index}
            child={child}
            childSection={value}
            label={label}
            disabled={disabled}
            setChildSection={(childSection: EventChild[]) => form.setFieldValue(name, childSection)}
          />
        ))}
      </Stack>

      <EventChildSectionInput
        childSection={value}
        disabled={disabled}
        name={name}
        setChildSection={(childSection: EventChild[]) => form.setFieldValue(name, childSection)}
      />
    </Stack>
  )
}

export default CreateEditEventChildSection
