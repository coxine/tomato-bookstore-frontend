import { Box, Typography, Grid } from '@mui/joy'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { productGetAllSimpleInfo } from '../api/products'
import Bookcard from '../components/BookCard'
import Sidebar from '../components/Sidebar'
import Loading from '../components/UI/Loading'
import { showToast, ToastSeverity } from '../components/UI/ToastMessageUtils'
import { Book } from '../types/book'

export default function Books() {
  const [bookList, setBookList] = useState<Book[]>()

  const fetchAllSimpleBook = () => {
    productGetAllSimpleInfo().then((res) => {
      if (res.data.code === '200') {
        setBookList(res.data.data)
      } else {
        showToast({
          title: '未知消息码',
          message: '服务器出错，获取商品数据失败，请刷新尝试!',
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
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Sidebar />
      <Box
        component="main"
        className="MainContent"
        sx={{
          pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
          overflow: 'auto',
        }}
      >
        <Box sx={{ flex: 1, width: '100%' }}>
          <Box
            sx={{
              position: 'sticky',
              top: { sm: -100, md: -110 },
              bgcolor: 'background.body',
              zIndex: 1,
            }}
          >
            <Box sx={{ px: { xs: 2, md: 6 } }}>
              <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                购买书籍
              </Typography>
            </Box>
            {/* 未来可利用 `Tabs` 增加不同分类的书籍选购 */}
          </Box>
          {bookList === undefined ? (
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
        </Box>
      </Box>
    </Box>
  )
}
