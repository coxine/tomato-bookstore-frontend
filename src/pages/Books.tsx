import { Box, Typography, Grid } from '@mui/joy'

import Bookcard from '../components/BookCard'
import Sidebar from '../components/Sidebar'
import { Book } from '../types/book'

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
]

export default function Books() {
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
          <Grid
            container
            spacing={2}
            sx={{
              px: { xs: 2, md: 6 },
              mt: 2,
            }}
          >
            {bookList.map((book) => (
              <Grid
                key={book.id}
                xs={6}
                sm={4}
                md={2.4}
              >
                <Bookcard book={book} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
