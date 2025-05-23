import {
  BadgeRounded,
  EmailRounded,
  LocalPhoneRounded,
  LocationOnRounded,
  UploadRounded,
  SaveRounded,
} from '@mui/icons-material'
import { Button, Stack, styled, Typography } from '@mui/joy'
import React, { FormEvent } from 'react'

import { imageAvatarUpload } from '../../api/picture'
import { userUpdate } from '../../api/user'
import InfoCard from '../../components/UI/InfoCard'
import { RenderInput } from '../../components/UI/RenderInput'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Profile } from '../../types/profile'
import { profileValidators } from '../../utils/validator/profileValidator'

interface EditProfileCardProps {
  profile: Profile
  infoChange: () => void
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

export default function EditProfileCard({
  profile,
  infoChange,
}: EditProfileCardProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({
    username: '',
    name: '',
    telephone: '',
    email: '',
    location: '',
  })
  const [avatar, setAvatar] = React.useState<File | null>(null)
  const [formData, setFormData] = React.useState({
    ...profile,
  })

  const handleChange = (field: keyof Profile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (profileValidators[field]) {
      const { valid, message } = profileValidators[field](value)
      setErrors((prev) => ({ ...prev, [field]: valid ? '' : message || '' }))
    }
  }

  const userInfoSubmit = (infoData: Profile) => {
    userUpdate(infoData).then((res) => {
      if (res.data.code === '200') {
        infoChange()
        showToast({
          title: '提交成功',
          message: '数据更新完成！',
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
          title: '未知错误',
          message: '服务器出错！提交用户信息失败，请重新尝试提交！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
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
    if (firstErrorMessage !== undefined) {
      showToast({
        title: '提交失败',
        message: firstErrorMessage,
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      return
    }
    if (!avatar) {
      userInfoSubmit(formData)
    } else {
      const avatarFile = new FormData()
      avatarFile.append('file', avatar)
      imageAvatarUpload(avatarFile).then((res) => {
        if (res.data.code === '200') {
          handleChange('avatar', res.data.data)
          userInfoSubmit({ ...formData, avatar: res.data.data })
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
            message: '服务器出错！提交用户头像失败，请重新尝试提交！',
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      })
    }
  }

  const handleAvatarUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    setAvatar(file)
    showToast({
      title: '图片选择成功',
      message: '请点击保存按钮以提交！',
      severity: ToastSeverity.Success,
      duration: 3000,
    })
  }

  function renderInput({
    label,
    field,
    required,
    placeholder,
    type,
    startIcon,
  }: {
    label: string
    field: keyof Profile
    required?: boolean
    placeholder?: string
    type?: string
    startIcon: React.ReactNode
  }) {
    return (
      <RenderInput<Profile>
        label={label}
        field={field}
        data={formData}
        required={required}
        placeholder={placeholder}
        type={type}
        startIcon={startIcon}
        onChange={handleChange}
      />
    )
  }

  return (
    <InfoCard
      title="编辑资料"
      actions={
        <>
          {avatar && (
            <Typography level="body-sm" color="success">
              ✅ 选择图片成功，请保存
            </Typography>
          )}
          <Button
            size="sm"
            color="primary"
            variant="plain"
            component="label"
            startDecorator={<UploadRounded />}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            添加新头像
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleAvatarUpdate}
            />
          </Button>
          <Button
            size="sm"
            variant="soft"
            startDecorator={<SaveRounded />}
            type="submit"
            form="edit-profile-form"
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            保存
          </Button>
        </>
      }
    >
      <form id="edit-profile-form" onSubmit={(e) => handleSubmit(e)}>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          {renderInput({
            label: '姓名',
            field: 'name',
            startIcon: <BadgeRounded />,
          })}
          {renderInput({
            label: '手机号',
            field: 'telephone',
            startIcon: <LocalPhoneRounded />,
            placeholder: '1xxxxxxxxxx',
          })}
          {renderInput({
            label: 'Email',
            field: 'email',
            startIcon: <EmailRounded />,
            type: 'email',
            placeholder: 'email',
          })}
          {renderInput({
            label: '位置',
            field: 'location',
            startIcon: <LocationOnRounded />,
          })}
        </Stack>
      </form>
    </InfoCard>
  )
}
