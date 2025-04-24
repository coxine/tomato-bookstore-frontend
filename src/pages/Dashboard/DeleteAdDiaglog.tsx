import { Delete } from '@mui/icons-material'
import { Button, Typography } from '@mui/joy'

import { adDelete } from '../../api/ad'
import AlertDialogModal from '../../components/UI/AlertDialog'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'

interface DeleteAdDialogProps {
  adId: string
  onClose: () => void
  afterDelete: () => void
}

export function DeleteAdDialog({
  adId,
  onClose,
  afterDelete,
}: DeleteAdDialogProps) {
  const handleDelete = () => {
    adDelete(adId).then((res) => {
      if (res.data.code === '200') {
        showToast({
          title: '删除广告',
          message: '广告删除成功！',
          severity: ToastSeverity.Success,
          duration: 3000,
        })
        afterDelete()
      } else if (res.data.code === '400') {
        showToast({
          title: '删除失败',
          message: res.data.msg,
          severity: ToastSeverity.Danger,
          duration: 3000,
        })
      } else {
        showToast({
          title: '未知消息码',
          message: '服务器出错！删除商品失败，请重新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
    onClose()
  }

  return (
    <AlertDialogModal
      title="删除广告"
      open={true}
      onClose={onClose}
      icon={<Delete />}
      actions={
        <Button
          color="danger"
          variant="solid"
          onClick={handleDelete}
          startDecorator={<Delete />}
        >
          删除
        </Button>
      }
    >
      <Typography>您确定要删除此广告吗？</Typography>
    </AlertDialogModal>
  )
}

export default DeleteAdDialog
