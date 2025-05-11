import { Box, Typography, Divider } from '@mui/joy'
import { Rating, ThemeProvider } from '@mui/material'
import Markdown from 'react-markdown'

import SpecificationTable from '../../components/SpecificationTable'
import { muiTheme } from '../../theme/muiTheme'
import { Book } from '../../types/book'
import { Stockpile } from '../../types/stockpile'

import BookActions from './BookActions'
import ChapterTable from './ChapterTable'

interface BookInfoProps {
  bookDetails: Book
  stockpile?: Stockpile
  onCartAction: (mode: 'add' | 'buy') => void
  onRatingClick: () => void
  onDeleteClick: () => void
}

export function BookInfo({
  bookDetails,
  stockpile,
  onCartAction,
  onRatingClick,
  onDeleteClick,
}: BookInfoProps) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 4,
          mr: { xs: 0, sm: 4, md: 8 },
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            px: 2,
          }}
        >
          <Box
            component="img"
            src={bookDetails.cover}
            alt={bookDetails.title}
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: 480,
              maxHeight: 400,
              objectFit: 'contain',
              borderRadius: 2,
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography level="h3" component="h2">
            {bookDetails.title}
          </Typography>
          {bookDetails.description && (
            <Typography level="body-md" sx={{ color: 'text.tertiary' }}>
              {bookDetails.description}
            </Typography>
          )}

          <Typography level="h4" sx={{ color: 'danger.500' }}>
            <Typography
              level="body-md"
              sx={{ color: 'danger.500', fontSize: '1.3rem' }}
            >
              ¥{' '}
              <span style={{ fontSize: '1.7rem' }}>
                {bookDetails.price?.toFixed(2) ?? '0.00'}
              </span>
              <span
                style={{
                  fontSize: '0.8rem',
                  color: 'grey',
                  marginLeft: '8px',
                  fontWeight: '400',
                }}
              >
                {!stockpile ? '库存加载中...' : `剩余 ${stockpile.amount} 本`}
              </span>
            </Typography>
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <BookDetailSection bookDetails={bookDetails} />
          <BookActions
            book={bookDetails}
            onCartAction={onCartAction}
            onDeleteClick={onDeleteClick}
            onRatingClick={onRatingClick}
          />
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <ChapterTable />
    </>
  )
}

function BookDetailSection({ bookDetails }: { bookDetails: Book }) {
  return (
    <>
      {bookDetails.detail && (
        <Box>
          <Typography level="title-lg">商品详细信息</Typography>
          <Markdown>{bookDetails.detail}</Markdown>
        </Box>
      )}

      <Box>
        <Typography level="title-lg" sx={{ mb: 1 }}>
          用户评价
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <ThemeProvider theme={muiTheme}>
            <Rating
              readOnly
              defaultValue={(bookDetails.rate || 0) / 2}
              precision={0.5}
            />
          </ThemeProvider>
          <Typography level="body-lg" color="warning">
            {bookDetails.rate} / 10
          </Typography>
        </Box>
      </Box>

      {bookDetails.specifications && bookDetails.specifications.length > 0 && (
        <Box>
          <Typography level="title-lg" sx={{ my: 1 }}>
            规格参数
          </Typography>
          <SpecificationTable specifications={bookDetails.specifications} />
        </Box>
      )}
    </>
  )
}

export default BookInfo
