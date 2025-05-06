import { Add, Delete, Remove } from '@mui/icons-material'
import {
  Box,
  Card,
  Checkbox,
  IconButton,
  Input,
  Stack,
  Typography,
} from '@mui/joy'
import React, { useState } from 'react'

import { CartItem as CartItemType } from '../../types/cart'

interface CartItemProps {
  item: CartItemType
  onQuantityChange: (cartItemId: number, quantity: number) => void
  onRemove: (cartItemId: number) => void
  selected: boolean
  onSelectChange: (cartItemId: number, selected: boolean) => void
}

const CartItemCard: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
  selected,
  onSelectChange,
}) => {
  const [quantity, setQuantity] = useState<number>(item.quantity)

  const handleQuantityChange = (newValue: number) => {
    if (newValue < 1) return
    setQuantity(newValue)
    onQuantityChange(item.cartItemId, newValue)
  }

  // Quantity control component to avoid repetition
  const QuantityControl = () => (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        width: { xs: '100%', sm: 'auto' },
        justifyContent: { xs: 'space-between', sm: 'flex-start' },
      }}
    >
      <Stack direction="row" alignItems="center">
        <IconButton
          variant="outlined"
          color="neutral"
          size="sm"
          disabled={quantity <= 1}
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          <Remove />
        </IconButton>

        <Input
          size="sm"
          value={quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value)
            if (!isNaN(value) && value > 0) {
              handleQuantityChange(value)
            }
          }}
          slotProps={{
            input: {
              min: 1,
              type: 'number',
              sx: {
                width: '60px',
                textAlign: 'center',
                MozAppearance: 'textfield',
                '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
              },
            },
          }}
          sx={{ mx: 1 }}
        />

        <IconButton
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <Add />
        </IconButton>
      </Stack>

      <IconButton
        variant="soft"
        color="danger"
        onClick={() => onRemove(item.cartItemId)}
      >
        <Delete />
      </IconButton>
    </Stack>
  )

  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        mb: 1,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="center"
        sx={{ p: 2 }}
      >
        <Checkbox
          checked={selected}
          onChange={(e) => onSelectChange(item.cartItemId, e.target.checked)}
        />

        <Box sx={{ width: { xs: '100%', sm: '120px' }, textAlign: 'center' }}>
          <Box
            component="img"
            src={item.cover}
            alt={item.title}
            sx={{
              maxWidth: '100%',
              maxHeight: '120px',
              objectFit: 'cover',
              borderRadius: 1,
            }}
          />
        </Box>

        <Stack spacing={1} sx={{ flexGrow: 1, width: '100%' }}>
          <Typography level="title-md">{item.title}</Typography>
          <Typography level="body-sm" noWrap>
            {item.description}
          </Typography>

          <Box sx={{ display: { xs: 'block', sm: 'none' }, width: '100%' }}>
            <Typography
              level="title-md"
              color="danger"
              fontWeight="lg"
              sx={{ mb: 1 }}
            >
              ¥{item.price.toFixed(2)}
            </Typography>
            <QuantityControl />
          </Box>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <Typography level="title-md" color="danger" fontWeight="lg">
              ¥{item.price.toFixed(2)}
            </Typography>

            <QuantityControl />
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
}

export default CartItemCard
