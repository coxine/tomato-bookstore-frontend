import { Star } from '@mui/icons-material'
import { Box, Typography, Button } from '@mui/joy'
import { Rating, ThemeProvider } from '@mui/material'
import { useState } from 'react'

import AlertDialogModal from '../../components/UI/AlertDialog'
import { muiTheme } from '../../theme/muiTheme'

export default function RatingDialog({ onClose }: { onClose: () => void }) {
  const [userRating, setUserRating] = useState<number | null>(null)
  const handleRatingSubmit = (ratingValue: number) => {
    setUserRating(ratingValue)
    console.log('User rating:', userRating) // TODO 对接评分接口
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
            size="large"
          />
        </ThemeProvider>
      </Box>
    </AlertDialogModal>
  )
}
