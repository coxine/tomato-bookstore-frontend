import { Save, UploadRounded } from '@mui/icons-material'
import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  styled,
  Textarea,
  Typography,
} from '@mui/joy'
import { FormEvent, useState } from 'react'

import { adCreate } from '../../api/ad'
import { imageAdImageUploadWithoutCreate } from '../../api/picture'
import InfoCard from '../../components/UI/InfoCard'
import { RenderInput } from '../../components/UI/RenderInput'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Advertisement } from '../../types/advertisement'
import { AdValidators } from '../../utils/validator/adValidator'

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
  const [image, setImage] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({
    title: '',
    content: '',
    imgUrl: '',
    productId: '',
  })

  const [adData, setAdData] = useState<Advertisement>({
    // id: '',
    title: '',
    content: '',
    imgUrl: '',
    productId: 0,
  })

  const handleChange = (field: keyof Advertisement, value: string) => {
    setAdData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (AdValidators[field]) {
      const { valid, message } = AdValidators[field](value)
      setErrors((prev) => ({ ...prev, [field]: valid ? '' : message || '' }))
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    adCreate(infoData).then((res) => {
      if (res.data.code === '200') {
        showToast({
          title: '创建成功',
          message: `广告 ${adData.title} 已经成功创建！`,
          severity: ToastSeverity.Success,
          duration: 3000,
        })
      } else if (res.data.code === '400') {
        showToast({
          title: '创建失败',
          message: res.data.msg,
          severity: ToastSeverity.Danger,
          duration: 3000,
        })
      } else {
        showToast({
          title: '未知错误',
          message: '服务器出错！创建广告失败，请刷新尝试！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })

    setAdData({
      // id: '',
      title: '',
      content: '',
      imgUrl: '',
      productId: 0,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 防止form的submit事件自动刷新页面
    showToast({
      title: '正在提交',
      message: '请稍等...',
      severity: ToastSeverity.Primary,
      duration: 3000,
    })

    const firstErrorMessage = Object.values(errors).find((msg) => msg)

    if (firstErrorMessage !== undefined) {
      showToast({
        title: '提交失败',
        message: firstErrorMessage,
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      return
    }

    if (!image) {
      adInfoSubmit(adData)
    } else {
      const imageFile = new FormData()
      imageFile.append('file', image)
      imageAdImageUploadWithoutCreate(imageFile).then((res) => {
        if (res.data.code === '200') {
          handleChange('imgUrl', res.data.data)
          adInfoSubmit({ ...adData, imgUrl: res.data.data })
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
        data={adData}
        required={required}
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
      />
    )
  }

  return (
    <InfoCard
      title="创建广告"
      actions={
        <>
          {image && (
            <Typography
              level="body-sm"
              color="success"
              sx={{
                width: { xs: '100%', sm: 'auto' },
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              ✅ 选择图片成功，请保存
            </Typography>
          )}
          <Button
            size="sm"
            color="primary"
            variant="plain"
            component="label"
            startDecorator={<UploadRounded />}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              flexGrow: { xs: 1, sm: 0 },
            }}
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
            type="submit"
            form="create-ad-form"
            startDecorator={<Save />}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              flexGrow: { xs: 1, sm: 0 },
            }}
          >
            保存
          </Button>
        </>
      }
    >
      <form id="create-ad-form" onSubmit={(e) => handleSubmit(e)}>
        <Stack spacing={3}>
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
            type: 'number',
            placeholder: '关联的商品ID',
          })}

          <Stack spacing={1}>
            <FormLabel>内容</FormLabel>
            <FormControl required>
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
      </form>
    </InfoCard>
  )
}
