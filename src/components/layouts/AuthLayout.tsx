import { Box, Typography } from '@mui/joy'
import React from 'react'
import { Link } from 'react-router-dom'

import ColorSchemeToggle from '../UI/ColorSchemeToggle'

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Box
        sx={(theme) => ({
          position: 'relative',
          zIndex: '1',
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(20px)',
          borderRadius: 'sm',
          margin: '2rem auto',
          width: { xs: '90%', sm: '80vw', md: '50vw' },
          backgroundColor: 'rgba(255 255 255 / 0.6)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.6)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: { xs: '40vh', md: '80vh' },
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <Typography level="title-lg" component={Link} to={'/'}>
                🍅 西红柿读书
              </Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100%',
              my: 'auto',
              py: 2,
              pb: 1,
              gap: 2,
              width: 400,
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
            {children}
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" sx={{ textAlign: 'center' }}>
              © 软件攻嗔小组 {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: '0',
          top: '0',
          bottom: '0',
          left: '0',
          backdropFilter: 'blur(10px)',
          background:
            'linear-gradient(225deg,rgb(19, 157, 172) 0%,rgb(102, 132, 192) 100%)',

          [theme.getColorSchemeSelector('dark')]: {
            backdropFilter: 'blur(20px)',
            background:
              'linear-gradient(225deg,rgb(2, 5, 39) 0%,rgb(7, 42, 51) 100%)',
          },
        })}
      />
    </>
  )
}
