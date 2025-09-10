import { useQuery } from '@apollo/client'
import { FormActions } from '@app/constants/common'
import { NationalListResponse } from '@app/interfaces/national'
import { Supervisor } from '@app/interfaces/supervisor'
import GET_NATIONALS from '@app/operations/queries/nationals/get-nationals'
import { formatOptions } from '@app/utils/common'
import { Box, Container } from '@mui/material'
import BackButtonInitial from '../common/back-button-initial'
import { SupervisorForm } from './supervisor-form'

interface CreateEditNationalSectionProps {
  type: FormActions
  supervisor?: Supervisor
  handleSupervisorFormSubmit: (formValues: Partial<Supervisor>) => void
  page: string
  limit: string
}

export default function CreateEditSupervisorSection(props: CreateEditNationalSectionProps) {
  const { type, supervisor, handleSupervisorFormSubmit, page, limit } = props

  const { data: dataNationals } = useQuery<NationalListResponse>(GET_NATIONALS)

  const initialValues = {
    name: supervisor?.name || '',
    intro_vn: supervisor?.intro_vn || '',
    intro_en: supervisor?.intro_en || '',
    logo: supervisor?.logo || '',
    icon: supervisor?.icon || '',
    abbreviation_name: supervisor?.abbreviation_name || '',
    national_id: supervisor?.national_id || '',
    national_name: supervisor?.national?.name || '',
  }

  const nationalOptions = formatOptions(dataNationals?.nationals)

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
        {/* <BackButton title="Cơ quan giám sát quản lý" link="dashboard/supervisories" /> */}
        <BackButtonInitial title="Cơ quan giám sát quản lý" link="dashboard/supervisories" page={page} limit={limit} />
        <Box mt={3}>
          <SupervisorForm
            nationalOptions={nationalOptions}
            type={type}
            initialValues={initialValues}
            onSubmit={handleSupervisorFormSubmit}
            page={page}
            limit={limit}
          />
        </Box>
      </Container>
    </Box>
  )
}
