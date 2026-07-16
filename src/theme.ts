import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0ca30c",
      dark: "#006300",
      light: "#1baf7a",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f9f9f7",
      paper: "#fcfcfb",
    },
    text: {
      primary: "#0b0b0b",
      secondary: "#52514e",
    },
    divider: "rgba(11,11,11,0.10)",
  },
  typography: {
    fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(11,11,11,0.08)",
          boxShadow: "0 1px 3px rgba(11,11,11,0.06)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fcfcfb",
          color: "#0b0b0b",
          boxShadow: "0 1px 0 rgba(11,11,11,0.08)",
        },
      },
    },
  },
});

export default theme;
