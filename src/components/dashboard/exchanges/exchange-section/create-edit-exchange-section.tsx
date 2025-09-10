import { useQuery } from '@apollo/client'
import { FormActions } from '@app/constants/common'
import { Exchange } from '@app/interfaces/exchange'
import { NationalListResponse } from '@app/interfaces/national'
import GET_NATIONALS from '@app/operations/queries/nationals/get-nationals'
import { formatOptions } from '@app/utils/common'
import { Box, Container } from '@mui/material'
import BackButtonInitial from '../../common/back-button-initial'
import { ExchangeForm } from '../exchange-details/exchange-form'

interface CreateEditExchangeSectionProps {
  type: FormActions
  exchange?: Exchange
  imageFiles?: { images: any[] }
  handleChangeFiles?: (event: any, type: string, name: string) => void
  handleExchangeFormSubmit: (formValues: any) => void
  amountHighlightExchanges?: any
  page: string
  limit: string
}

export default function CreateEditExchangeSection(props: CreateEditExchangeSectionProps) {
  const { type, exchange, handleExchangeFormSubmit, amountHighlightExchanges, page, limit } = props

  const { data: dataNationals } = useQuery<NationalListResponse>(GET_NATIONALS)

  const initialValues: Partial<Exchange> = {
    name: exchange?.name || '',
    slug: exchange?.slug || '',
    logo: exchange?.logo || [],
    icon: exchange?.icon || [],
    website: exchange?.website || [],
    is_top_broker: exchange?.is_top_broker || false,
    rate_top_broker: exchange?.rate_top_broker || 0,
    is_trader_all_choose: exchange?.is_trader_all_choose || false,
    rate_trader_all_choose: exchange?.rate_trader_all_choose || 0,
    hidden: exchange?.hidden || false,
    // operationYears: exchange?.operationYears || '',
    // description: exchange?.description || '',
    national_name: exchange?.national?.name || '',
    national_id: exchange?.national_id || '',
    abbreviation: exchange?.abbreviation || '',
    trading_product: exchange?.trading_product || [],
    trading_product_en: exchange?.trading_product_en || [],
    trading_platform: exchange?.trading_platform || [],
    trading_platform_en: exchange?.trading_platform_en || [],
    email: exchange?.email || '',
    phone: exchange?.phone || '',
    intro: exchange?.intro || '',
    intro_en: exchange?.intro_en || '',
    total_point: exchange?.total_point || 0,
    license_point: exchange?.license_point || 0,
    risk_point: exchange?.risk_point || 0,
    manage_point: exchange?.manage_point || 0,
    operation_point: exchange?.operation_point || 0,
    soft_point: exchange?.soft_point || 0,
    supervision_time: exchange?.supervision_time || '',
    supervision_time_en: exchange?.supervision_time_en || '',
    supervision_status: exchange?.supervision_status || '',
    supervision_status_en: exchange?.supervision_status_en || '',
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
        {/* <BackButton title="Sàn giao dịch" link="dashboard/exchanges" /> */}
        <BackButtonInitial title="Sàn giao dịch" link="dashboard/exchanges" page={page} limit={limit} />
        <Box mt={3}>
          <ExchangeForm
            page={page}
            limit={limit}
            amountHighlightExchanges={amountHighlightExchanges}
            type={type}
            initialValues={initialValues}
            onSubmit={handleExchangeFormSubmit}
            nationalOptions={nationalOptions}
          />
        </Box>
      </Container>
    </Box>
  )
}
