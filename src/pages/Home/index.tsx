import { Box, Typography } from '@mui/joy'

import AdCarousel from '../../components/AdCarousel'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import BasicContainer from '../../components/layouts/BasicContainer'
import TwoSidedLayout from '../../components/layouts/TwoSidedLayout'

import BookRankings from './BookRankings'
import HomePageImage from './HomePageImage'
import HomePageWelcome from './HomePageWelcome'

export default function Home() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'

  return (
    <>
      <Header />
      <Box
        sx={(theme) => ({
          width: '100%',
          backgroundColor: 'rgba(245 245 245 / 0.6)',
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
        {isLoggedIn && (
          <>
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
                高分书籍
              </Typography>
              <BookRankings />
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
                编辑精选
              </Typography>
              <AdCarousel height={'300px'} />
            </BasicContainer>
          </>
        )}
        <Footer />
      </Box>
    </>
  )
}
