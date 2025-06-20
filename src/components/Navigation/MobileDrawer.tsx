import { Box, Divider, Sheet, Typography } from '@mui/joy'

import { getFilteredNavigationItems } from '../../config/navigationConfig'

import NavigationButton from './NavigationButton'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { main, user } = getFilteredNavigationItems()
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'

  return (
    <>
      {/* 侧边栏 */}
      <Sheet
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '280px',
          zIndex: 1300,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          borderRight: '1px solid',
          borderColor: 'divider',
          p: 2,
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          gap: 2,
        }}
        variant="soft"
        color="primary"
      >
        {isLoggedIn && (
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}
          >
            <Typography
              level="title-lg"
              component="h1"
              sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
            >
              🍅 西红柿读书
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* 主要导航 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {main.map((item) => (
                <NavigationButton
                  key={item.path}
                  item={item}
                  onClick={onClose}
                />
              ))}
            </Box>

            {/* 用户导航 */}
            <Box
              sx={{
                mt: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              {user.map((item) => (
                <NavigationButton
                  key={item.path}
                  item={item}
                  onClick={onClose}
                />
              ))}
            </Box>
          </Box>
        )}
      </Sheet>

      {/* 遮罩层 */}
      {isOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1250,
            display: { xs: 'block', md: 'none' },
          }}
          onClick={onClose}
        />
      )}
    </>
  )
}
