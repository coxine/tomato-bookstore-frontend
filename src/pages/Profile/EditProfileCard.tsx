import {
  BadgeRounded,
  EmailRounded,
  LocalPhoneRounded,
  LocationOnRounded,
  PersonRounded,
  UploadRounded,
  SaveRounded,
} from '@mui/icons-material'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  styled,
} from '@mui/joy'
import * as React from 'react'

import { imageUpload } from '../../api/picture'
import { userUpdate } from '../../api/user'
import InfoCard from '../../components/UI/InfoCard'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Profile } from '../../types/profile'
import { checkUserInfoLen } from '../../utils/check'

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
  const telephoneRex = /^1\d{10}$/
  const [errors, setErrors] = React.useState<Record<string, string>>({
    username: '',
    password: '',
    name: '',
    telephone: '',
    email: '',
    location: '',
  })
  const [avatar, setAvatar] = React.useState<File | null>()
  const [formData, setFormData] = React.useState({
    ...profile,
  })

  const handleChange = React.useCallback(
    (field: string, value: string): Promise<Profile> => {
      return new Promise((resolve) => {
        setFormData((prev) => {
          const newState = { ...prev, [field]: value }
          resolve(newState) // 解析最新状态
          return newState
        })
      })
    },
    []
  )

  const userInfoSubmit = (infoData: Profile) => {
    userUpdate(infoData).then((res) => {
      if (res.data.code == '200') {
        infoChange()
        showToast({
          title: '提交成功',
          message: '数据更新完成!',
          severity: ToastSeverity.Success,
          duration: 3000,
        })
      } else {
        showToast({
          title: '未知消息码',
          message: '错误！提交用户信息失败，请重新尝试提交!',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }

  const handleSubmit = () => {
    let errorMessage = ''

    Object.keys(errors).forEach((key) => {
      if (key in errors && errors[key]) {
        errorMessage = errors[key] // 目前默认会展示最后一个错误
      }
    })

    if (!errorMessage) {
      if (!avatar) {
        console.log('no avatar')
        userInfoSubmit(formData)
      } else {
        console.log('has avatar')
        const avatarFile = new FormData()
        avatarFile.append('file', avatar)
        imageUpload(avatarFile).then(async (res) => {
          if (res.data.code == '200') {
            handleChange('avatar', res.data.data).then((data) => {
              userInfoSubmit(data)
            })
          } else if (res.data.code == '400') {
            showToast({
              title: '提交失败',
              message: res.data.msg,
              severity: ToastSeverity.Warning,
              duration: 3000,
            })
          } else {
            showToast({
              title: '未知消息码',
              message: '错误！提交用户头像失败，请重新尝试提交!',
              severity: ToastSeverity.Warning,
              duration: 3000,
            })
          }
        })
      }
    } else {
      showToast({
        title: '提交失败',
        message: errorMessage,
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
    }
  }

  const handleAvatarUpdate = (event: {
    target: { files: FileList | null }
  }) => {
    if (!event.target.files) {
      showToast({
        title: '图片上传失败',
        message: '图片上传错误！请重新尝试',
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      return
    }
    const file = event.target.files[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      showToast({
        title: '图片上传失败',
        message: '请选择有效的图片文件',
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      return
    }

    setAvatar(file)
    showToast({
      title: '图片选择成功',
      message: '记得点击提交!',
      severity: ToastSeverity.Success,
      duration: 3000,
    })
  }

  return (
    <InfoCard
      title="编辑资料"
      actions={
        <>
          <Button
            size="sm"
            variant="outlined"
            component="label"
            startDecorator={<UploadRounded />}
          >
            更改头像
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleAvatarUpdate}
            />
          </Button>
          <Button
            size="sm"
            variant="solid"
            startDecorator={<SaveRounded />}
            onClick={handleSubmit}
          >
            保存
          </Button>
        </>
      }
    >
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <Stack spacing={1}>
          <FormLabel>用户名</FormLabel>
          <FormControl>
            <Input
              size="sm"
              startDecorator={<PersonRounded />}
              value={formData.username}
              disabled
              onChange={(e) => {
                handleChange('username', e.target.value)
                if (checkUserInfoLen('username', e.target.value)) {
                  setErrors((prev) => ({ ...prev, username: '用户名过长' }))
                } else {
                  setErrors((prev) => ({ ...prev, username: '' }))
                }
              }}
            />
            {errors.username && (
              <FormHelperText sx={{ color: 'red' }}>
                {errors.username}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormLabel>姓名</FormLabel>
          <FormControl>
            <Input
              size="sm"
              startDecorator={<BadgeRounded />}
              value={formData.name}
              onChange={(e) => {
                handleChange('name', e.target.value)
                if (checkUserInfoLen('name', e.target.value)) {
                  setErrors((prev) => ({ ...prev, name: '姓名过长' }))
                } else {
                  setErrors((prev) => ({ ...prev, name: '' }))
                }
              }}
            />
            {errors.name && (
              <FormHelperText sx={{ color: 'red' }}>
                {errors.name}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
        {/* <Stack spacing={1}>
          <FormLabel>头像 URL</FormLabel>
          <FormControl>
            <Input
              size="sm"
              value={formData.avatar}
              onChange={(e) => handleChange('avatar', e.target.value)}
            />
          </FormControl>
        </Stack> */}
        <Stack spacing={1}>
          <FormLabel>手机号</FormLabel>
          <FormControl>
            <Input
              size="sm"
              startDecorator={<LocalPhoneRounded />}
              value={formData.telephone}
              placeholder="1xxxxxxxxxx"
              onChange={(e) => {
                handleChange('telephone', e.target.value)
                if (checkUserInfoLen('telephone', e.target.value)) {
                  setErrors((prev) => ({
                    ...prev,
                    telephone: '手机号过长',
                  }))
                } else if (
                  !e.target.value ||
                  telephoneRex.test(e.target.value)
                ) {
                  setErrors((prev) => ({ ...prev, telephone: '' }))
                } else {
                  setErrors((prev) => ({
                    ...prev,
                    telephone: '手机号不合法',
                  }))
                }
              }}
            />
            {errors.telephone && (
              <FormHelperText sx={{ color: 'red' }}>
                {errors.telephone}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              size="sm"
              type="email"
              startDecorator={<EmailRounded />}
              value={formData.email}
              placeholder="email"
              onChange={(e) => {
                handleChange('email', e.target.value)
                if (checkUserInfoLen('email', e.target.value)) {
                  setErrors((prev) => ({ ...prev, email: '邮箱过长' }))
                } else {
                  setErrors((prev) => ({ ...prev, email: '' }))
                }
              }}
            />
            {errors.email && (
              <FormHelperText sx={{ color: 'red' }}>
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormLabel>位置</FormLabel>
          <FormControl>
            <Input
              size="sm"
              startDecorator={<LocationOnRounded />}
              value={formData.location}
              onChange={(e) => {
                handleChange('location', e.target.value)
                if (checkUserInfoLen('location', e.target.value)) {
                  setErrors((prev) => ({ ...prev, location: '地址过长' }))
                } else {
                  setErrors((prev) => ({ ...prev, location: '' }))
                }
              }}
            />
            {errors.location && (
              <FormHelperText sx={{ color: 'red' }}>
                {errors.location}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
      </Stack>
    </InfoCard>
  )
}
