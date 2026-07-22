import { RadarChart } from "@mui/x-charts/RadarChart";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import { useCsvData } from "../hooks/useCsvData";

const SUITE_COLUMN_RE = /^suite_avg_(.+)_accuracy$/;

interface RadarProps {
  title?: string;
  blurb?: string;
  groupBy?: string;
  dateKey?: string;
  height?: number;
  width?: number;
}

export default function Radar({
  title = "Per-suite accuracy by model",
  blurb,
  groupBy = "model",
  dateKey = "date",
  height = 400,
  width = 500,
}: RadarProps) {
  const { rows, error, loading } = useCsvData();

  return (
    <Card sx={{ width, maxWidth: "100%", flexShrink: 0 }}>
      <CardContent>
        <Typography variant="h5" component="h2" align="center" sx={{ mb: 2 }}>
          {title}
        </Typography>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error">Couldn't load benchmark data: {error}</Alert>
        )}

        {!loading && !error && rows && (
          <RadarPlot
            rows={rows}
            groupBy={groupBy}
            dateKey={dateKey}
            height={height}
          />
        )}

        {blurb && (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 2 }}
          >
            {blurb}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

interface RadarPlotProps {
  rows: Record<string, unknown>[];
  groupBy: string;
  dateKey: string;
  height: number;
}

function RadarPlot({ rows, groupBy, dateKey, height }: RadarPlotProps) {
  const suiteColumns = Object.keys(rows[0] ?? {}).filter((key) =>
    SUITE_COLUMN_RE.test(key)
  );
  const suiteNames = suiteColumns.map(
    (key) => key.match(SUITE_COLUMN_RE)![1]
  );

  // Each model has one row per date; keep only its most recent row.
  const latestByGroup = new Map<string, Record<string, unknown>>();
  for (const row of rows) {
    const group = String(row[groupBy] ?? "unknown");
    const existing = latestByGroup.get(group);
    if (!existing || String(row[dateKey]) > String(existing[dateKey])) {
      latestByGroup.set(group, row);
    }
  }

  return (
    <RadarChart
      height={height}
      radar={{ metrics: suiteNames, max: 1 }}
      series={Array.from(latestByGroup.entries()).map(([group, row]) => ({
        label: group,
        data: suiteColumns.map((col) => {
          const value = Number(row[col]);
          return Number.isNaN(value) ? 0 : value;
        }),
      }))}
    />
  );
}
