import { Cancel, Warning } from '@mui/icons-material'
import {
  Button,
  Divider,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/joy'
import * as React from 'react'

export interface AlertDialogModalProps {
  title: string
  actions: React.ReactNode
  open: boolean
  children?: React.ReactNode
  icon?: React.ReactNode
  onClose: () => void
}

export default function AlertDialogModal({
  title,
  actions,
  open,
  children,
  icon = <Warning />,
  onClose,
}: AlertDialogModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          {icon}
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {actions}
          <Button
            variant="outlined"
            color="neutral"
            onClick={onClose}
            startDecorator={<Cancel />}
          >
            取消
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  )
}
