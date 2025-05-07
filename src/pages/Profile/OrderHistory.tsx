import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  useTheme,
} from '@mui/joy'
import { useMediaQuery } from '@mui/material'
import { useState, useEffect } from 'react'

import Loading from '../../components/UI/Loading'
import { OrderDetail } from '../../types/order'
import {
  datetimeFormatter,
  orderStatusFormatter,
  paymentMethodFormatter,
  priceFormatter,
} from '../../utils/formatter'

import OrderItemCard from './OrderItemCard'

const orderList: OrderDetail[] = [
  // TODO 获取用户订单数据
  {
    orderId: 50,
    totalAmount: 298.5,
    paymentMethod: 'ALIPAY',
    status: 'SUCCESS',
    createTime: '2025-05-05T07:34:32.462+00:00',
    name: 'test',
    address: '123',
    phone: '18723414746',
    orderItems: [
      {
        productId: 15,
        productTitle: '深入理解Java虚拟机',
        quantity: 3,
        price: 99.5,
        cover:
          'https://tomato-nju.oss-cn-nanjing.aliyuncs.com/017ac261-c14b-4adf-994d-c583afee7048.png',
      },
    ],
  },
]

export default function OrderHistory() {
  const [orders, setOrders] = useState<OrderDetail[]>(orderList)
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

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setOrders(orderList)
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <Box>
      {isLoading ? (
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
