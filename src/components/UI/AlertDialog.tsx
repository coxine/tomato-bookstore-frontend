import { Cancel, Warning } from '@mui/icons-material'
import Button from '@mui/joy/Button'
import DialogActions from '@mui/joy/DialogActions'
import DialogContent from '@mui/joy/DialogContent'
import DialogTitle from '@mui/joy/DialogTitle'
import Divider from '@mui/joy/Divider'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import * as React from 'react'

export interface AlertDialogModalProps {
  title: string
  description: string
  actions: React.ReactNode
  open: boolean
  onClose: () => void
}

export default function AlertDialogModal({
  title,
  description,
  actions,
  open,
  onClose,
}: AlertDialogModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <Warning />
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent>{description}</DialogContent>
        <DialogActions>
          {actions}
          <Button
            variant="soft"
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
