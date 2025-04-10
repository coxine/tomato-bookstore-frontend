import { Grid } from '@mui/joy'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { productGetAllSimpleInfo } from '../../api/products'
import Bookcard from '../../components/BookCard'
import MainLayout from '../../components/layouts/MainLayout'
import Loading from '../../components/UI/Loading'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Book } from '../../types/book'

export default function Books() {
  const [bookList, setBookList] = useState<Book[]>()

  const fetchAllSimpleBook = () => {
    productGetAllSimpleInfo().then((res) => {
      if (res.data.code === '200') {
        setBookList(res.data.data)
      } else {
        showToast({
          title: '未知消息码',
          message: '服务器出错！获取商品数据失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }

  useEffect(() => {
    fetchAllSimpleBook()
  }, [])

  return (
    <MainLayout title="购买书籍">
      {!bookList ? (
        <Loading />
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            px: { xs: 2, md: 6 },
            mt: 2,
          }}
        >
          {bookList.map((book) => (
            <Grid key={book.id} xs={6} sm={4} md={2.4}>
              <Link to={`/books/${book.id}`}>
                <Bookcard book={book} />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </MainLayout>
  )
}
