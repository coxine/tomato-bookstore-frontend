import { ShoppingCartCheckout } from '@mui/icons-material'
import { Box, Typography, Table, Chip, Checkbox, Card, Button } from '@mui/joy'
import { useCallback, useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { chapterGetAll, chapterGetPurchased } from '../../api/chapter'
import { orderSubmitWithChapter, orderToPay } from '../../api/order'
import { userGetSimpleInfo } from '../../api/user'
import MainLayout from '../../components/layouts/MainLayout'
import Loading from '../../components/UI/Loading'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Chapter } from '../../types/chapter'
import { chapterStatusFormatter } from '../../utils/formatter'

export default function ChapterPurchase() {
  const paymentMethod = 'ALIPAY'
  const username = sessionStorage.getItem('username')
  const navigate = useNavigate()
  const { productId } = useParams()
  const productIdNum = parseInt(productId || '0')
  const [bookChapters, setBookChapters] = useState<Chapter[]>([])
  const [purchasedChapters, setPurchasedChapters] = useState<number[]>([])
  const [selectedItems, setSelectedItems] = useState<Record<number, boolean>>(
    {}
  )

  const eligibleChapters = useMemo(() => {
    return bookChapters.filter(
      (chapter) =>
        chapter.status !== 'FREE' &&
        chapter.status !== 'LOCKED' &&
        !purchasedChapters.includes(chapter.id || 0)
    )
  }, [bookChapters, purchasedChapters])

  const allEligibleSelected = useMemo(() => {
    return (
      eligibleChapters.length > 0 &&
      eligibleChapters.every((chapter) => selectedItems[chapter.id || 0])
    )
  }, [eligibleChapters, selectedItems])

  const selectedItemsCount = bookChapters.filter(
    (item) => selectedItems[item.id || 0]
  ).length

  const selectedItemsAmount = bookChapters
    .filter((item) => selectedItems[item.id || 0])
    .reduce((sum, item) => sum + (item.price ?? 0), 0)
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

  const handleSelectAll = (checked: boolean) => {
    const newSelection = { ...selectedItems }

    eligibleChapters.forEach((chapter) => {
      if (chapter.id) {
        newSelection[chapter.id] = checked
      }
    })

    setSelectedItems(newSelection)
  }

  const handleCheckout = () => {
    const selectedItemIds = bookChapters
      .filter((item) => selectedItems[item.id || 0])
      .map((item) => item.id || 0)

    if (username != null) {
      userGetSimpleInfo(username).then((res) => {
        if (res.data.code === '200') {
          if (!res.data.data.location || !res.data.data.telephone) {
            showToast({
              title: '个人信息不全',
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
      title="购买章节"
      breadcrumbsItems={[
        { label: '购买书籍', link: '/books' },
        { label: '书籍详情', link: `/books/${productIdNum}` },
      ]}
    >
      <Box className="chapter-table" sx={{ px: { xs: 0, md: 6 } }}>
        {!bookChapters ? (
          <Loading />
        ) : bookChapters.length === 0 ? (
          '该书籍暂无章节'
        ) : (
          <Table className="table">
            <thead>
              <tr>
                <th style={{ textAlign: 'center', width: '10%' }}>
                  <Checkbox
                    checked={allEligibleSelected}
                    indeterminate={
                      selectedItemsCount > 0 &&
                      !allEligibleSelected &&
                      eligibleChapters.length > 0
                    }
                    disabled={eligibleChapters.length === 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    sx={{ verticalAlign: 'middle' }}
                  />
                </th>
                <th style={{ width: '45%' }}>名称</th>
                <th style={{ width: '20%' }}>状态</th>
                <th style={{ width: '25%' }}>价格</th>
              </tr>
            </thead>
            <tbody>
              {bookChapters.map((chapter) => (
                <tr key={chapter.id}>
                  <td style={{ textAlign: 'center' }}>
                    <Checkbox
                      disabled={
                        purchasedChapters.includes(chapter.id || 0) ||
                        chapter.status === 'FREE' ||
                        chapter.status === 'LOCKED'
                      }
                      onChange={(e) =>
                        onSelectChange(chapter.id, e.target.checked)
                      }
                      sx={{
                        verticalAlign: 'middle',
                      }}
                    />
                  </td>
                  <td>{chapter.name}</td>
                  <td>
                    <Chip color={chapterStatusFormatter(chapter).color}>
                      {chapterStatusFormatter(chapter).label}
                    </Chip>
                  </td>
                  <td>
                    {chapter.status === 'FREE'
                      ? '-'
                      : chapter.price
                        ? `¥ ${chapter.price.toFixed(2)}`
                        : '-'}
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
            mt: 2,
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
