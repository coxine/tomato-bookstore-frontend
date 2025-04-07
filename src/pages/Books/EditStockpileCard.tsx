import SaveIcon from '@mui/icons-material/Save'
import { Button, FormControl, FormLabel, Input, Stack } from '@mui/joy'
import { useState } from 'react'

import InfoCard from '../../components/UI/InfoCard'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Stockpile } from '../../types/stockpile'

interface EditStockpileCardProps {
  initialStockpile: Stockpile
}

export default function EditStockpileCard({
  initialStockpile,
}: EditStockpileCardProps) {
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
    console.log('提交的库存数据：', stockpile)
    // Here you can call an API to update the stockpile data if needed.
  }

  return (
    <InfoCard
      title="编辑库存信息"
      actions={
        <Button
          size="sm"
          variant="soft"
          onClick={handleSubmit}
          startDecorator={<SaveIcon />}
        >
          保存
        </Button>
      }
    >
      <Stack spacing={3}>
        <Stack spacing={1}>
          <FormLabel>剩余库存</FormLabel>
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
              onChange={(e) => handleChange('frozen', e.target.value)}
              placeholder="冻结库存"
            />
          </FormControl>
        </Stack>
      </Stack>
    </InfoCard>
  )
}
