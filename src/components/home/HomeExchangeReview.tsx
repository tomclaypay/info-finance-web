import { useQuery } from '@apollo/client'
import { Box, Container } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { AuthContext } from '@app/contexts/amplify-context'
import ReviewCreateForm from '@app/components/exchange-review/ReviewCreateForm'
import GET_COMPLAINT_CATEGORIES from '@app/operations/queries/complaints/get-complaint-categories'
import GET_ONE_USER from '@app/operations/queries/users/get-one-user'
import { Typography } from '@mui/material'

const HomeExchangeReview = () => {
  const value = useContext(AuthContext)
  const { t } = useTranslation(['complaints', 'home-page', 'common'])
  const { data: dataCategories } = useQuery(GET_COMPLAINT_CATEGORIES)
  const { data: dataUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: value?.user?.id,
    },
  })

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        padding: '24px 0',
        objectFit: 'contain',
      }}
    >
      <Container>
        <Typography variant="h2" sx={{ fontWeight: '600', mb: 4, textAlign: 'center' }}>
          {t('title_left', { ns: 'home-page' })}
        </Typography>
      </Container>
      <Container maxWidth="md">
        <ReviewCreateForm
          dataCategories={dataCategories?.complaint_categories}
          dataUser={dataUser?.users?.[0]}
          dataInput={''}
        />
      </Container>
    </Box>
  )
}
export default HomeExchangeReview
