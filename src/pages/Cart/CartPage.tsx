import { ShoppingCartCheckout } from '@mui/icons-material'
import { Button, Card, Link, List, Stack, Typography } from '@mui/joy'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import {
  cartDeleteProduct,
  cartGetCartItems,
  cartUpdateQuantity,
} from '../../api/cart'
import MainLayout from '../../components/layouts/MainLayout'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { CartData, CartItem } from '../../types/cart'

import CartItemCard from './CartItemCard'

const mockCartData: CartData = {
  items: [],
  total: 0,
  totalAmount: 0,
}

export default function CartPage() {
  const [cartData, setCartData] = useState<CartData>(mockCartData)
  const modifyQue = useRef<Record<string, number>>({}) // { [cartItemId]: quantity }
  const [modifyQueueVersion, setModifyQueueVersion] = useState(0) // 队列更新触发器（仅用于触发 useEffect）
  const modifyTimerRef = useRef<NodeJS.Timeout | null>(null)
  const deleteQue = useRef<Record<string, boolean>>({}) // { [cartItemId]: true }
  const [deleteQueueVersion, setDeleteQueueVersion] = useState(0) // 删除队列触发器
  const deleteTimerRef = useRef<NodeJS.Timeout | null>(null)

  const fetchCart = () => {
    cartGetCartItems().then((res) => {
      if (res.data.code === '200') {
        setCartData(res.data.data)
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
    // 初始化
    fetchCart()
  }, [])

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

      console.log('修改商品数量:', { cartItemId, quantity: newQuantity })

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
          console.log(res)
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
    }, 1000)

    return () => {
      if (modifyTimerRef.current) clearTimeout(modifyTimerRef.current)
    }
  }, [modifyQueueVersion, processModify])

  // 删除购物车商品
  const handleRemoveItem = (cartItemId: string) => {
    console.log('删除商品:', { cartItemId })

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
          console.log(res)
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
    }, 1000)

    return () => {
      if (deleteTimerRef.current) clearTimeout(deleteTimerRef.current)
    }
  }, [deleteQueueVersion, processDelete])

  const handleCheckout = () => {
    // 模拟结算操作
    console.log('结算购物车:', {
      items: cartData.items,
      totalAmount: cartData.totalAmount,
    })

    showToast({
      title: '结算',
      message: '功能尚未实现',
      severity: ToastSeverity.Primary,
      duration: 2000,
    })
  }

  return (
    <MainLayout breadcrumbsItems={[]} title="购物车">
      {cartData.items.length === 0 ? (
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
          <List sx={{ py: 2 }}>
            {cartData.items.map((item: CartItem) => (
              <CartItemCard
                key={item.cartItemId}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
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
              您选购了{' '}
              <Typography fontWeight="lg" color="primary">
                {cartData.total}
              </Typography>{' '}
              种商品， 共{' '}
              <Typography fontWeight="lg" color="primary">
                {cartData.items.reduce((sum, item) => {
                  return sum + item.quantity
                }, 0)}
              </Typography>{' '}
              件，合计：
              <Typography
                component="span"
                fontWeight="lg"
                fontSize="xl"
                color="danger"
                sx={{ mx: 1 }}
              >
                ¥{cartData.totalAmount.toFixed(2)}
              </Typography>
            </Typography>

            <Button
              color="danger"
              onClick={handleCheckout}
              startDecorator={<ShoppingCartCheckout />}
            >
              结算
            </Button>
          </Card>
        </Stack>
      )}
    </MainLayout>
  )
}
