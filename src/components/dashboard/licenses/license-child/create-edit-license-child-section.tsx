import { DocumentaryEvidence } from '@app/interfaces/documentary-evidence'
import { Stack, Typography } from '@mui/material'
import { FieldProps } from 'formik'
import LicenseChildCard from './license-child-card'
import LicenseChildSectionForm from './license-child-section-form'

export interface CreateEditLicenseChildSectionProps extends FieldProps {
  label: string
  placeholder: string
  type: string
}

const CreateEditLicenseChildSection = (props: CreateEditLicenseChildSectionProps) => {
  const { field, form, label } = props
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

      <Stack spacing={2} mb={2}>
        {value?.map((child: DocumentaryEvidence, index: number) => (
          <LicenseChildCard
            key={child.id}
            index={index}
            child={child}
            childSection={value}
            label={label}
            setChildSection={(childSection: DocumentaryEvidence[]) => form.setFieldValue(name, childSection)}
          />
        ))}
      </Stack>

      <LicenseChildSectionForm
        childSection={value}
        name={name}
        setChildSection={(childSection: DocumentaryEvidence[]) => form.setFieldValue(name, childSection)}
      />
    </Stack>
  )
}

export default CreateEditLicenseChildSection
