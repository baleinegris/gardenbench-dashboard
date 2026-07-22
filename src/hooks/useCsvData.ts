import Papa from "papaparse";
import { useEffect, useState } from "react";

// Replace with your actual bucket's HTTPS URL or CloudFront domain.
// s3:// URIs are not fetchable directly from a browser.
const CSV_URL =
  "https://gardenbench-data.s3.us-east-2.amazonaws.com/data/cumulative_data_avg.csv";

type Row = Record<string, unknown>;

// Module-level cache so the CSV is fetched once no matter how many
// components call this hook.
let cachedRows: Row[] | null = null;
let inFlight: Promise<Row[]> | null = null;

async function fetchCsv(): Promise<Row[]> {
  const res = await fetch(CSV_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch CSV: ${res.status} ${res.statusText}`);
  }
  const text = await res.text();

  const parsed = Papa.parse<Row>(text, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  if (parsed.errors.length > 0) {
    console.warn("CSV parse warnings:", parsed.errors);
  }

  return parsed.data;
}

export function useCsvData() {
  const [rows, setRows] = useState<Row[] | null>(cachedRows);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(cachedRows === null);

  useEffect(() => {
    if (cachedRows !== null) return;
    let cancelled = false;

    if (!inFlight) {
      inFlight = fetchCsv().catch((err) => {
        inFlight = null;
        throw err;
      });
    }

    inFlight
      .then((fetched) => {
        cachedRows = fetched;
        if (!cancelled) {
          setRows(fetched);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { rows, error, loading };
}
