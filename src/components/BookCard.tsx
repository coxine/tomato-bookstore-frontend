import { Box, Card, CardContent, Typography } from '@mui/joy'

import { Book } from '../types/book'

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card
      key={book.id}
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 1,
        width: '100%',
        height: '100%',
      }}
    >
      {book.cover && (
        <Box
          component="img"
          src={book.cover}
          alt={book.title}
          sx={{
            width: 100,
            height: 140,
            objectFit: 'cover',
            borderRadius: '4px',
          }}
        />
      )}

      <CardContent sx={{ textAlign: 'center', width: '100%' }}>
        <Typography
          level="title-lg"
          sx={{
            mt: 1,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
          }}
        >
          {book.title}
        </Typography>
        {book.price !== undefined && (
          <Typography
            level="title-md"
            color="danger"
            fontWeight="lg"
            sx={{ mt: 0.5 }}
          >
            ￥{book.price.toFixed(2)}
          </Typography>
        )}

        {book.description && (
          <Typography
            level="body-sm"
            textColor="text.secondary"
            sx={{
              mt: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {book.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
