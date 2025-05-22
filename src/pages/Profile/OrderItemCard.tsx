import { Box, Typography, AspectRatio } from '@mui/joy'

import { OrderDetail, OrderItem } from '../../types/order'

export default function OrderItemCard({
  order,
  item,
}: {
  order: OrderDetail
  item: OrderItem
}) {
  return (
    <Box
      key={`${order.orderId}-${item.productId}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxHeight: '30%',
      }}
    >
      <AspectRatio
        ratio="2/3"
        sx={{
          width: '100%',
          mb: 1,
        }}
      >
        <img
          src={item.cover}
          alt={item.productTitle}
          style={{ objectFit: 'cover' }}
        />
      </AspectRatio>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Typography
          level="body-md"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            fontWeight: 700,
            overflow: 'hidden',
            mb: 1,
          }}
        >
          {item.productTitle}
        </Typography>
        {item.fullyPurchased ? (
          <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
            ¥{item.price.toFixed(2)} × {item.quantity}
          </Typography>
        ) : (
          <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
            分章购买 {item.chapters.length} 章
          </Typography>
        )}
      </Box>
    </Box>
  )
}
