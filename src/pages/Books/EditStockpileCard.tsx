import { Save } from '@mui/icons-material'
import { Button, FormControl, FormLabel, Input, Stack } from '@mui/joy'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { productUpdateStockpile } from '../../api/products'
import InfoCard from '../../components/UI/InfoCard'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Stockpile } from '../../types/stockpile'

interface EditStockpileCardProps {
  productId: number
  initialStockpile: Stockpile
}

export default function EditStockpileCard({
  productId,
  initialStockpile,
}: EditStockpileCardProps) {
  const navigate = useNavigate()
  const [stockpile, setStockpile] = useState<Stockpile>(initialStockpile)

  const handleChange = (field: keyof Stockpile, value: string) => {
    setStockpile((prev) => ({
      ...prev,
      [field]: parseInt(value) || 0,
    }))
  }

  const handleSubmit = () => {
    showToast({
      title: '正在提交',
      message: '请稍等...',
      severity: ToastSeverity.Primary,
      duration: 3000,
    })
    productUpdateStockpile(productId, stockpile.amount).then((res) => {
      if (res.data.code === '200') {
        showToast({
          title: '提交成功',
          message: '数据更新完成！',
          severity: ToastSeverity.Success,
          duration: 3000,
        })
        navigate(`/books/${productId}`)
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
          message: '服务器出错！提交用户信息失败，请重新尝试提交！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }

  return (
    <InfoCard
      title="编辑库存信息"
      actions={
        <Button
          size="sm"
          variant="soft"
          onClick={handleSubmit}
          startDecorator={<Save />}
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          保存
        </Button>
      }
    >
      <Stack spacing={3}>
        <Stack spacing={1}>
          <FormLabel required>剩余库存</FormLabel>
          <FormControl>
            <Input
              size="sm"
              type="number"
              value={stockpile.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              placeholder="剩余库存"
            />
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormLabel>冻结库存</FormLabel>
          <FormControl>
            <Input
              size="sm"
              type="number"
              value={stockpile.frozen}
              disabled
              onChange={(e) => handleChange('frozen', e.target.value)}
              placeholder="冻结库存"
            />
          </FormControl>
        </Stack>
      </Stack>
    </InfoCard>
  )
}
