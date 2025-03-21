import { createRoot } from 'react-dom/client'

import ToastMessage from './ToastMessage'

export enum ToastSeverity {
  Success = 'success',
  Neutral = 'neutral',
  Warning = 'warning',
  Danger = 'danger',
}

export function showToast({
  title,
  message,
  severity = ToastSeverity.Success,
  duration = 3000,
}: {
  title: string
  message: string
  severity?: ToastSeverity
  duration?: number
}) {
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
