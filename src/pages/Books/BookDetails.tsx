import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { Box, Typography, Button, Divider } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  productDelete,
  productGetInfo,
  productGetStockpile,
} from '../../api/products'
import MainLayout from '../../components/layouts/MainLayout'
import SpecificationTable from '../../components/SpecificationTable'
import showAlertDialog from '../../components/UI/AlertDialogUtils'
import Loading from '../../components/UI/Loading'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Book } from '../../types/book'
import { Stockpile } from '../../types/stockpile'

function confirmDelete(productId: string) {
  showAlertDialog('删除商品', '您确定要删除此商品吗？', (close) => (
    <Button
      color="danger"
      variant="solid"
      onClick={() => {
        handleDelete(productId)
        close()
      }}
      startDecorator={<DeleteIcon />}
    >
      删除
    </Button>
  ))
}
function handleDelete(productId: string) {
  productDelete(productId).then((res) => {
    if (res.data.code === '200') {
      showToast({
        title: '删除商品',
        message: '商品删除成功！',
        severity: ToastSeverity.Success,
        duration: 3000,
      })
      setTimeout(() => {
        window.location.href = '/books'
      }, 1000)
    } else if (res.data.code === '400') {
      showToast({
        title: '删除失败',
        message: res.data.msg,
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
    } else {
      showToast({
        title: '未知消息码',
        message: '服务器出错！删除商品失败，请重新尝试！',
        severity: ToastSeverity.Warning,
        duration: 3000,
      })
    }
  })
}

export default function BookDetails() {
  const isAdmin = sessionStorage.getItem('role') === 'ADMIN'
  const breadcrumbsItems = [{ label: '购买书籍', link: '/books' }]
  const { productId } = useParams()
  const navigate = useNavigate()
  const [bookDetails, setBookDetails] = useState<Book>()
  const [stockpile, setStockpile] = useState<Stockpile>()

  const fetchBook = useCallback(async () => {
    if (!productId) {
      showToast({
        title: '意外错误',
        message: '不存在商品ID！',
        severity: ToastSeverity.Warning,
        duration: 3000,
      })
      navigate('/')
    } else {
      productGetInfo(productId).then((res) => {
        if (res.data.code === '200') {
          setBookDetails(res.data.data)
        } else {
          showToast({
            title: '未知消息码',
            message: '服务器出错！获取商品数据失败，请刷新尝试！',
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      })
      productGetStockpile(productId).then((res) => {
        if (res.data.code === '200') {
          setStockpile(res.data.data)
        } else {
          showToast({
            title: '未知消息码',
            message: '服务器出错！获取商品库存失败，请刷新尝试！',
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      })
    }
  }, [productId, navigate])

  useEffect(() => {
    fetchBook()
  }, [fetchBook])

  return (
    <MainLayout title="书籍详情" breadcrumbsItems={breadcrumbsItems}>
      {!bookDetails || !productId ? (
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
              gap: 1,
            }}
          >
            <Typography level="h3" component="h2">
              {bookDetails.title}
            </Typography>
            {bookDetails.description && (
              <Typography level="body-md" sx={{ color: 'text.tertiary' }}>
                {bookDetails.description}
              </Typography>
            )}

            <Typography level="h4" sx={{ color: 'danger.500' }}>
              <Typography
                level="body-md"
                sx={{ color: 'danger.500', fontSize: '1.3rem' }}
              >
                ¥{' '}
                <span style={{ fontSize: '1.7rem' }}>
                  {bookDetails.price?.toFixed(2) ?? '0.00'}
                </span>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'grey',
                    marginLeft: '8px',
                    fontWeight: '400',
                  }}
                >
                  {!stockpile ? '库存加载中...' : `剩余 ${stockpile.amount} 本`}
                </span>
              </Typography>
            </Typography>

            <Divider sx={{ my: 1 }} />

            {bookDetails.detail && (
              <Box>
                <Typography level="title-lg" sx={{ mb: 1 }}>
                  商品详细信息
                </Typography>
                <Markdown>{bookDetails.detail}</Markdown>
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
                  variant="soft"
                  startDecorator={<AddShoppingCartIcon />}
                >
                  加入购物车
                </Button>
                <Button
                  color="danger"
                  variant="soft"
                  startDecorator={<ShoppingCartCheckoutIcon />}
                >
                  立即购买
                </Button>
              </Box>
              {isAdmin && (
                <Box sx={{ display: 'flex', gap: 2, pt: 1 }}>
                  <Link to={`/books/edit/${bookDetails.id}`}>
                    <Button
                      color="primary"
                      variant="soft"
                      startDecorator={<EditIcon />}
                    >
                      编辑商品
                    </Button>
                  </Link>
                  <Button
                    color="danger"
                    variant="soft"
                    startDecorator={<DeleteIcon />}
                    onClick={() => {
                      confirmDelete(productId)
                    }}
                  >
                    删除商品
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </MainLayout>
  )
}
