import { ShoppingCartCheckout } from '@mui/icons-material'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  useTheme,
  Button,
} from '@mui/joy'
import { useMediaQuery } from '@mui/material'
import { useState, useEffect } from 'react'

import { orderGetUsers, orderToPay } from '../../api/order'
import Loading from '../../components/UI/Loading'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { OrderDetail } from '../../types/order'
import {
  datetimeFormatter,
  orderStatusFormatter,
  paymentMethodFormatter,
  priceFormatter,
} from '../../utils/formatter'

import OrderItemCard from './OrderItemCard'

export default function OrderHistory() {
  const [orders, setOrders] = useState<OrderDetail[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [expandedOrders, setExpandedOrders] = useState<number[]>([])

  const isExpanded = (orderId: number) => expandedOrders.includes(orderId)
  const toggleExpanded = (orderId: number) => {
    setExpandedOrders((prev) =>
      isExpanded(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    )
  }
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'))
  const isTablet = useMediaQuery(theme.breakpoints.only('sm'))
  const getMaxDisplayItems = () => {
    if (isMobile) {
      return 2
    } else if (isTablet) {
      return 6
    } else {
      return 8
    }
  }
  const maxDisplayItems = getMaxDisplayItems()

  const fetchOrders = () => {
    orderGetUsers().then((res) => {
      if (res.data.code === '200') {
        setOrders(res.data.data.reverse())
      } else {
        showToast({
          title: '未知错误',
          message: '服务器出错！获取用户订单数据失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }

  const pay = (orderId: number) => {
    orderToPay(orderId).then((res) => {
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
  }

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      fetchOrders()
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <Box>
      {isLoading || !orders ? (
        <Loading />
      ) : orders.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Typography>暂无订单</Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {orders.map((order) => {
            const isOpen = isExpanded(order.orderId)
            const showOverlay =
              order.orderItems.length > maxDisplayItems && !isOpen
            return (
              <Card key={order.orderId} variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography level="h4" sx={{ fontWeight: 700 }}>
                      # {order.orderId}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      {order.status === 'SUCCESS' && (
                        <Chip color="primary">
                          {paymentMethodFormatter(order.paymentMethod)}支付
                        </Chip>
                      )}
                      {order.status === 'PENDING' && (
                        <Button
                          onClick={() => pay(order.orderId)}
                          color="warning"
                          startDecorator={<ShoppingCartCheckout />}
                          variant="soft"
                          size="sm"
                        >
                          继续支付
                        </Button>
                      )}
                      <Chip
                        color={orderStatusFormatter(order.status).color}
                        variant="solid"
                      >
                        {orderStatusFormatter(order.status).label}
                      </Chip>
                    </Box>
                  </Box>

                  <Box sx={{ position: 'relative', mt: 2 }}>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                          xs: 'repeat(2, 1fr)',
                          sm: 'repeat(6, 1fr)',
                          md: 'repeat(8, 1fr)',
                        },
                        gap: 2,
                      }}
                    >
                      {(isOpen
                        ? order.orderItems
                        : order.orderItems.slice(0, maxDisplayItems)
                      ).map((item, idx) => (
                        <OrderItemCard key={idx} order={order} item={item} />
                      ))}
                    </Box>

                    {showOverlay && (
                      <Box
                        onClick={() => toggleExpanded(order.orderId)}
                        sx={{
                          width: '100%',
                          height: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          cursor: 'pointer',
                          pt: 2,
                        }}
                      >
                        <Typography
                          level="body-sm"
                          sx={{ fontWeight: 500, color: 'primary.600' }}
                        >
                          展开全部商品（共 {order.orderItems.length} 件）
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {isOpen && order.orderItems.length > maxDisplayItems && (
                    <Box
                      onClick={() => toggleExpanded(order.orderId)}
                      sx={{
                        mt: 1,
                        textAlign: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Typography
                        level="body-sm"
                        sx={{ fontWeight: 500, color: 'primary.600' }}
                      >
                        收起商品
                      </Typography>
                    </Box>
                  )}

                  {order.status === 'SUCCESS' && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                        pt: 1,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Typography
                        level="body-sm"
                        sx={{ color: 'text.secondary' }}
                      >
                        下单于: {datetimeFormatter(order.createTime)}
                      </Typography>
                      <Typography
                        level="body-md"
                        sx={{ color: 'danger.500', fontWeight: 700 }}
                      >
                        {priceFormatter(order.totalAmount)}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </Stack>
      )}
    </Box>
  )
}
