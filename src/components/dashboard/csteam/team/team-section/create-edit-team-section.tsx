import BackButtonInitial from '@app/components/dashboard/common/back-button-initial'
import { FormActions } from '@app/constants/common'
import { CsMember } from '@app/interfaces/cs-member'
import { CsTeam } from '@app/interfaces/cs-team'
import { Box, Container } from '@mui/material'
import { CsTeamForm } from '../team-details/cs-team-form'

interface CreateEditCsTeamSectionProps {
  type: FormActions
  csTeam?: CsTeam
  handleCsTeamFormSubmit: (formValues: any) => void
  csMemberOptions?: CsMember[]
  page: string
  limit: string
}

export default function CreateEditCsTeamSection(props: CreateEditCsTeamSectionProps) {
  const { type, csTeam, handleCsTeamFormSubmit, csMemberOptions, page, limit } = props

  const initialValues = {
    name: csTeam?.name || '',
    csLeader: csTeam?.cs_members?.filter((member: CsMember) => member.user.role === 'leader')?.[0] || {},
    csMembers: csTeam?.cs_members?.filter((member: CsMember) => member.user.role === 'member') || [],
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
        {/* <BackButton title="Cs Teams" link="dashboard/csteam/teams" /> */}
        <BackButtonInitial title="Cs Teams" link="dashboard/csteam/teams" page={page} limit={limit} />
        <Box mt={3}>
          <CsTeamForm
            type={type}
            initialValues={initialValues}
            csMemberOptions={csMemberOptions}
            onSubmit={handleCsTeamFormSubmit}
            page={page}
            limit={limit}
          />
        </Box>
      </Container>
    </Box>
  )
}
