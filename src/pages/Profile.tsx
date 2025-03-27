import { Box } from '@mui/joy'

import Footer from '../components/Footer'
import Header from '../components/Header'

export default function Profile() {
  return (
    <>
      <Header />
      <Box
        sx={(theme) => ({
          width: '100%',
          backgroundColor: 'rgba(255 255 255 / 0.6)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.6)',
          },
          height: '100vh',
        })}
      >
        <Footer />
      </Box>
    </>
  )
}
