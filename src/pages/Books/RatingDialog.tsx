import { Star } from '@mui/icons-material'
import { Box, Typography, Button } from '@mui/joy'
import { Rating, ThemeProvider } from '@mui/material'
import { useState } from 'react'

import { rateSubmit } from '../../api/rate'
import AlertDialogModal from '../../components/UI/AlertDialog'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { muiTheme } from '../../theme/muiTheme'

export default function RatingDialog({
  productId,
  onChange,
  onClose,
}: {
  productId: number
  onChange: (rate: number) => void
  onClose: () => void
}) {
  const [userRating, setUserRating] = useState<number | null>(null)

  const handleRatingSubmit = (ratingValue: number) => {
    rateSubmit(productId, (ratingValue || 0) * 2).then((res) => {
      console.log(res)
      if (res.data.code === '200') {
        setUserRating(ratingValue)
        onChange(res.data.data)
        showToast({
          title: '提交成功',
          message: '评分已上传！',
          severity: ToastSeverity.Success,
          duration: 3000,
        })
      } else if (res.data.code === '400') {
        showToast({
          title: '提交失败',
          message: res.data.msg,
          severity: ToastSeverity.Danger,
          duration: 3000,
        })
      } else {
        showToast({
          title: '未知错误',
          message: '服务器出错！获取商品库存失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
    onClose()
  }

  return (
    <AlertDialogModal
      title="评分"
      open={true}
      onClose={onClose}
      icon={<Star />}
      actions={
        <Button
          color="warning"
          variant="solid"
          startDecorator={<Star />}
          onClick={() => {
            if (userRating !== null) {
              handleRatingSubmit(userRating)
            }
          }}
          disabled={userRating === null}
        >
          提交评分
        </Button>
      }
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          minWidth: '300px',
        }}
      >
        <Typography level="body-md" sx={{ fontSize: '1.2rem' }}>
          请为本书评分：
        </Typography>
        <ThemeProvider theme={muiTheme}>
          <Rating
            name="book-rating"
            value={userRating}
            onChange={(_event, newValue) => {
              setUserRating(newValue)
            }}
            precision={0.5}
            size="large"
          />
        </ThemeProvider>
      </Box>
    </AlertDialogModal>
  )
}
