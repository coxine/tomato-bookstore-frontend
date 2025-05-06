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
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import MainLayout from '../../components/layouts/MainLayout'
import InfoCard from '../../components/UI/InfoCard'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Chapter, ChapterState } from '../../types/chapter'

export default function ChapterEdit() {
  const { productId, chapterId } = useParams()
  const navigate = useNavigate()

  const [chapterData, setChapterData] = React.useState<Chapter>({
    id: Number(chapterId) || 0,
    name: '',
    content: '',
    state: 'FREE' as ChapterState,
    productId: Number(productId) || 0,
  })

  const [errors, setErrors] = React.useState({
    name: '',
    content: '',
  })

  // Fetch chapter data when component mounts
  React.useEffect(() => {
    if (productId && chapterId) {
      // This would be replaced with actual API call to fetch chapter data
      // For now, using placeholder data
      console.log('Fetching chapter data for', productId, chapterId)

      // Simulating data fetch - in real implementation, replace with API call
      // Example: fetchChapter(chapterId).then(data => setChapterData(data))
    }
  }, [productId, chapterId])

  const handleChange = (field: keyof Chapter, value: string) => {
    setChapterData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Basic validation
    if (field === 'name' && !value.trim()) {
      setErrors((prev) => ({ ...prev, name: '章节名称不能为空' }))
    } else if (field === 'name') {
      setErrors((prev) => ({ ...prev, name: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate form
    if (!chapterData.name.trim()) {
      setErrors((prev) => ({ ...prev, name: '章节名称不能为空' }))
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

    // In a real implementation, this would be an API call
    // Example: updateChapter(chapterData).then(...)
    console.log('Submitting chapter data:', chapterData)

    // Simulate successful update
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
    <MainLayout
      title="编辑章节"
      breadcrumbsItems={[
        { label: '购买书籍', link: '/books' },
        { label: '书籍详情', link: `/books/${productId}` },
      ]}
    >
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
              {errors.name && <FormControl error>{errors.name}</FormControl>}
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
      </InfoCard>
    </MainLayout>
  )
}
