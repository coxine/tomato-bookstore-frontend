import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { Box, Typography, Button, Divider } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { productGetInfo } from '../api/products'
import MainLayout from '../components/layouts/MainLayout'
import SpecificationTable from '../components/SpecificationTable'
import Loading from '../components/UI/Loading'
import { showToast, ToastSeverity } from '../components/UI/ToastMessageUtils'
import { Book } from '../types/book'

export default function BookDetails() {
  const breadcrumbsItems = [{ label: '购买书籍', link: '/books' }]
  const { id } = useParams()
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
    <MainLayout title="书籍详情" breadcrumbsItems={breadcrumbsItems}>
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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              px: 2,
            }}
          >
            <Box
              component="img"
              src={bookDetails.cover}
              alt={bookDetails.title}
              sx={{
                width: '100%',
                height: 'auto',
                maxWidth: 480,
                maxHeight: 400,
                objectFit: 'contain',
                borderRadius: 2,
              }}
            />
          </Box>

          <Box
            sx={{
              flex: 2,
              display: 'flex',
              flexDirection: 'column',
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
                <span style={{ fontSize: '1.7rem' }}>
                  {bookDetails.price?.toFixed(2) ?? '0.00'}
                </span>
              </Typography>
            </Typography>

            <Divider />

            {bookDetails.description && (
              <Box>
                <Typography level="title-lg" sx={{ mb: 1 }}>
                  商品描述
                </Typography>
                <Typography level="body-md">
                  {bookDetails.description}
                </Typography>
              </Box>
            )}

            <Box>
              <Typography level="title-lg" sx={{ mb: 1 }}>
                用户评价
              </Typography>
              <Typography level="body-md" sx={{ color: 'warning.500' }}>
                评分: {bookDetails.rate} / 10
              </Typography>
              {/* 未来可增加评分功能 */}
            </Box>
            {bookDetails.specifications &&
              bookDetails.specifications.length > 0 && (
                <Box>
                  <Typography level="title-lg" sx={{ mb: 1 }}>
                    规格参数
                  </Typography>
                  <SpecificationTable
                    specifications={bookDetails.specifications}
                  />
                </Box>
              )}

            <Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  color="warning"
                  variant="solid"
                  startDecorator={<AddShoppingCartIcon />}
                >
                  加入购物车
                </Button>
                <Button
                  color="danger"
                  variant="solid"
                  startDecorator={<ShoppingCartCheckoutIcon />}
                >
                  立即购买
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </MainLayout>
  )
}
