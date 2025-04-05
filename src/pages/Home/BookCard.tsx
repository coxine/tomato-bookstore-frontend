import { Box, Card, CardContent, Typography } from '@mui/joy'

import Tag from '../../components/UI/Tag'
import { Book } from '../../types/book'

interface BookCardProps {
  book: Book
  index: number
}

export default function BookCard({ book, index }: BookCardProps) {
  return (
    <Card
      key={index}
      variant="outlined"
      sx={{
        minWidth: { xs: 120, sm: 160 },
        textAlign: 'center',
      }}
    >
      <Box
        component="img"
        src={book.cover}
        alt={book.title}
        sx={{ width: 80, height: 80, mx: 'auto', mt: 2, objectFit: 'cover' }}
      />
      <CardContent>
        <Typography level="title-lg">{book.title}</Typography>
        <Typography
          color="primary"
          level="body-sm"
          sx={{
            overflow: 'auto',
          }}
        >
          {(book.tags ?? []).map((tag, idx) => (
            <Tag key={idx} text={tag} color="primary" fontSize="sm" />
          ))}
        </Typography>
      </CardContent>
    </Card>
  )
}
