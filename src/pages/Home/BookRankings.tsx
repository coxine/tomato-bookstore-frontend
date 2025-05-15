import { Grid } from '@mui/joy'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { rateRank } from '../../api/rate'
import BookCard from '../../components/BookCard'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Book } from '../../types/book'

export default function BookRankings() {
  const bookCount = 5
  console.log('bookCount', bookCount)
  const [bookRankings, setBookRankings] = useState<Book[]>([])

  const fetchRank = () => {
    rateRank(bookCount).then((res) => {
      if (res.data.code === '200') {
        setBookRankings(res.data.data)
      } else if (res.data.code === '400') {
        showToast({
          title: '意外错误',
          message: res.data.msg,
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      } else {
        showToast({
          title: '未知错误',
          message: '服务器出错！获取排行榜失败，请重新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }

  useEffect(() => {
    fetchRank()
  }, [])

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
      {bookRankings &&
        bookRankings.map((book) => (
          <Grid
            to={`/books/${book.id}`}
            xs={6}
            sm={2.7}
            key={book.id}
            sx={{
              flex: { xs: '1 1 50%', sm: '0 0 auto' },
              minWidth: { xs: 'auto', sm: 200 },
            }}
            component={Link}
          >
            <BookCard book={book} />
          </Grid>
        ))}
    </Grid>
  )
}
