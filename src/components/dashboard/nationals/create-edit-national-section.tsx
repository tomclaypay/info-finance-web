import { FormActions } from '@app/constants/common'
import { National } from '@app/interfaces/national'
import { Box, Container } from '@mui/material'
import BackButtonInitial from '../common/back-button-initial'

import { NationalForm } from './national-form'

interface CreateEditNationalSectionProps {
  type: FormActions
  national?: National
  handleNationalFormSubmit: (formValues: Partial<National>) => void
  page: string
  limit: string
}

export default function CreateEditNationalSection(props: CreateEditNationalSectionProps) {
  const { type, national, handleNationalFormSubmit, page, limit } = props

  const initialValues = {
    name: national?.name || '',
    name_vn: national?.name_vn || '',
    logo: national?.logo || '',
  }

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: 'background.default',
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="md">
        {/* <BackButton title="Quốc gia" link="dashboard/nationals" page={page} /> */}
        <BackButtonInitial title="Quốc gia" link="dashboard/nationals" page={page} limit={limit} />
        <Box mt={3}>
          <NationalForm type={type} initialValues={initialValues} onSubmit={handleNationalFormSubmit} />
        </Box>
      </Container>
    </Box>
  )
}
