import { Box, CircularProgress } from '@mui/joy'

export default function Loading() {
  return (
    <Box
      sx={(theme) => ({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        [theme.getColorSchemeSelector('dark')]: {
          backgroundColor: 'rgba(19 19 24 / 0.6)',
        },
        zIndex: 9999,
      })}
    >
      <CircularProgress />
    </Box>
  )
}
