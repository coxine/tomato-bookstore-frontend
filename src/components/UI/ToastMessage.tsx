import { CheckCircle, Error, Info, WarningAmber } from '@mui/icons-material'
import { Alert, Typography } from '@mui/joy'
import { useEffect, useState } from 'react'

import { ToastSeverity } from './ToastMessageUtils'
export interface ToastMessageProps {
  message: string
  title: string
  severity?: ToastSeverity
  duration?: number
  onClose: () => void
}

export default function ToastMessage({
  message,
  title,
  severity = ToastSeverity.Success,
  duration = 3000,
  onClose,
}: ToastMessageProps) {
  const [visible, setVisible] = useState(false)
  const StartIconList = [
    <CheckCircle key="success" />,
    <Info key="neutral" />,
    <WarningAmber key="warning" />,
    <Info key="primary" />,
    <Error key="danger" />,
  ]

  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setVisible(true)
    }, 10)

    const fadeOutTimer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        onClose()
      }, 500)
    }, duration + 10)

    return () => {
      clearTimeout(fadeInTimer)
      clearTimeout(fadeOutTimer)
    }
  }, [duration, onClose])

  return (
    <Alert
      variant="soft"
      color={severity}
      startDecorator={
        StartIconList[Object.values(ToastSeverity).indexOf(severity)]
      }
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        width: { xs: '60%', sm: '40%', md: '20%' },
        zIndex: 12000,
        alignItems: 'flex-start',
        transition: 'opacity 0.5s',
        opacity: visible ? 1 : 0,
        boxShadow: 'md',
      }}
      key={title}
    >
      <div>
        <Typography
          level="title-md"
          fontWeight="lg"
          color={severity}
          sx={{ textAlign: 'left' }}
        >
          {title}
        </Typography>
        <Typography level="body-sm" color={severity}>
          {message}
        </Typography>
      </div>
    </Alert>
  )
}
