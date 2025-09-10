import { useQuery } from '@apollo/client'
import { FormActions } from '@app/constants/common'
import { ExchangeListResponse } from '@app/interfaces/exchange'
import { Feedback } from '@app/interfaces/feedback'
import { SeederListResponse, UserListResponse } from '@app/interfaces/user'
import GET_EXCHANGES_OPTIONS from '@app/operations/queries/exchanges/get-exchanges-options'
import GET_SEEDERS from '@app/operations/queries/seeder/get-seeders'
import GET_USERS from '@app/operations/queries/users/get-users'
import { formatOptions, formatSeederOptions, formatUserOptions } from '@app/utils/common'
import { Box, Container } from '@mui/material'
import BackButtonInitial from '../../common/back-button-initial'
import { FeedbackForm } from '../feedback-details/feedback-form'

interface CreateEditFeedbackSectionProps {
  type: FormActions
  feedback?: Feedback
  handleFeedbackFormSubmit: (formValues: any) => void
  page: string
  limit: string
}

export default function CreateEditFeedbackSection(props: CreateEditFeedbackSectionProps) {
  const { type, feedback, handleFeedbackFormSubmit, page, limit } = props

  const { data: exchangeData } = useQuery<ExchangeListResponse>(GET_EXCHANGES_OPTIONS)
  const { data: usersData } = useQuery<UserListResponse>(GET_USERS, {
    variables: {
      where: { role: { _eq: 'user' } },
    },
  })

  const { data: seedersData } = useQuery<SeederListResponse>(GET_SEEDERS)
  const exchangeOptions = formatOptions(exchangeData?.exchanges)
  const userOptions = formatUserOptions(usersData?.users)
  const seederNameOptions = formatSeederOptions(seedersData?.seeders)
  const initialValues: Partial<Feedback> = {
    comment: feedback?.comment || '',
    hidden: feedback?.hidden || false,
    point: feedback?.point || 0,
    exchangeId: feedback?.exchange_id || '',
    userId: feedback?.user_id || undefined,
    seederId: feedback?.seeder_id || undefined,
    seederName: feedback?.seeder?.fullname || '',
    exchangeName: feedback?.exchange?.name || '',
    displayName: feedback?.user?.displayName || '',
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
        {/* <BackButton title="Review sàn giao dịch" link="dashboard/feedbacks" /> */}
        <BackButtonInitial title="Review sàn giao dịch" link="dashboard/feedbacks" page={page} limit={limit} />
        <Box mt={3}>
          <FeedbackForm
            type={type}
            exchangeOptions={exchangeOptions}
            userOptions={userOptions}
            seederOptions={seederNameOptions}
            initialValues={initialValues}
            onSubmit={handleFeedbackFormSubmit}
            page={page}
            limit={limit}
          />
        </Box>
      </Container>
    </Box>
  )
}
