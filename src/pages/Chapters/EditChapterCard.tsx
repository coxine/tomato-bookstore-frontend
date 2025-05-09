import { Save } from '@mui/icons-material'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Select,
  Option,
} from '@mui/joy'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { chapterUpdate } from '../../api/chapter'
import InfoCard from '../../components/UI/InfoCard'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Chapter } from '../../types/chapter'

interface EditChapterCardProps {
  initialChapterData: Chapter
}

export default function EditChapterCard({
  initialChapterData,
}: EditChapterCardProps) {
  const navigate = useNavigate()
  const [chapterData, setChapterData] =
    React.useState<Chapter>(initialChapterData)

  // 处理表单字段的通用变更
  const handleChange = (field: keyof Chapter, value: string) => {
    setChapterData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!initialChapterData.id) {
      showToast({
        title: '意外错误',
        message: '请刷新重试',
        severity: ToastSeverity.Warning,
        duration: 3000,
      })
      return
    }

    console.log('Edited chapter data:', chapterData)

    showToast({
      title: '正在提交',
      message: '请稍等...',
      severity: ToastSeverity.Primary,
      duration: 3000,
    })

    chapterUpdate(initialChapterData.id, chapterData).then((res) => {
      if (res.data.code === '200') {
        showToast({
          title: '提交成功',
          message: res.data.data,
          severity: ToastSeverity.Success,
          duration: 3000,
        })
      } else if (res.data.code === '400') {
        showToast({
          title: '提交失败',
          message: res.data.data,
          severity: ToastSeverity.Danger,
          duration: 3000,
        })
      } else {
        showToast({
          title: '未知错误',
          message: '服务器出错！提交章节数据失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })

    // Simulate successful update for now
    setTimeout(() => {
      showToast({
        title: '提交成功',
        message: '章节已更新！',
        severity: ToastSeverity.Success,
        duration: 3000,
      })
      navigate(`/books/${initialChapterData.productId}`)
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
          <FormControl required>
            <FormLabel required>章节名称</FormLabel>
            <Input
              value={chapterData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="请输入章节名称"
              size="sm"
            />
          </FormControl>

          <FormControl>
            <FormLabel>状态</FormLabel>
            <Select
              value={chapterData.status}
              onChange={(_, value) => handleChange('status', value || '')}
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
    </InfoCard>
  )
}
