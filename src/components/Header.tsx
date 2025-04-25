import { Box, Sheet, Typography } from '@mui/joy'
import { Link } from 'react-router-dom'

import ColorSchemeToggle from './UI/ColorSchemeToggle'

export default function Header() {
  return (
    <Sheet
      variant="soft"
      color="neutral"
      invertedColors
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000, // Header
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        p: 2,
        minWidth: 'min-content',
        boxShadow: 'sm',
      }}
    >
      <Box
        sx={{ flex: 1, display: 'flex', gap: 1, px: 2, alignItems: 'center' }}
      >
        <Link to="/">
          <Typography
            level="h4"
            component="h1"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            🍅 西红柿读书
          </Typography>
        </Link>
      </Box>
      <Box sx={{ display: 'flex', flexShrink: 0, gap: 2 }}>
        <ColorSchemeToggle />
      </Box>
    </Sheet>
  )
}
