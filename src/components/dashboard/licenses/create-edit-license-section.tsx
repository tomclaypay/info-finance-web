import { useQuery } from '@apollo/client'
import { FormActions } from '@app/constants/common'
import { ExchangeListResponse } from '@app/interfaces/exchange'
import { License } from '@app/interfaces/license'
import { SupervisoriesListResponse } from '@app/interfaces/supervisor'
import GET_EXCHANGES from '@app/operations/queries/exchanges/get-exchanges'
import GET_SUPERVISORIES from '@app/operations/queries/supervisories/get-supervisories'
import { formatOptions, formatSupervisorOptions } from '@app/utils/common'
import { Box, Container } from '@mui/material'
import BackButtonInitial from '../common/back-button-initial'
import { LicenseForm } from './license-form'

interface CreateEditNationalSectionProps {
  type: FormActions
  license?: License
  handleLicenseFormSubmit: (formValues: Partial<License>) => void
  page: string
  limit: string
}

export default function CreateEditLicenseSection(props: CreateEditNationalSectionProps) {
  const { type, license, handleLicenseFormSubmit, page, limit } = props

  const { data: dataSupervisories } = useQuery<SupervisoriesListResponse>(GET_SUPERVISORIES)
  const { data: dataExchanges } = useQuery<ExchangeListResponse>(GET_EXCHANGES)

  const initialValues = {
    authority_address: license?.authority_address || '',
    authority_email: license?.authority_email || '',
    authority_phone: license?.authority_phone || '',
    authority_website: license?.authority_website || '',
    effective_date: license?.effective_date || null,
    exchange_id: license?.exchange_id || '',
    exchange_name: license?.exchange.name || '',
    expiration_date: license?.expiration_date || null,
    license_type_en: license?.license_type_en || '',
    license_type_vn: license?.license_type_vn || '',
    regulatory_license_agency: license?.regulatory_license_agency || '',
    status: license?.status || '',
    status_en: license?.status_en || '',
    supervisory_authority_id: license?.supervisory_authority_id || '',
    supervisory_authority_name: license?.supervisory_authority.abbreviation_name || '',
    supervision_license: license?.supervision_license || '',
    documentary_evidences: license?.documentary_evidences || [],
  }

  const supervisoriesOptions = formatSupervisorOptions(dataSupervisories?.supervisories)
  const exchangesOptions = formatOptions(dataExchanges?.exchanges)

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
        {/* <BackButton title="Giấy phép sàn" link="dashboard/licenses" /> */}
        <BackButtonInitial title="Giấy phép sàn" link="dashboard/licenses" page={page} limit={limit} />
        <Box mt={3}>
          <LicenseForm
            supervisoriesOptions={supervisoriesOptions}
            exchangesOptions={exchangesOptions}
            type={type}
            initialValues={initialValues}
            onSubmit={handleLicenseFormSubmit}
            page={page}
            limit={limit}
          />
        </Box>
      </Container>
    </Box>
  )
}
