import { Container, Typography } from '@mui/material'

function About() {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        About
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Content coming soon.
      </Typography>
    </Container>
  )
}

export default About
