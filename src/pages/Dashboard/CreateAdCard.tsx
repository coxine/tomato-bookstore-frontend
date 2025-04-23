import { Save, UploadRounded } from '@mui/icons-material'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  styled,
  Textarea,
} from '@mui/joy'
import { useState } from 'react'

import InfoCard from '../../components/UI/InfoCard'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Advertisement } from '../../types/advertisement'

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

export default function CreateAdCard() {
  const [errors, setErrors] = useState<Record<string, string>>({
    title: '',
    content: '',
    imgUrl: '',
    productId: '',
  })

  const [adData, setAdData] = useState<Advertisement>({
    id: '',
    title: '',
    content: '',
    imgUrl: '',
    productId: '',
  })

  const handleChange = (field: keyof Advertisement, value: string) => {
    setAdData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Simple validation
    if (field === 'title' && !value.trim()) {
      setErrors((prev) => ({ ...prev, [field]: '标题不能为空' }))
    } else if (field === 'productId' && !value.trim()) {
      setErrors((prev) => ({ ...prev, [field]: '商品ID不能为空' }))
    } else {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Image upload triggered', event)
  }

  const handleSubmit = () => {
    showToast({
      title: '正在提交',
      message: '请稍等...',
      severity: ToastSeverity.Primary,
      duration: 3000,
    })

    const newErrors: Record<string, string> = {}
    if (!adData.title.trim()) {
      newErrors.title = '标题不能为空'
    }
    if (!adData.productId.trim()) {
      newErrors.productId = '商品ID不能为空'
    }

    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some((error) => error)
    if (hasErrors) {
      const firstErrorMessage = Object.values(newErrors).find((msg) => msg)
      showToast({
        title: '提交失败',
        message: firstErrorMessage || '表单验证失败',
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      return
    }

    // For now, just console.log the data
    console.log('Advertisement data submitted:', adData)

    showToast({
      title: '创建成功',
      message: `广告 ${adData.title} 已经成功创建！`,
      severity: ToastSeverity.Success,
      duration: 3000,
    })

    setAdData({
      id: '',
      title: '',
      content: '',
      imgUrl: '',
      productId: '',
    })
  }

  const renderInput = (
    label: string,
    field: keyof Advertisement,
    placeholder: string = '',
    type: string = 'text'
  ) => (
    <Stack spacing={1}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          size="sm"
          type={type}
          value={adData[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder || label}
        />
        {errors[field] && (
          <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '4px' }}>
            {errors[field]}
          </div>
        )}
      </FormControl>
    </Stack>
  )

  return (
    <InfoCard
      title="创建广告"
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
              onChange={handleImageUpload}
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
        {renderInput('标题', 'title', '广告标题')}
        {renderInput('商品ID', 'productId', '关联的商品ID')}

        <Stack spacing={1}>
          <FormLabel>内容</FormLabel>
          <FormControl>
            <Textarea
              minRows={3}
              value={adData.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="广告内容描述"
              size="sm"
            />
          </FormControl>
        </Stack>
      </Stack>
    </InfoCard>
  )
}
