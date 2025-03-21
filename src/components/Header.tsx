import Box from '@mui/joy/Box'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'

import ColorSchemeToggle from './UI/ColorSchemeToggle'

export default function Header() {
  return (
    <Sheet
      variant="solid"
      color="primary"
      invertedColors
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        p: 2,
        minWidth: 'min-content',
      }}
    >
      <Box
        sx={{ flex: 1, display: 'flex', gap: 1, px: 2, alignItems: 'center' }}
      >
        <Typography
          level="h4"
          component="h1"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          🍅 西红柿读书
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexShrink: 0, gap: 2 }}>
        <ColorSchemeToggle />
      </Box>
    </Sheet>
  )
}
