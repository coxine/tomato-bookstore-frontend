import { Grid } from '@mui/joy'

import BookCard from '../../components/BookCard'
import { Book } from '../../types/book'

const bookList: Book[] = [
  {
    id: '101',
    title: '深入理解Java虚拟机',
    price: 99.5,
    rate: 9.5,
    description: 'Java开发者必读经典，全面讲解JVM工作原理',
    cover: 'https://bed.cos.tg/file/1742573518219_image.png',
    detail:
      '本书详细讲解了Java虚拟机的体系结构、内存管理、字节码执行等核心内容',
  },
  {
    id: '102',
    title: '代码整洁之道',
    price: 59.0,
    rate: 9.2,
    description: '软件工程领域的经典著作',
    cover: 'https://bed.cos.tg/file/1742573518219_image.png',
    detail: '本书提出一种观念：代码质量与其整洁度成正比',
  },
  {
    id: '102',
    title: '代码整洁之道',
    price: 59.0,
    rate: 9.2,
    description: '软件工程领域的经典著作',
    cover: 'https://bed.cos.tg/file/1742573518219_image.png',
    detail: '本书提出一种观念：代码质量与其整洁度成正比',
  },
  {
    id: '102',
    title: '代码整洁之道',
    price: 59.0,
    rate: 9.2,
    description: '软件工程领域的经典著作',
    cover: 'https://bed.cos.tg/file/1742573518219_image.png',
    detail: '本书提出一种观念：代码质量与其整洁度成正比',
  },
  {
    id: '102',
    title: '代码整洁之道',
    price: 59.0,
    rate: 9.2,
    description: '软件工程领域的经典著作',
    cover: 'https://bed.cos.tg/file/1742573518219_image.png',
    detail: '本书提出一种观念：代码质量与其整洁度成正比',
  },
  {
    id: '102',
    title: '代码整洁之道',
    price: 59.0,
    rate: 9.2,
    description: '软件工程领域的经典著作',
    cover: 'https://bed.cos.tg/file/1742573518219_image.png',
    detail: '本书提出一种观念：代码质量与其整洁度成正比',
  },
]

export default function BookCarousel() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: 'flex',
        flexWrap: { xs: 'wrap', sm: 'nowrap' }, // Allow wrapping in xs mode
        flexDirection: { xs: 'row', sm: 'row' },
        overflowX: { xs: 'initial', sm: 'auto' },
        overflowY: { xs: 'auto', sm: 'initial' },
        p: 1,
      }}
    >
      {bookList.map((book) => (
        <Grid
          xs={6} // Two columns in xs mode
          sm={2.7}
          key={book.id}
          sx={{
            flex: { xs: '1 1 50%', sm: '0 0 auto' }, // Ensure 50% width in xs mode
            minWidth: { xs: 'auto', sm: 200 },
          }}
        >
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  )
}
