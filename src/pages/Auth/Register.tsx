import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Link,
  Stack,
  Typography,
} from '@mui/joy'
import React, { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { userRegister } from '../../api/user'
import AuthLayout from '../../components/layouts/AuthLayout'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'
import { Profile } from '../../types/profile'
import { profileValidators } from '../../utils/validator/profileValidator'

type FormData = {
  username: string
  password: string
  confirmPassword: string
  name: string
  telephone: string
  email: string
  location: string
}

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    telephone: '',
    email: '',
    location: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // 对 Profile 对象中对应的字段执行校验
    if (field in profileValidators) {
      const result = profileValidators[field](value)
      setErrors((prev) => ({
        ...prev,
        [field]: result.valid ? '' : result.message,
      }))
    }

    // 另外单独校验密码与确认密码是否一致
    if (field === 'password' || field === 'confirmPassword') {
      const pwd = field === 'password' ? value : formData.password
      const confirmPwd =
        field === 'confirmPassword' ? value : formData.confirmPassword
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          pwd && confirmPwd && pwd !== confirmPwd ? '密码不一致' : '',
      }))
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // 如果存在错误，展示第一个错误信息
    const errorMessage = Object.values(errors).find((msg) => msg)
    if (errorMessage) {
      showToast({
        title: '注册失败',
        message: errorMessage,
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      return
    }

    const data: Profile = {
      username: formData.username,
      password: formData.password,
      name: formData.name,
      telephone: formData.telephone,
      email: formData.email,
      location: formData.location,
      role: 'USER',
    }

    showToast({
      title: '注册中',
      message: '请稍等...',
      severity: ToastSeverity.Primary,
      duration: 3000,
    })

    userRegister(data).then((res) => {
      if (res.data.code === '200') {
        showToast({
          title: '注册成功',
          message: `${data.username}，欢迎使用西红柿读书！`,
          severity: ToastSeverity.Success,
          duration: 3000,
        })
        navigate('/login')
      } else if (res.data.code === '400') {
        showToast({
          title: '注册失败',
          message: res.data.msg,
          severity: ToastSeverity.Danger,
          duration: 3000,
        })
      } else {
        showToast({
          title: '未知错误',
          message: '服务器出错！',
          severity: ToastSeverity.Warning,
          duration: 3000,
        })
      }
    })
  }

  return (
    <AuthLayout>
      <Stack sx={{ gap: 4, mb: 1 }}>
        <Stack sx={{ gap: 1 }}>
          <Typography component="h1" level="h3">
            注册
          </Typography>
          <Typography level="body-sm">
            已有账号？
            <Link
              component={RouterLink}
              to="/login"
              sx={{ fontWeight: 'lg', color: 'primary.500' }}
            >
              返回登录!
            </Link>
          </Typography>
        </Stack>
      </Stack>

      <Stack sx={{ gap: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <FormControl required>
                <FormLabel>用户名 *</FormLabel>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  color="neutral"
                  variant="soft"
                  autoComplete="username"
                />
                {errors.username && (
                  <FormHelperText sx={{ color: 'red' }}>
                    {errors.username}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl required>
                <FormLabel>姓名 *</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  color="neutral"
                  variant="soft"
                />
                {errors.name && (
                  <FormHelperText sx={{ color: 'red' }}>
                    {errors.name}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl required>
                <FormLabel>密码 *</FormLabel>
                <Input
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  color="neutral"
                  variant="soft"
                  type="password"
                  name="password"
                />
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl required>
                <FormLabel>确定密码 *</FormLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange('confirmPassword', e.target.value)
                  }
                  color="neutral"
                  variant="soft"
                />
                {errors.confirmPassword && (
                  <FormHelperText sx={{ color: 'red' }}>
                    {errors.confirmPassword}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <FormControl>
                <FormLabel>手机号</FormLabel>
                <Input
                  onChange={(e) => handleChange('telephone', e.target.value)}
                  color="neutral"
                  variant="soft"
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                />
                {errors.telephone && (
                  <FormHelperText sx={{ color: 'red' }}>
                    {errors.telephone}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <FormControl>
                <FormLabel>邮箱</FormLabel>
                <Input
                  onChange={(e) => handleChange('email', e.target.value)}
                  color="neutral"
                  variant="soft"
                  type="email"
                  name="email"
                  value={formData.email}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: 'red' }}>
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <FormControl>
                <FormLabel>地址</FormLabel>
                <Input
                  onChange={(e) => handleChange('location', e.target.value)}
                  color="neutral"
                  variant="soft"
                  name="location"
                  value={formData.location}
                />
                {errors.location && (
                  <FormHelperText sx={{ color: 'red' }}>
                    {errors.location}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Stack sx={{ gap: 4, mt: 2 }}>
            <Button type="submit" fullWidth>
              注册
            </Button>
          </Stack>
        </form>
      </Stack>
    </AuthLayout>
  )
}
