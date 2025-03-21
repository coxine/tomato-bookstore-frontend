import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Alert from '@mui/joy/Alert'
import Typography from '@mui/joy/Typography'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InfoIcon from '@mui/icons-material/Info'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ErrorIcon from '@mui/icons-material/Error'

export enum ToastSeverity {
  Success = 'success',
  Neutral = 'neutral',
  Warning = 'warning',
  Danger = 'danger',
}

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

export function showToast({
  title,
  message,
  severity = ToastSeverity.Success,
  duration = 3000,
}: Omit<ToastMessageProps, 'onClose'>) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)

  const handleClose = () => {
    root.unmount()
    container.remove()
  }

  root.render(
    <ToastMessage
      title={title}
      message={message}
      severity={severity}
      duration={duration}
      onClose={handleClose}
    />
  )
}
