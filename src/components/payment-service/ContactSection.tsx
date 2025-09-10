import { useMutation } from '@apollo/client'
import CREATE_FEEDBACK from '@app/operations/rests/feedback/mutation-feedback'
import { Alert, Box, Button, Container, Snackbar, TextField, Typography } from '@mui/material'
import { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

const ContactSection = () => {
  const { t } = useTranslation('payment-service')
  const [createFeedback] = useMutation(CREATE_FEEDBACK, { context: { clientName: 'strapi' } })
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    createFeedback({
      variables: {
        email: data.get('email'),
        name: data.get('name'),
        phone: data.get('phone'),
        comments: data.get('comments'),
      },
    })
    setOpen(true)
  }

  return (
    <Box id="contact" sx={{ width: '100%', py: 8, px: 2, backgroundColor: 'white' }}>
      <Container maxWidth="sm">
        <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 600, textAlign: 'center', mb: 4 }}>
          {t('feedbackForm')}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Email"
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Name"
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Phone"
            type="tel"
            id="phone"
            name="phone"
            placeholder="Your Phone"
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Comments"
            id="comments"
            name="comments"
            placeholder="Your message"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ px: 6, backgroundColor: 'black', '&:hover': { backgroundColor: '#333' } }}
            >
              {t('send')}
            </Button>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Cảm ơn bạn đã gửi phản hồi!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ContactSection
