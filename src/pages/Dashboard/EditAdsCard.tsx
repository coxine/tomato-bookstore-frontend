import { Save, UploadRounded } from '@mui/icons-material'
import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  styled,
  Textarea,
} from '@mui/joy'
import React, { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { adUpdate } from '../../api/ad'
import { imageAdImageUpload } from '../../api/picture'
import InfoCard from '../../components/UI/InfoCard'
import { RenderInput } from '../../components/UI/RenderInput'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Advertisement } from '../../types/advertisement'
import { AdValidators } from '../../utils/validator/adValidator'

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

export default function EditAdsCard({ initialAdsData }: EditAdsCardProps) {
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

    if (AdValidators[field]) {
      const { valid, message } = AdValidators[field](value)
      setErrors((prev) => ({ ...prev, [field]: valid ? '' : message || '' }))
    }
  }

  const handleImageUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      showToast({
        title: '图片上传失败',
        message: '图片上传错误！请重新尝试',
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      return
    }
    if (!file.type.startsWith('image/')) {
      showToast({
        title: '图片上传失败',
        message: '请选择有效的图片文件！',
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      return
    }
    setImage(file)
    showToast({
      title: '图片选择成功',
      message: '请点击保存按钮以提交！',
      severity: ToastSeverity.Success,
      duration: 3000,
    })
  }

  const adInfoSubmit = (infoData: Advertisement) => {
    adUpdate(infoData).then((res) => {
      if (res.data.code === '200') {
        showToast({
          title: '提交成功',
          message: '广告信息已更新！',
          severity: ToastSeverity.Success,
          duration: 3000,
        })
      } else if (res.data.code === '400') {
        showToast({
          title: '提交失败',
          message: res.data.msg,
          severity: ToastSeverity.Danger,
          duration: 3000,
        })
      } else {
        showToast({
          title: '未知消息码',
          message: '服务器出错！获取商品数据失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })

    setTimeout(() => {
      navigate('/dashboard')
    }, 1500)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
    if (!image) {
      adInfoSubmit(adsData)
    } else {
      const imageFile = new FormData()
      imageFile.append('file', image)
      imageAdImageUpload(adsData.id, imageFile).then((res) => {
        if (res.data.code === '200') {
          handleChange('imgUrl', res.data.data)
          adInfoSubmit({ ...adsData, imgUrl: res.data.data })
        } else if (res.data.code === '400') {
          showToast({
            title: '提交失败',
            message: res.data.msg,
            severity: ToastSeverity.Danger,
            duration: 3000,
          })
        } else {
          showToast({
            title: '未知消息码',
            message: '服务器出错！提交书籍封面失败，请重新尝试提交！',
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      })
    }
  }

  function renderInput({
    label,
    field,
    required,
    placeholder,
    type,
  }: {
    label: string
    field: keyof Advertisement
    required?: boolean
    placeholder?: string
    type?: string
  }) {
    return (
      <RenderInput<Advertisement>
        label={label}
        field={field}
        data={adsData}
        required={required}
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
      />
    )
  }

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
            type="submit"
            startDecorator={<Save />}
          >
            保存
          </Button>
        </>
      }
    >
      <Stack spacing={3}>
        <form id="edit-ad-form" onSubmit={(e) => handleSubmit(e)}>
          {renderInput({
            label: '标题',
            field: 'title',
            required: true,
            placeholder: '广告标题',
          })}
          {renderInput({
            label: '商品ID',
            field: 'productId',
            required: true,
            placeholder: '关联的商品ID',
          })}
          <Stack spacing={1}>
            <FormLabel>广告内容</FormLabel>
            <FormControl required>
              <Textarea
                minRows={3}
                value={adsData.content || ''}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="请输入广告内容描述"
                size="sm"
              />
            </FormControl>
          </Stack>
        </form>
      </Stack>
    </InfoCard>
  )
}
