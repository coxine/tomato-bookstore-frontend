import { Box } from '@mui/joy'

import { Book } from '../../types/book'

import BookCard from './BookCard'

const bookList: Book[] = [
  {
    id: '1',
    title: '软件开发的技术基础',
    tags: ['编程', 'Java'],
    cover: 'https://bed.cos.tg/file/1742573518219_image.png',
  },
]
export default function BookCarousel() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateRows: 'repeat(2, auto)',
        gap: 2,
        p: 3,
        overflowX: 'auto',
      }}
    >
      {bookList.map((book, index) => (
        <BookCard book={book} index={index} />
      ))}
    </Box>
  )
}
