import BackButtonInitial from '@app/components/dashboard/common/back-button-initial'
import { FormActions } from '@app/constants/common'
import { Plus as PlusIcon } from '@app/icons/plus'
import { CsMember } from '@app/interfaces/cs-member'
import { User } from '@app/interfaces/user'
import { Box, Button, Container, Divider, Stack } from '@mui/material'
import { CsMemberForm } from '../member-details/cs-member-form'

interface CreateEditCsMemberSectionProps {
  type: FormActions
  user?: User
  leader?: CsMember
  handleCsMemberFormSubmit: (formValues: Partial<User>) => void
  handleOpenCreateCsMember?: () => void
  page: string
  limit: string
}

export default function CreateEditCsMemberSection(props: CreateEditCsMemberSectionProps) {
  const { type, user, handleCsMemberFormSubmit, handleOpenCreateCsMember, leader, page, limit } = props

  const initialValues: Partial<User> = {
    email: user?.email || '',
    phone: user?.phone || '',
    password: user?.password || '',
    confirmPassword: '',
    displayName: user?.displayName || '',
    role: user?.role || 'member',
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
        {type === FormActions.UPDATE ? (
          <>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              {/* <BackButton title="CS Member" link="dashboard/csteam/members" /> */}
              <BackButtonInitial title="CS Member" link="dashboard/csteam/members" page={page} limit={limit} />
              <Button startIcon={<PlusIcon fontSize="small" />} variant="contained" onClick={handleOpenCreateCsMember}>
                Tạo CS Member
              </Button>
            </Stack>
            <Divider />
          </>
        ) : (
          <>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              {/* <BackButton title="CS Member" link="dashboard/csteam/members" /> */}
              <BackButtonInitial title="CS Member" link="dashboard/csteam/members" page={page} limit={limit} />
            </Stack>
            <Divider />
          </>
        )}
        <Box mt={3}>
          <CsMemberForm
            page={page}
            limit={limit}
            leader={leader}
            type={type}
            initialValues={initialValues}
            onSubmit={handleCsMemberFormSubmit}
          />
        </Box>
      </Container>
    </Box>
  )
}
