import { ShoppingCartCheckout } from '@mui/icons-material'
import { Box, Typography, Table, Chip, Checkbox, Card, Button } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { chapterGetAll, chapterGetPurchased } from '../../api/chapter'
import { orderSubmitWithChapter, orderToPay } from '../../api/order'
import { userGetSimpleInfo } from '../../api/user'
import MainLayout from '../../components/layouts/MainLayout'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Chapter } from '../../types/chapter'
import { chapterStatusFormatter } from '../../utils/formatter'

export default function BookPurchase() {
  const paymentMethod = 'ALIPAY'
  const username = sessionStorage.getItem('username')
  const navigate = useNavigate()
  const { productId } = useParams()
  const productIdNum = parseInt(productId || '0')
  const [bookChapters, setBookChapters] = useState<Chapter[]>([])
  const [purchasedChapters, setPurchasedChapters] = useState<number[]>()
  const [selectedItems, setSelectedItems] = useState<Record<number, boolean>>(
    {}
  )

  const selectedItemsCount = bookChapters.filter(
    (item) => selectedItems[item.id || 0]
  ).length

  const selectedItemsAmount = bookChapters
    .filter((item) => selectedItems[item.id || 0])
    .reduce(
      (
        sum //sum, item
      ) => sum, //sum +  item.price * item.quantity
      0
    )
    .toFixed(2)

  const fetchChapters = useCallback(async () => {
    if (!productIdNum) {
      showToast({
        title: '意外错误',
        message: '不存在商品ID！',
        severity: ToastSeverity.Warning,
        duration: 3000,
      })
      navigate('/')
    } else {
      chapterGetAll(productIdNum).then((res) => {
        if (res.data.code === '200') {
          setBookChapters(res.data.data)
        } else {
          showToast({
            title: '未知错误',
            message: '服务器出错！获取章节失败，请刷新尝试！',
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      })
      chapterGetPurchased(productIdNum).then((res) => {
        if (res.data.code === '200') {
          setPurchasedChapters(res.data.data)
        } else {
          showToast({
            title: '未知错误',
            message: '服务器出错！获取章节失败，请刷新尝试！',
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      })
    }
  }, [productIdNum, navigate])

  useEffect(() => {
    setPurchasedChapters([])
    fetchChapters()
  }, [fetchChapters])

  const onSelectChange = (chapterId: number | undefined, selected: boolean) => {
    if (!chapterId) {
      showToast({
        title: '意外错误',
        message: '选择失败，请刷新重试！',
        severity: ToastSeverity.Warning,
        duration: 3000,
      })
      return
    }
    setSelectedItems((prev) => ({
      ...prev,
      [chapterId]: selected,
    }))
  }

  const handleCheckout = () => {
    // 获取所有选中的商品ID
    const selectedItemIds = bookChapters
      .filter((item) => selectedItems[item.id || 0])
      .map((item) => item.id || 0)

    console.log(selectedItems)
    console.log(selectedItemIds)
    if (username != null) {
      userGetSimpleInfo(username).then((res) => {
        if (res.data.code === '200') {
          if (!res.data.data.location && !res.data.data.telephone) {
            showToast({
              title: '空地址和电话错误',
              message: '请先完善个人信息！',
              severity: ToastSeverity.Warning,
              duration: 3000,
            })
            return
          } else if (!res.data.data.location) {
            showToast({
              title: '空地址错误',
              message: '请先完善个人信息！',
              severity: ToastSeverity.Warning,
              duration: 3000,
            })
            return
          } else if (!res.data.data.telephone) {
            showToast({
              title: '空电话错误',
              message: '请先完善个人信息！',
              severity: ToastSeverity.Warning,
              duration: 3000,
            })
            return
          }
          const shippingAddress = {
            address: res.data.data.location,
            phone: res.data.data.telephone,
            name: res.data.data.username,
          }

          orderSubmitWithChapter(
            productIdNum,
            selectedItemIds,
            shippingAddress,
            paymentMethod
          ).then((res) => {
            if (res.data.code === '200') {
              showToast({
                title: '订单提交成功',
                message: '即将前往支付宝支付',
                severity: ToastSeverity.Success,
                duration: 3000,
              })
              orderToPay(res.data.data.orderId).then((res) => {
                if (res.data.code === '200') {
                  document.writeln(res.data.data.paymentForm)
                } else {
                  showToast({
                    title: '未知错误',
                    message: '服务器出错！前往支付宝支付失败，请刷新重新尝试！',
                    severity: ToastSeverity.Warning,
                    duration: 3000,
                  })
                }
              })
            } else if (res.data.code === '400') {
              showToast({
                title: '订单提交失败',
                message: res.data.msg + '请重新尝试提交！',
                severity: ToastSeverity.Warning,
                duration: 3000,
              })
            } else {
              showToast({
                title: '未知错误',
                message: '服务器出错！订单提交失败，请刷新重新尝试！',
                severity: ToastSeverity.Warning,
                duration: 3000,
              })
            }
          })
        } else {
          showToast({
            title: '未知错误',
            message: '服务器出错！获取用户数据失败，请重新登录尝试！',
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      })
    } else {
      showToast({
        title: '未登录',
        message: '请重新登录尝试！',
        severity: ToastSeverity.Warning,
        duration: 3000,
      })
    }
  }

  return (
    <MainLayout
      title="未购章节"
      breadcrumbsItems={[
        { label: '购买书籍', link: '/books' },
        { label: '书籍详情', link: `/books/${productIdNum}` },
      ]}
    >
      <Box className="chapter-table" sx={{ px: { xs: 2, sm: 5, md: 10 } }}>
        <Typography level="h4" sx={{ pb: 1 }}>
          章节列表
        </Typography>
        {!bookChapters || !purchasedChapters ? (
          '章节加载中'
        ) : (
          <Table className="table">
            <thead>
              <tr>
                <th></th>
                <th>章节编号</th>
                <th>章节名称</th>
                <th>章节状态</th>
                <th>购买状态</th>
              </tr>
            </thead>
            <tbody>
              {bookChapters.map((chapter, index) => (
                <tr key={chapter.id}>
                  <td>
                    <Checkbox
                      disabled={purchasedChapters.includes(chapter.id || 0)}
                      onChange={(e) =>
                        onSelectChange(chapter.id, e.target.checked)
                      }
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{chapter.name}</td>
                  <td>
                    <Chip color={chapterStatusFormatter(chapter.status).color}>
                      {chapterStatusFormatter(chapter.status).label}
                    </Chip>
                  </td>
                  <td>
                    {chapter.status === 'FREE'
                      ? '——'
                      : purchasedChapters.includes(chapter.id || 0)
                        ? '已购买'
                        : '未购买'}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Card
          variant="outlined"
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'flex-end',
            gap: 2,
          }}
        >
          <Typography sx={{ flexGrow: 1 }}>
            已选择{' '}
            <Typography fontWeight="lg" color="primary">
              {selectedItemsCount}
            </Typography>{' '}
            个章节，合计：
            <Typography
              component="span"
              fontWeight="lg"
              fontSize="xl"
              color="danger"
              sx={{ mx: 1 }}
            >
              ¥{selectedItemsAmount}
            </Typography>
          </Typography>

          <Button
            color="danger"
            onClick={handleCheckout}
            startDecorator={<ShoppingCartCheckout />}
            disabled={selectedItemsCount === 0}
          >
            结算
          </Button>
        </Card>
      </Box>
    </MainLayout>
  )
}
