import { ShoppingCartCheckout } from '@mui/icons-material'
import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormLabel,
  Link,
  List,
  Stack,
  Typography,
} from '@mui/joy'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import {
  cartDeleteProduct,
  cartGetCartItems,
  cartUpdateQuantity,
} from '../../api/cart'
import { orderSubmit, orderToPay } from '../../api/order'
import { userGetSimpleInfo } from '../../api/user'
import MainLayout from '../../components/layouts/MainLayout'
import Loading from '../../components/UI/Loading'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { CartData, CartItem } from '../../types/cart'

import CartItemCard from './CartItemCard'

const mockCartData: CartData = {
  items: [],
  total: 0,
  totalAmount: 0,
}

export default function CartPage() {
  const paymentMethod = 'ALIPAY'
  const username = sessionStorage.getItem('username')

  const [loading, setLoading] = useState(false) // 判断是否已经加载好数据
  const [cartData, setCartData] = useState<CartData>(mockCartData)
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  )
  const modifyQue = useRef<Record<string, number>>({}) // { [cartItemId]: quantity }
  const [modifyQueueVersion, setModifyQueueVersion] = useState(0) // 队列更新触发器（仅用于触发 useEffect）
  const modifyTimerRef = useRef<NodeJS.Timeout | null>(null)
  const deleteQue = useRef<Record<string, boolean>>({}) // { [cartItemId]: true }
  const [deleteQueueVersion, setDeleteQueueVersion] = useState(0) // 删除队列触发器
  const deleteTimerRef = useRef<NodeJS.Timeout | null>(null)

  // 计算已选择的商品总数和总价
  const selectedItemsTotal = cartData.items
    .filter((item) => selectedItems[item.cartItemId])
    .reduce((sum, item) => sum + item.quantity, 0)

  const selectedItemsCount = cartData.items.filter(
    (item) => selectedItems[item.cartItemId]
  ).length

  const selectedItemsAmount = cartData.items
    .filter((item) => selectedItems[item.cartItemId])
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)

  const fetchCart = useCallback(() => {
    cartGetCartItems().then((res) => {
      if (res.data.code === '200') {
        setCartData(res.data.data)
        setLoading(true)

        // 默认全选所有商品
        const initialSelection = res.data.data.items.reduce(
          (acc: Record<string, boolean>, item: CartItem) => {
            acc[item.cartItemId] = true
            return acc
          },
          {}
        )
        setSelectedItems(initialSelection)
      } else {
        showToast({
          title: '未知消息码',
          message: '服务器出错！获取商品数据失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }, [])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const handleSelectItem = (cartItemId: string, selected: boolean) => {
    setSelectedItems((prev) => ({
      ...prev,
      [cartItemId]: selected,
    }))
  }

  const handleSelectAll = (selected: boolean) => {
    const newSelection = cartData.items.reduce(
      (acc: Record<string, boolean>, item: CartItem) => {
        acc[item.cartItemId] = selected
        return acc
      },
      {}
    )
    setSelectedItems(newSelection)
  }

  // 检查是否全选
  const isAllSelected =
    cartData.items.length > 0 &&
    cartData.items.every((item) => selectedItems[item.cartItemId])

  const handleQuantityChange = useCallback(
    (cartItemId: string, newQuantity: number) => {
      if (newQuantity < 1) {
        showToast({
          title: '数量错误',
          message: '商品数量不能小于1',
          severity: ToastSeverity.Danger,
          duration: 3000,
        })
        return
      }

      // 模拟修改购物车
      const newCartData = {
        ...cartData,
        items: cartData.items.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: newQuantity }
            : item
        ),
      }

      // 重新计算总价
      const totalAmount = newCartData.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )

      setCartData({
        ...newCartData,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
      })

      modifyQue.current[cartItemId] = newQuantity

      showToast({
        title: '修改成功',
        message: '商品数量已更新',
        severity: ToastSeverity.Success,
        duration: 2000,
      })
    },
    [cartData, modifyQue]
  )

  const processModify = useCallback(() => {
    if (Object.keys(modifyQue.current).length === 0) return

    const currentQueue = { ...modifyQue.current }
    modifyQue.current = {}

    Promise.all(
      Object.entries(currentQueue).map(([cartItemId, quantity]) =>
        cartUpdateQuantity(cartItemId, quantity).then((res) => {
          if (res.data.code === '400') {
            showToast({
              title: '修改未生效',
              message:
                cartData.items
                  .filter((item) => item.cartItemId === cartItemId)
                  .map((item) => item.title)
                  .join(', ') +
                res.data.msg +
                '请刷新重试！',
              severity: ToastSeverity.Danger,
              duration: 2000,
            })
          } else if (res.data.code !== '200') {
            // 重新加入队列等待重试
            modifyQue.current[cartItemId] = quantity
            setModifyQueueVersion((prev) => prev + 1)
          }
        })
      )
    )
  }, [cartData.items])

  // 队列监听（防抖处理）
  useEffect(() => {
    // 清理旧定时器
    if (modifyTimerRef.current) clearTimeout(modifyTimerRef.current)

    // 启动新定时器
    modifyTimerRef.current = setTimeout(() => {
      processModify()
    }, 500)

    return () => {
      if (modifyTimerRef.current) clearTimeout(modifyTimerRef.current)
    }
  }, [modifyQueueVersion, processModify])

  // 删除购物车商品
  const handleRemoveItem = (cartItemId: string) => {
    // 模拟删除购物车商品
    const newItems = cartData.items.filter(
      (item) => item.cartItemId !== cartItemId
    )
    const total = newItems.length
    const totalAmount = newItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    setCartData({
      items: newItems,
      total,
      totalAmount: parseFloat(totalAmount.toFixed(2)),
    })

    // 从选中项中移除
    const newSelectedItems = { ...selectedItems }
    delete newSelectedItems[cartItemId]
    setSelectedItems(newSelectedItems)

    deleteQue.current[cartItemId] = true

    showToast({
      title: '删除成功',
      message: '商品已从购物车中移除',
      severity: ToastSeverity.Success,
      duration: 2000,
    })
  }

  const processDelete = useCallback(() => {
    if (Object.keys(deleteQue.current).length === 0) return

    const currentQueue = { ...deleteQue.current }
    deleteQue.current = {}

    Promise.all(
      Object.entries(currentQueue).map(([cartItemId]) =>
        cartDeleteProduct(cartItemId).then((res) => {
          if (res.data.code === '400') {
            showToast({
              title: '修改未生效',
              message:
                cartData.items
                  .filter((item) => item.cartItemId === cartItemId)
                  .map((item) => item.title)
                  .join(', ') +
                res.data.msg +
                '请刷新重试！',
              severity: ToastSeverity.Danger,
              duration: 2000,
            })
          } else if (res.data.code !== '200') {
            // 重新加入队列等待重试
            deleteQue.current[cartItemId] = true
            setDeleteQueueVersion((prev) => prev + 1)
          }
        })
      )
    )
  }, [cartData.items])

  useEffect(() => {
    // 清理旧定时器
    if (deleteTimerRef.current) clearTimeout(deleteTimerRef.current)

    // 启动新定时器
    deleteTimerRef.current = setTimeout(() => {
      processDelete()
    }, 500)

    return () => {
      if (deleteTimerRef.current) clearTimeout(deleteTimerRef.current)
    }
  }, [deleteQueueVersion, processDelete])

  const handleCheckout = () => {
    // 获取所有选中的商品ID
    const selectedItemIds = cartData.items
      .filter((item) => selectedItems[item.cartItemId])
      .map((item) => item.cartItemId)

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

          orderSubmit(selectedItemIds, shippingAddress, paymentMethod).then(
            (res) => {
              if (res.data.code === '200') {
                showToast({
                  title: '订单提交成功',
                  message: '即将前往支付宝支付',
                  severity: ToastSeverity.Success,
                  duration: 3000,
                })
                selectedItemIds.forEach((itemId) => {
                  handleRemoveItem(itemId)
                }) // 删除已购买商品
                orderToPay(res.data.data.orderId).then((res) => {
                  if (res.data.code === '200') {
                    document.writeln(res.data.data.paymentForm)
                  } else {
                    showToast({
                      title: '未知消息码',
                      message:
                        '服务器出错！前往支付宝支付失败，请刷新重新尝试！',
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
                  title: '未知消息码',
                  message: '服务器出错！订单提交失败，请刷新重新尝试！',
                  severity: ToastSeverity.Warning,
                  duration: 3000,
                })
              }
            }
          )
        } else {
          showToast({
            title: '未知消息码',
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
    <MainLayout breadcrumbsItems={[]} title="购物车">
      {!loading ? (
        <Loading />
      ) : cartData.items.length === 0 ? (
        <Card
          variant="outlined"
          sx={{
            px: 4,
            py: 8,
            maxWidth: 800,
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <Typography level="h4" sx={{ mb: 2 }}>
            购物车空空如也，快去选购吧！
          </Typography>
          <Link
            component={RouterLink}
            to="/books"
            sx={{ display: 'block', width: '100%' }}
          >
            <Button
              variant="soft"
              color="primary"
              startDecorator={<ShoppingCartCheckout />}
            >
              选购商品
            </Button>
          </Link>
        </Card>
      ) : (
        <Stack
          spacing={2}
          sx={{ maxWidth: 1000, mx: 'auto', px: { xs: 2, md: 0 } }}
        >
          <Stack direction="row" alignItems="center" spacing={1} sx={{ py: 1 }}>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <Checkbox
                checked={isAllSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              <FormLabel>全选</FormLabel>
            </FormControl>
          </Stack>

          <List sx={{ py: 2 }}>
            {cartData.items.map((item: CartItem) => (
              <CartItemCard
                key={item.cartItemId}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
                selected={!!selectedItems[item.cartItemId]}
                onSelectChange={handleSelectItem}
              />
            ))}
          </List>

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
              种商品， 共{' '}
              <Typography fontWeight="lg" color="primary">
                {selectedItemsTotal}
              </Typography>{' '}
              件，合计：
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
        </Stack>
      )}
    </MainLayout>
  )
}
