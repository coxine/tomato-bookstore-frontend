import { AddShoppingCart, ShoppingCartCheckout } from '@mui/icons-material'
import { Box, Typography, Button } from '@mui/joy'
import { useState } from 'react'

import { cartAddProduct } from '../../api/cart'
import AlertDialogModal from '../../components/UI/AlertDialog'
import QuantitySelector from '../../components/UI/QuantitySelector'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Book } from '../../types/book'
import { Stockpile } from '../../types/stockpile'

export default function CartDialog({
  mode,
  bookDetails,
  stockpile,
  onClose,
}: {
  mode: 'add' | 'buy'
  bookDetails: Book
  stockpile?: Stockpile
  onClose: () => void
}) {
  const [dialogQuantity, setDialogQuantity] = useState<number>(1)

  return (
    <AlertDialogModal
      title={mode === 'add' ? '加入购物车' : '立即购买'}
      open={true}
      onClose={onClose}
      icon={mode === 'add' ? <AddShoppingCart /> : <ShoppingCartCheckout />}
      actions={
        <Button
          color={mode === 'add' ? 'warning' : 'danger'}
          variant="solid"
          onClick={() => {
            if (mode === 'add') {
              // 加入购物车api
              cartAddProduct(bookDetails.id || 0, dialogQuantity).then(
                (res) => {
                  if (res.data.code === '200') {
                    showToast({
                      title: '加入购物车成功',
                      message: `您已成功将 ${dialogQuantity} 本《${bookDetails.title}》加入购物车！`,
                      severity: ToastSeverity.Success,
                      duration: 3000,
                    })
                  } else if (res.data.code === '400') {
                    showToast({
                      title: '加入购物车失败',
                      message: res.data.msg,
                      severity: ToastSeverity.Danger,
                      duration: 3000,
                    })
                  } else {
                    showToast({
                      title: '未知错误',
                      message: `服务器出错！请稍后再试！`,
                      severity: ToastSeverity.Warning,
                      duration: 3000,
                    })
                  }
                }
              )
            }
            // else {
            //   // TODO: 立即购买api
            //   showToast({
            //     title: '购买成功',
            //     message: `您已成功购买了${dialogQuantity}本《${bookDetails.title}》！`,
            //     severity: ToastSeverity.Success,
            //     duration: 3000,
            //   })
            // }
            onClose()
          }}
          startDecorator={
            mode === 'add' ? <AddShoppingCart /> : <ShoppingCartCheckout />
          }
          disabled={dialogQuantity > (stockpile?.amount || 0)}
        >
          {mode === 'add' ? '加入购物车' : '立即购买'}
        </Button>
      }
    >
      <Box sx={{ display: 'flex', gap: 2, minWidth: '300px' }}>
        <Box
          component="img"
          src={bookDetails.cover}
          alt={bookDetails.title}
          sx={{
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            borderRadius: 2,
          }}
        />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography level="title-lg">{bookDetails.title}</Typography>

            <Typography
              level="body-md"
              sx={{ color: 'danger.500', fontSize: '1.3rem' }}
            >
              ¥{' '}
              <span style={{ fontSize: '1.7rem', fontWeight: '600' }}>
                {bookDetails.price?.toFixed(2) ?? '0.00'}
              </span>
              <span
                style={{
                  fontSize: '0.8rem',
                  color: 'grey',
                  marginLeft: '8px',
                  fontWeight: '400',
                }}
              >
                {!stockpile ? '库存加载中...' : `剩余 ${stockpile.amount} 本`}
              </span>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2 }}>
            <Typography level="body-sm">数量：</Typography>
            <QuantitySelector
              initialValue={1}
              maxValue={stockpile?.amount}
              onChange={(value) => {
                setDialogQuantity(value)
              }}
              size="sm"
            />
          </Box>
        </Box>
      </Box>
    </AlertDialogModal>
  )
}
