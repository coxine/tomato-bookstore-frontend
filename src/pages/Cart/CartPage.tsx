import { ShoppingCartCheckout } from '@mui/icons-material'
import { Button, Card, Link, List, Stack, Typography } from '@mui/joy'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import MainLayout from '../../components/layouts/MainLayout'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { CartData, CartItem } from '../../types/cart'

import CartItemCard from './CartItemCard'

const mockCartData: CartData = {
  items: [
    {
      cartItemId: '201',
      productId: '102',
      title: '代码整洁之道',
      price: 59.0,
      description: '软件工程领域的经典著作',
      cover:
        'https://tomato-nju.oss-cn-nanjing.aliyuncs.com/017ac261-c14b-4adf-994d-c583afee7048.png',
      detail: '本书提出一种观念：代码质量与其整洁度成正比',
      quantity: 1,
    },
    {
      cartItemId: '202',
      productId: '101',
      title: '深入理解Java虚拟机',
      price: 99.5,
      description: 'Java开发者必读经典，全面讲解JVM工作原理',
      cover:
        'https://tomato-nju.oss-cn-nanjing.aliyuncs.com/017ac261-c14b-4adf-994d-c583afee7048.png',
      detail:
        '本书详细讲解了Java虚拟机的体系结构、内存管理、字节码执行等核心内容',
      quantity: 2,
    },
  ],
  total: 2,
  totalAmount: 258.0,
}

export default function CartPage() {
  const [cartData, setCartData] = useState<CartData>(mockCartData)

  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
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
    showToast({
      title: '修改成功',
      message: '商品数量已更新',
      severity: ToastSeverity.Success,
      duration: 2000,
    })
  }

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
    showToast({
      title: '删除成功',
      message: '商品已从购物车中移除',
      severity: ToastSeverity.Success,
      duration: 2000,
    })
  }

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
