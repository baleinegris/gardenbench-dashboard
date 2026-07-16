import { ScatterChart } from "@mui/x-charts/ScatterChart";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import { useCsvData } from "../hooks/useCsvData";

interface ScatterProps {
  xKey: string;
  yKey: string;
  xLabel?: string;
  yLabel?: string;
  title?: string;
  blurb?: string;
  groupBy?: string;
  height?: number;
  width?: number;
}

export default function Scatter({
  xKey,
  yKey,
  xLabel = xKey,
  yLabel = yKey,
  title,
  blurb,
  groupBy = "model",
  height = 320,
  width = 500,
}: ScatterProps) {
  const { rows, error, loading } = useCsvData();

  return (
    <Card sx={{ width, maxWidth: "100%", flexShrink: 0 }}>
      <CardContent>
        <Typography variant="h5" component="h2" align="center" sx={{ mb: 2 }}>
          {title ?? `${yLabel} vs. ${xLabel}`}
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
          <ScatterPlot
            rows={rows}
            xKey={xKey}
            yKey={yKey}
            xLabel={xLabel}
            yLabel={yLabel}
            groupBy={groupBy}
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

interface ScatterPlotProps {
  rows: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  xLabel: string;
  yLabel: string;
  groupBy: string;
  height: number;
}

function ScatterPlot({
  rows,
  xKey,
  yKey,
  xLabel,
  yLabel,
  groupBy,
  height,
}: ScatterPlotProps) {
  const points = rows
    .filter(
      (row) =>
        row[xKey] !== null &&
        row[xKey] !== undefined &&
        row[yKey] !== null &&
        row[yKey] !== undefined
    )
    .map((row, i) => ({
      id: i,
      x: Number(row[xKey]),
      y: Number(row[yKey]),
      group: String(row[groupBy] ?? "unknown"),
    }));

  // Group points by `groupBy` so each group renders as its own colored
  // series with a legend entry.
  const byGroup = new Map<string, typeof points>();
  for (const point of points) {
    if (!byGroup.has(point.group)) byGroup.set(point.group, []);
    byGroup.get(point.group)!.push(point);
  }

  return (
    <ScatterChart
      height={height}
      series={Array.from(byGroup.entries()).map(([group, groupPoints]) => ({
        label: group,
        data: groupPoints,
        valueFormatter: (point) =>
          `${group}\n${xLabel}: ${point.x}, ${yLabel}: ${point.y}`,
      }))}
      xAxis={[{ label: xLabel }]}
      yAxis={[{ label: yLabel, min: 0, max: 1 }]}
    />
  );
}
