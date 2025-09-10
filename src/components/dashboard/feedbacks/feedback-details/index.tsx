import { PropertyListItem } from '@app/components/dashboard/complaints/complaint-details/property-list-item'
import { useAuth } from '@app/hooks/use-auth'
import { CsTeam } from '@app/interfaces/cs-team'
import { Box, Card, CardHeader, Divider, List, Typography, useMediaQuery } from '@mui/material'
import { Theme } from '@mui/system'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

interface CsTeamDetailsProps {
  csTeam?: CsTeam
}

export const CsTeamDetails = ({ csTeam }: CsTeamDetailsProps) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const auth = useAuth()
  const align = mdUp ? 'horizontal' : 'vertical'
  const router = useRouter()

  const csLeader = csTeam?.cs_members.filter((member) => member.user.role === 'leader')?.[0]
  const csMembers = csTeam?.cs_members.filter((member) => member.user.role === 'member')

  return (
    <Box>
      <Card>
        <CardHeader title="Thông tin Cs team" />
        <Divider />
        <List disablePadding>
          <PropertyListItem align={align} label="Tên team" value={csTeam?.name} />
          <PropertyListItem align={align} label="Mô tả team" value={csTeam?.description} />
          {csLeader?.id ? (
            <PropertyListItem align={align} label="Leader">
              {auth?.user?.role === 'member' ? (
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {csLeader.user.displayName}
                </Typography>
              ) : (
                <NextLink href={`/dashboard/csteam/members/${csLeader.id}`} passHref>
                  <Typography variant="body2" color="primary.main" sx={{ cursor: 'pointer', fontWeight: '500' }}>
                    {csLeader.user.displayName}
                  </Typography>
                </NextLink>
              )}
            </PropertyListItem>
          ) : (
            <PropertyListItem align={align} label="Leader" value="Chưa có leader" />
          )}
          {csMembers && csMembers?.length > 0 ? (
            <PropertyListItem align={align} label="Members">
              {auth?.user?.role === 'member' ? (
                <>
                  {csMembers
                    ?.filter?.((member) => member?.user?.id === auth?.user?.id)
                    ?.map((member) => (
                      <NextLink href={`/dashboard/csteam/members/${member.id}`} passHref key={member.id}>
                        <Typography variant="body2" color="primary.main" sx={{ cursor: 'pointer', fontWeight: '500' }}>
                          {member.user.displayName}
                        </Typography>
                      </NextLink>
                    ))}
                </>
              ) : (
                <>
                  {csMembers?.map((member) => (
                    <NextLink href={`/dashboard/csteam/members/${member.id}`} passHref key={member.id}>
                      <Typography variant="body2" color="primary.main" sx={{ cursor: 'pointer', fontWeight: '500' }}>
                        {member.user.displayName}
                      </Typography>
                    </NextLink>
                  ))}
                </>
              )}
            </PropertyListItem>
          ) : (
            <PropertyListItem align={align} label="Leader" value="Chưa có member" />
          )}
        </List>
      </Card>
    </Box>
  )
}
