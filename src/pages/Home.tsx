import ArrowForward from '@mui/icons-material/ArrowForward'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Link from '@mui/joy/Link'
import Typography from '@mui/joy/Typography'

import Footer from '../components/Footer'
import Header from '../components/Header'
import TwoSidedLayout from '../components/layouts/TwoSidedLayout'

export default function Home() {
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
        })}
      >
        <TwoSidedLayout imageSrc="/home-book.png" imageAlt="home-book">
          <Typography
            level="h1"
            sx={{
              fontWeight: 'xl',
              fontSize: 'clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)',
            }}
          >
            A large headlinerer about our product features & services
          </Typography>
          <Typography
            textColor="text.secondary"
            sx={{ fontSize: 'lg', lineHeight: 'lg' }}
          >
            A descriptive secondary text placeholder. Use it to explain your
            business offer better.
          </Typography>

          <Link href="/login" sx={{ display: 'block', width: '100%' }}>
            <Button
              size="lg"
              endDecorator={<ArrowForward />}
              sx={{ width: '100%' }}
            >
              登录
            </Button>
          </Link>

          <Link href="/login" sx={{ display: 'block', width: '100%' }}>
            <Button
              size="lg"
              endDecorator={<ArrowForward />}
              variant="soft"
              sx={{ width: '100%' }}
            >
              注册
            </Button>
          </Link>
        </TwoSidedLayout>
      </Box>
      <Footer />
    </>
  )
}
