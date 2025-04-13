import { MenuRounded } from '@mui/icons-material'
import { GlobalStyles, IconButton, Sheet, Typography } from '@mui/joy'

import { toggleSidebar } from '../utils/sidebar'

export default function SidebarHeader() {
  return (
    <Sheet
      sx={{
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: 'var(--Header-height)',
        zIndex: 1198,
        p: 2,
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'background.level1',
        boxShadow: 'sm',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('md')]: {
              '--Header-height': '0px',
            },
          },
        })}
      />
      <IconButton
        onClick={() => toggleSidebar()}
        variant="outlined"
        color="neutral"
        size="sm"
      >
        <MenuRounded />
      </IconButton>
      <Typography
        level="title-lg"
        component="div"
        sx={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontWeight: 'bold',
        }}
      >
        🍅西红柿读书
      </Typography>
    </Sheet>
  )
}
