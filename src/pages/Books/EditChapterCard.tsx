import { Save } from '@mui/icons-material'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Select,
  Option
} from '@mui/joy'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import InfoCard from '../../components/UI/InfoCard'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Chapter } from '../../types/chapter'

interface EditChapterCardProps {
  productId: string
  initialChapterData: Chapter
}

export default function EditChapterCard({
  productId,
  initialChapterData,
}: EditChapterCardProps) {
  const navigate = useNavigate()
  const [chapterData, setChapterData] = React.useState<Chapter>(initialChapterData)
  const [errors, setErrors] = React.useState({
    name: '',
    content: ''
  })

  // 处理表单字段的通用变更
  const handleChange = (field: keyof Chapter, value: string) => {
    setChapterData(prev => ({
      ...prev,
      [field]: value
    }))

    // Basic validation
    if (field === 'name' && !value.trim()) {
      setErrors(prev => ({ ...prev, name: '章节名称不能为空' }))
    } else if (field === 'name') {
      setErrors(prev => ({ ...prev, name: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('Edited chapter data:', chapterData)

    // Validate form
    if (!chapterData.name.trim()) {
      setErrors(prev => ({ ...prev, name: '章节名称不能为空' }))
      showToast({
        title: '提交失败',
        message: '章节名称不能为空',
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      return
    }

    showToast({
      title: '正在提交',
      message: '请稍等...',
      severity: ToastSeverity.Primary,
      duration: 3000,
    })

    // Simulate successful update for now
    setTimeout(() => {
      showToast({
        title: '提交成功',
        message: '章节已更新！',
        severity: ToastSeverity.Success,
        duration: 3000,
      })
      navigate(`/books/${productId}`)
    }, 1000)
  }

  return (
    <InfoCard
      title="编辑章节信息"
      actions={
        <Button
          size="sm"
          variant="soft"
          type="submit"
          form="edit-chapter-form"
          startDecorator={<Save />}
        >
          保存
        </Button>
      }
    >
      <form id="edit-chapter-form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl error={!!errors.name}>
            <FormLabel required>章节名称</FormLabel>
            <Input
              value={chapterData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="请输入章节名称"
              size="sm"
            />
            {errors.name && (
              <FormControl error>{errors.name}</FormControl>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>状态</FormLabel>
            <Select
              value={chapterData.state}
              onChange={(_, value) => handleChange('state', value || '')}
              placeholder="选择章节状态"
              size="sm"
            >
              <Option value="FREE">免费</Option>
              <Option value="LOCKED">锁定</Option>
              <Option value="CHARGED">付费</Option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>内容</FormLabel>
            <Textarea
              minRows={5}
              value={chapterData.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="请输入章节内容"
              size="sm"
            />
          </FormControl>
        </Stack>
      </form>
    </InfoCard >
  )
}