import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material'
import Scatter from './components/Scatter'

function App() {
  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 700, color: 'primary.main' }}
          >
            Garden Bench Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Scatter
            xKey="cost"
            yKey="outcome"
            xLabel="Cost"
            yLabel="Outcome"
            blurb="Outcome score plotted against the average cost of each run, grouped by model."
          />
          <Scatter
            xKey="time"
            yKey="outcome"
            xLabel="Time"
            yLabel="Outcome"
            blurb="Outcome score plotted against average wall-clock time, grouped by model."
          />
        </Box>
      </Container>
    </>
  )
}

export default App
