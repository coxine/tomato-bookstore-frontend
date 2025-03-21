import { Typography } from '@mui/joy'
import Box from '@mui/joy/Box'

import Footer from '../components/Footer'
import Header from '../components/Header'
import BasicContainer from '../components/layouts/BasicContainer'
import TwoSidedLayout from '../components/layouts/TwoSidedLayout'

import AuthorCarousel from './Home/AuthorCarousel'
import BookCarousel from './Home/BookCarousel'
import HomePageImage from './Home/HomePageImage'
import HomePageWelcome from './Home/HomePageWelcome'

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
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          '& > div': {
            scrollSnapAlign: 'start',
          },
        })}
      >
        <TwoSidedLayout
          leftChildren={<HomePageWelcome />}
          rightChildren={<HomePageImage />}
        />
        <BasicContainer>
          <Typography
            level="h1"
            component="h2"
            textAlign="center"
            sx={{
              writingMode: { xs: 'horizontal-tb', md: 'vertical-rl' },
              mb: 2,
            }}
          >
            优秀作者
          </Typography>
          <AuthorCarousel />
        </BasicContainer>
        <BasicContainer>
          <Typography
            level="h1"
            component="h2"
            textAlign="center"
            sx={{
              writingMode: { xs: 'horizontal-tb', md: 'vertical-rl' },
              mb: 2,
            }}
          >
            精选言情小说
          </Typography>
          <BookCarousel />
        </BasicContainer>
      </Box>
      <Footer />
    </>
  )
}
