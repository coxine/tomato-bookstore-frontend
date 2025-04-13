import { Add, Remove } from '@mui/icons-material'
import { Box, IconButton, Input, Typography } from '@mui/joy'
import { useState, useEffect, FC } from 'react'

interface QuantitySelectorProps {
  initialValue?: number
  maxValue?: number
  minValue?: number
  onChange?: (value: number) => void
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const QuantitySelector: FC<QuantitySelectorProps> = ({
  initialValue = 1,
  maxValue,
  minValue = 1,
  onChange,
  size = 'md',
  disabled = false,
}) => {
  const [quantity, setQuantity] = useState<number>(initialValue)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setQuantity(initialValue)
  }, [initialValue])

  const handleQuantityChange = (newValue: number) => {
    // Enforce minimum value
    if (newValue < minValue) {
      setQuantity(minValue)
      setError('')
      onChange?.(minValue)
      return
    }

    // Warn but allow exceeding maximum value
    if (maxValue !== undefined && newValue > maxValue) {
      setQuantity(newValue)
      setError(`最多可选择${maxValue}个`)
      onChange?.(newValue)
      return
    }

    // Normal case
    setQuantity(newValue)
    setError('')
    onChange?.(newValue)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          variant="outlined"
          color="neutral"
          size={size}
          disabled={disabled || quantity <= minValue}
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          <Remove />
        </IconButton>

        <Input
          size={size}
          value={quantity}
          disabled={disabled}
          onChange={(e) => {
            const value = parseInt(e.target.value)
            if (!isNaN(value)) {
              handleQuantityChange(value)
            }
          }}
          slotProps={{
            input: {
              min: minValue,
              max: maxValue,
              type: 'number',
              sx: {
                width: size === 'sm' ? '50px' : size === 'lg' ? '70px' : '60px',
                textAlign: 'center',
                padding: '0 8px',
                // Hide spinner buttons
                '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                  '-webkit-appearance': 'none',
                  margin: 0,
                },
                '&[type=number]': {
                  '-moz-appearance': 'textfield',
                }
              }
            }
          }}
          sx={{ mx: 1 }}
        />

        <IconButton
          variant="outlined"
          color="neutral"
          size={size}
          disabled={disabled || (maxValue !== undefined && quantity >= maxValue)}
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <Add />
        </IconButton>
      </Box>

      {error && (
        <Typography level="body-xs" color="danger">
          {error}
        </Typography>
      )}
    </Box>
  )
}

export default QuantitySelector