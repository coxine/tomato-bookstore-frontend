import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@mui/joy'
import * as React from 'react'

import { userUpdate } from '../../api/user'
import InfoCard from '../../components/UI/InfoCard'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Profile } from '../../types/profile'
import { checkUserInfoLen } from '../../utils/check'

interface EditProfileCardProps {
  profile: Profile
}

export default function EditProfileCard({ profile }: EditProfileCardProps) {
  const telephoneRex = /^1\d{10}$/
  const [errors, setErrors] = React.useState<Record<string, string>>({
    username: '',
    password: '',
    name: '',
    telephone: '',
    email: '',
    location: '',
  })
  const [formData, setFormData] = React.useState({
    ...profile,
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    let errorMessage = ''

    Object.keys(errors).forEach((key) => {
      if (key in errors && errors[key]) {
        errorMessage = errors[key] // 目前默认会展示最后一个错误
      }
    })

    if (!errorMessage) {
      userUpdate(formData).then((res) => {
        if (res.data.code == '200') {
          showToast({
            title: '修改成功',
            message: '数据更新完成!',
            severity: ToastSeverity.Success,
            duration: 3000,
          })
        } else {
          showToast({
            title: '未知消息码',
            message: '服务器出错，获取用户数据失败，请重新登录尝试!',
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      })
    } else {
      showToast({
        title: '提交失败',
        message: errorMessage,
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
    }
  }

  const handleAvatarUpdate = () => {
    console.log('Update avatar')
  }

  return (
    <InfoCard
      title="编辑资料"
      actions={
        <>
          <Button size="sm" variant="outlined" onClick={handleAvatarUpdate}>
            更改头像
          </Button>
          <Button size="sm" variant="solid" onClick={handleSubmit}>
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
              startDecorator={<EmailRoundedIcon />}
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
