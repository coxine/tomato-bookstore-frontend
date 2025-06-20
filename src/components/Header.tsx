import { Menu as MenuIcon } from '@mui/icons-material'
import { Box, IconButton, Sheet, Typography } from '@mui/joy'
import * as React from 'react'
import { Link } from 'react-router-dom'

import DesktopNavigation from './Navigation/DesktopNavigation'
import MobileDrawer from './Navigation/MobileDrawer'
import ColorSchemeToggle from './UI/ColorSchemeToggle'
import LogoutToggle from './UI/LogoutToggle'

export default function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'

  return (
    <>
      <Sheet
        variant="soft"
        color="primary"
        invertedColors
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: 'var(--Header-height, 60px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          minWidth: 'min-content',
          boxShadow: 'sm',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link to="/">
            <Typography
              level="title-lg"
              component="h1"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              🍅 西红柿读书
            </Typography>
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isLoggedIn && <DesktopNavigation />}

          <ColorSchemeToggle />

          {isLoggedIn && (
            <>
              <LogoutToggle />
              <IconButton
                variant="soft"
                size="sm"
                onClick={() => setDrawerOpen(true)}
                sx={{ display: { xs: 'flex', md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Sheet>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
