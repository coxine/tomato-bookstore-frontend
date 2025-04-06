import { Box, Typography, Table, Button, Divider } from '@mui/joy'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { productGetInfo } from '../api/products'
import Sidebar from '../components/Sidebar'
import Loading from '../components/UI/Loading'
import { showToast, ToastSeverity } from '../components/UI/ToastMessageUtils'
import { Book } from '../types/book'
import { Specification } from '../types/specification'

// const bookDetails: Book = {
//   id: '101',
//   title: '深入理解Java虚拟机',
//   price: 99.5,
//   rate: 9.5,
//   description: 'Java开发者必读经典，全面讲解JVM工作原理',
//   cover: 'https://bed.cos.tg/file/1742573518219_image.png',
//   detail: '本书详细讲解了Java虚拟机的体系结构、内存管理、字节码执行等核心内容',
//   specifications: [
//     { id: '1001', item: '作者', value: '周志明', productId: '101' },
//     {
//       id: '1002',
//       item: '副标题',
//       value: 'JVM高级特性与最佳实践',
//       productId: '101',
//     },
//     { id: '1003', item: 'ISBN', value: '9787111421900', productId: '101' },
//     { id: '1004', item: '装帧', value: '平装', productId: '101' },
//     { id: '1005', item: '页数', value: '540', productId: '101' },
//     { id: '1006', item: '出版社', value: '机械工业出版社', productId: '101' },
//     { id: '1007', item: '出版日期', value: '2013-09-01', productId: '101' },
//   ],
// }

export default function BookDetails() {
  const { id } = useParams()
  console.log('Book ID:', id)
  const navigate = useNavigate()
  const [bookDetails, setBookDetails] = useState<Book>()

  const fetchBook = useCallback(async () => {
    if (!id) {
      showToast({
        title: '意外错误',
        message: '未知商品ID!',
        severity: ToastSeverity.Warning,
        duration: 3000,
      })
      navigate('/')
    } else {
      productGetInfo(id).then((res) => {
        if (res.data.code === '200') {
          setBookDetails(res.data.data)
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
  }, [id, navigate])

  useEffect(() => {
    fetchBook()
  }, [fetchBook])

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

        {bookDetails === undefined ? (
          <Loading />
        ) : (
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
                    {(bookDetails.specifications ?? [])
                      .reduce(
                        (rows, spec, index) => {
                          if (index % 2 === 0) {
                            rows.push([spec])
                          } else {
                            rows[rows.length - 1].push(spec)
                          }
                          return rows
                        },
                        [] as Array<Array<Specification>>
                      )
                      .map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((spec) => (
                            <React.Fragment key={spec.id}>
                              <td style={{ fontWeight: 500, width: 120 }}>
                                {spec.item}
                              </td>
                              <td>{spec.value}</td>
                            </React.Fragment>
                          ))}
                          {row.length < 2 && (
                            <>
                              <td style={{ width: 120 }}></td>
                              <td></td>
                            </>
                          )}
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
        )}
      </Box>
    </Box>
  )
}
