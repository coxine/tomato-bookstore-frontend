import { Box, Button, Divider } from '@mui/joy'
import { Link } from 'react-router-dom'

import { getFilteredNavigationItems } from '../../config/navigationConfig'

export default function DesktopNavigation() {
  const { main, user } = getFilteredNavigationItems()

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        gap: 1,
      }}
    >
      {main.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          variant="soft"
          color="primary"
          size="sm"
          startDecorator={item.icon}
        >
          {item.label}
        </Button>
      ))}

      <Divider orientation="vertical" sx={{ mx: 1 }} />

      {user.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          variant="soft"
          color="primary"
          size="sm"
          startDecorator={item.icon}
        >
          {item.label}
        </Button>
      ))}

      <Divider orientation="vertical" sx={{ mx: 1 }} />
    </Box>
  )
}
