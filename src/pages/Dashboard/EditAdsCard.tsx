import {
  Save,
  UploadRounded,
} from '@mui/icons-material'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  styled,
  Textarea,
} from '@mui/joy'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import InfoCard from '../../components/UI/InfoCard'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Advertisement } from '../../types/advertisement'

interface EditAdsCardProps {
  adId: string
  initialAdsData: Advertisement
}

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`

export default function EditAdsCard({
  adId,
  initialAdsData,
}: EditAdsCardProps) {
  const navigate = useNavigate()
  const [adsData, setAdsData] = React.useState<Advertisement>(initialAdsData)
  const [image, setImage] = React.useState<File | null>(null)
  const [errors, setErrors] = React.useState<Record<string, string>>({
    title: '',
    content: '',
    productId: '',
  })

  const handleChange = (field: keyof Advertisement, value: string) => {
    setAdsData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (field === 'title' && !value.trim()) {
      setErrors((prev) => ({ ...prev, [field]: '标题不能为空' }))
    } else if (field === 'productId' && !value.trim()) {
      setErrors((prev) => ({ ...prev, [field]: '商品ID不能为空' }))
    } else {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleImageUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(null)
    console.log('handleImageUpdate', event)
  }

  const handleSubmit = () => {
    showToast({
      title: '正在提交',
      message: '请稍等...',
      severity: ToastSeverity.Primary,
      duration: 3000,
    })

    const firstErrorMessage = Object.values(errors).find((msg) => msg)
    if (firstErrorMessage) {
      showToast({
        title: '提交失败',
        message: firstErrorMessage,
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      return
    }
    console.log('广告数据:', adsData)
    if (image) {
      console.log('选择的图片:', image.name, `(${image.type}, ${Math.round(image.size / 1024)}KB)`)
    }

    showToast({
      title: '提交成功',
      message: '数据已输出到控制台！',
      severity: ToastSeverity.Success,
      duration: 3000,
    })

    setTimeout(() => {
      navigate('/dashboard')
    }, 1500)
  }

  const renderInput = (
    label: string,
    field: keyof Advertisement,
    type: string = 'text'
  ) => (
    <Stack spacing={1}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          size="sm"
          type={type}
          value={adsData[field] ? adsData[field].toString() : ''}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={label}
        />
      </FormControl>
    </Stack>
  )
  console.log('AdID:', adId)
  return (
    <InfoCard
      title="编辑广告信息"
      actions={
        <>
          <Button
            size="sm"
            color="primary"
            variant="plain"
            component="label"
            startDecorator={<UploadRounded />}
          >
            上传广告图片
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleImageUpdate}
            />
          </Button>
          <Button
            size="sm"
            variant="soft"
            onClick={handleSubmit}
            startDecorator={<Save />}
          >
            保存
          </Button>
        </>
      }
    >
      <Stack spacing={3}>
        {renderInput('标题', 'title')}
        {renderInput('关联商品ID', 'productId')}
        <Stack spacing={1}>
          <FormLabel>广告内容</FormLabel>
          <FormControl>
            <Textarea
              minRows={3}
              value={adsData.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="请输入广告内容描述"
              size="sm"
            />
          </FormControl>
        </Stack>
      </Stack>
    </InfoCard>
  )
}