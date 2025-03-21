import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import InfoIcon from '@mui/icons-material/Info'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Alert from '@mui/joy/Alert'
import Typography from '@mui/joy/Typography'
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
    <CheckCircleIcon key="success" />,
    <InfoIcon key="neutral" />,
    <WarningAmberIcon key="warning" />,
    <ErrorIcon key="danger" />,
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
        zIndex: (theme) => theme.zIndex.modal,
        alignItems: 'flex-start',
        transition: 'opacity 0.5s',
        opacity: visible ? 1 : 0,
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
