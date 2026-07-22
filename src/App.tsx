import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material'
import Scatter from './components/Scatter'
import Radar from './components/Radar'

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
            Gardenbench Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Radar
            width={800}
            height={600}
            blurb="Latest per-suite accuracy for each model, one curve per model."
          />
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Scatter
            xKey="avg_suite_cost"
            yKey="avg_suite_accuracy"
            xLabel="Average Cost"
            yLabel="Average Accuracy"
            blurb="Outcome score plotted against the average cost of each run, grouped by model."
          />
          <Scatter
            xKey="avg_suite_time"
            yKey="avg_suite_accuracy"
            xLabel="Average Time"
            yLabel="Average Accuracy"
            blurb="Outcome score plotted against average wall-clock time, grouped by model."
          />
          <Scatter
            xKey="avg_suite_output_tokens"
            yKey="avg_suite_accuracy"
            xLabel="Average Output Tokens Used"
            yLabel="Average Accuracy"
            blurb="Outcome score plotted against average wall-clock time, grouped by model."
          />
        </Box>
      </Container>
    </>
  )
}

export default App
