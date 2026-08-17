import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import { NavLink, useMatch } from 'react-router-dom'

function NavItem({ to, end, children }: { to: string; end?: boolean; children: React.ReactNode }) {
  const isActive = useMatch({ path: to, end })
  return (
    <Button
      component={NavLink}
      to={to}
      sx={{
        color: 'inherit',
        fontWeight: isActive ? 700 : 400,
        opacity: isActive ? 1 : 0.7,
      }}
    >
      {children}
    </Button>
  )
}

function Navbar() {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 700, color: 'primary.main', flexGrow: 1 }}
        >
          GardenBench Dashboard
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <NavItem to="/" end>
            Home
          </NavItem>
          <NavItem to="/about">About</NavItem>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
