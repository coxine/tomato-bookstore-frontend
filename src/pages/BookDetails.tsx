import { Box, Typography, Table, Button, Divider } from '@mui/joy'
import { useParams } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import { Book } from '../types/book'

const bookDetails: Book = {
  id: '101',
  title: '深入理解Java虚拟机',
  price: 99.5,
  rate: 9.5,
  description: 'Java开发者必读经典，全面讲解JVM工作原理',
  cover: 'https://bed.cos.tg/file/1742573518219_image.png',
  detail: '本书详细讲解了Java虚拟机的体系结构、内存管理、字节码执行等核心内容',
  specifications: [
    { id: '1001', item: '作者', value: '周志明', productId: '101' },
    {
      id: '1002',
      item: '副标题',
      value: 'JVM高级特性与最佳实践',
      productId: '101',
    },
    { id: '1003', item: 'ISBN', value: '9787111421900', productId: '101' },
    { id: '1004', item: '装帧', value: '平装', productId: '101' },
    { id: '1005', item: '页数', value: '540', productId: '101' },
    { id: '1006', item: '出版社', value: '机械工业出版社', productId: '101' },
    { id: '1007', item: '出版日期', value: '2013-09-01', productId: '101' },
  ],
}

export default function BookDetails() {
  const { id } = useParams()
  console.log('Book ID:', id)

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          px: { xs: 2, md: 6 },
          pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
        }}
      >
        <Typography level="h2" component="h1" sx={{ mb: 3 }}>
          书籍详情
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 4,
          }}
        >
          <Box
            sx={{
              flex: 1,
              maxWidth: 480,
              display: 'flex',
            }}
          >
            <img
              src={bookDetails.cover}
              alt={bookDetails.title}
              style={{ width: '100%', borderRadius: 12 }}
            />
          </Box>

          <Box
            sx={{
              flex: 2,
              display: 'flex',
              flexDirection: 'column',
              pl: { xs: 0, md: 16 },
              gap: 2,
            }}
          >
            <Typography level="h3" component="h2">
              {bookDetails.title}
            </Typography>

            <Typography level="h4" sx={{ color: 'danger.500' }}>
              <Typography
                level="body-md"
                sx={{ color: 'danger.500', fontSize: '1.3rem' }}
              >
                ¥{' '}
                <span style={{ fontSize: '2rem' }}>
                  {bookDetails.price?.toFixed(2) ?? '0.00'}
                </span>
              </Typography>
            </Typography>

            <Divider />
            <Typography level="body-md">{bookDetails.description}</Typography>

            <Box>
              <Typography level="title-lg" sx={{ mb: 1 }}>
                用户评价
              </Typography>
              <Typography level="body-md" sx={{ color: 'warning.500' }}>
                评分: {bookDetails.rate} / 10
              </Typography>
              {/* 未来可增加评分功能 */}
            </Box>
            <Box>
              <Typography level="title-lg" sx={{ mb: 1 }}>
                规格参数
              </Typography>
              <Table>
                <tbody>
                  {(bookDetails.specifications ?? []).map((spec) => (
                    <tr key={spec.id}>
                      <td style={{ fontWeight: 500, width: 120 }}>
                        {spec.item}
                      </td>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Box>

            <Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button color="warning" variant="soft">
                  加入购物车
                </Button>
                <Button color="danger" variant="solid">
                  立即购买
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
