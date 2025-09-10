import { useQuery } from '@apollo/client'
import { FormActions } from '@app/constants/common'
import { COMPLAINT_STATUS } from '@app/constants/complaint'
import { useAuth } from '@app/hooks/use-auth'
import { Complaint, ComplaintCategoryListResponse } from '@app/interfaces/complaint'
import { CsMember } from '@app/interfaces/cs-member'
import { ExchangeListResponse } from '@app/interfaces/exchange'
import { UserListResponse } from '@app/interfaces/user'
import GET_COMPLAINT_CATEGORIES from '@app/operations/queries/complaints/get-complaint-categories'
import GET_EXCHANGES_OPTIONS from '@app/operations/queries/exchanges/get-exchanges-options'
import GET_USERS from '@app/operations/queries/users/get-users'
import { formatOptions, formatUserOptions } from '@app/utils/common'
import { Box, Container } from '@mui/material'
import BackButtonInitial from '../common/back-button-initial'
import { ComplaintForm } from './complaint-forms/complaint-create-edit-form'

interface CreateEditComplaintSectionProps {
  type: FormActions
  complaint?: Complaint
  handleComplaintFormSubmit: (formValues: Partial<Complaint>) => void
  dataCsHandleByOptions?: CsMember[]
  handler?: boolean
  handleChangeFiles?: (event: any, type: string, name: string) => void
  imageFiles?: { images: any[] }
  isJoinedCsTeam?: boolean
  page: string
  limit: string
}

function CreateEditComplaintSection(props: CreateEditComplaintSectionProps) {
  const auth = useAuth()
  const {
    type,
    complaint,
    handleComplaintFormSubmit,
    dataCsHandleByOptions,
    handler,
    handleChangeFiles,
    imageFiles,
    isJoinedCsTeam,
    page,
    limit,
  } = props
  const { data: exchangeData } = useQuery<ExchangeListResponse>(GET_EXCHANGES_OPTIONS)
  const { data: categoriesData } = useQuery<ComplaintCategoryListResponse>(GET_COMPLAINT_CATEGORIES)
  const { data: usersData } = useQuery<UserListResponse>(GET_USERS, {
    variables: {
      where: { role: { _eq: 'user' } },
    },
  })

  const exchangeOptions = formatOptions(exchangeData?.exchanges)
  const categoryOptions = formatOptions(categoriesData?.complaint_categories)
  const userOptions = formatUserOptions(usersData?.users)

  const initialValues: Partial<Complaint> = {
    userId: complaint?.createdBy || '',
    fullname: complaint?.fullname || '',
    email: complaint?.email || '',
    highlight_on_broker: complaint?.highlight_on_broker || false,
    phone: complaint?.phone || '',
    exchangeId: complaint?.exchange.id || '',
    exchangeName: complaint?.exchange.name || '',
    website: complaint?.website || '',
    complaintCategoryId: complaint?.category?.id || categoryOptions?.[0]?.value || '',
    description: complaint?.description || '',
    title: complaint?.title || '',
    images: complaint?.images || [],
    hidden: complaint?.hidden || false,
    slug: complaint?.slug,
    handle_by:
      complaint?.handle_by || (auth?.user?.role === 'member' && dataCsHandleByOptions?.[0]) || ({} as CsMember),
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
        {/* <BackButton title="Khiếu nại" link="dashboard/complaints" /> */}
        <BackButtonInitial title="Khiếu nại" link="dashboard/complaints" page={page} limit={limit} />
        <Box mt={3}>
          <ComplaintForm
            type={type}
            disabled={
              !isJoinedCsTeam ||
              complaint?.status === COMPLAINT_STATUS.CLOSED ||
              complaint?.status === COMPLAINT_STATUS.RESOLVED
            }
            handler={handler}
            page={page}
            limit={limit}
            initialValues={initialValues}
            exchangeOptions={exchangeOptions}
            categoryOptions={categoryOptions}
            userOptions={userOptions}
            onSubmit={handleComplaintFormSubmit}
            dataCsHandleByOptions={dataCsHandleByOptions}
            imageFiles={imageFiles}
            handleChangeFiles={handleChangeFiles}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default CreateEditComplaintSection
