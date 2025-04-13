import { createRoot } from 'react-dom/client'

import AlertDialogModal from './AlertDialog'

export default function showAlertDialog(
  title: string,
  children: React.ReactNode,
  actions: (close: () => void) => React.ReactNode // 改为接收一个函数
) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)

  const handleClose = () => {
    root.unmount()
    container.remove()
  }

  root.render(
    <AlertDialogModal
      title={title}
      actions={actions(handleClose)} // 将 close 回调传入 actions
      open={true}
      onClose={handleClose}
    >
      {children}
    </AlertDialogModal>
  )
}
