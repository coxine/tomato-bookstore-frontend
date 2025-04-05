import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormHelperText from '@mui/joy/FormHelperText'
import FormLabel from '@mui/joy/FormLabel'
import Grid from '@mui/joy/Grid'
import Input from '@mui/joy/Input'
import Link from '@mui/joy/Link'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { userRegister } from '../api/user'
import AuthLayout from '../components/layouts/AuthLayout'
import { ToastSeverity, showToast } from '../components/UI/ToastMessageUtils'
import { checkUserInfoLen } from '../utils/check'

// 默认注册的时候不传入头像，存储为NULL，并在头像使用的时候使用默认头像
interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  password: HTMLInputElement
  confirmPassword: HTMLInputElement
  name: HTMLInputElement
  telephone: HTMLInputElement
  email: HTMLInputElement
  location: HTMLInputElement
}

interface RegisterFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export default function Register() {
  const telephoneRex = /^1\d{10}$/
  const navigate = useNavigate()
  const [errors, setErrors] = React.useState<Record<string, string>>({
    username: '',
    password: '',
    name: '',
    telephone: '',
    email: '',
    location: '',
  })

  const handleSubmit = (event: React.FormEvent<RegisterFormElement>) => {
    event.preventDefault()
    showToast({
      title: '注册中',
      message: '请稍等...',
      severity: ToastSeverity.Primary,
      duration: 3000,
    })
    const formElements = event.currentTarget.elements
    const data = {
      username: formElements.username.value,
      password: formElements.password.value,
      name: formElements.name.value,
      telephone: formElements.telephone.value,
      email: formElements.email.value,
      location: formElements.location.value,
      role: 'USER' as 'ADMIN' | 'USER',
    }

    let errorMessage = ''

    Object.keys(errors).forEach((key) => {
      if (key in errors && errors[key]) {
        errorMessage = errors[key] // 目前默认会展示最后一个错误
      }
    })

    if (!errorMessage) {
      userRegister(data).then((res) => {
        if (res.data.code === '200') {
          showToast({
            title: '注册成功',
            message: `${data.username}，欢迎使用西红柿读书!`,
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
            title: '未知消息码',
            message: '服务器出错!',
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      })
    } else {
      showToast({
        title: '注册失败',
        message: errorMessage,
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
    }
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
                  color="neutral"
                  variant="soft"
                  type="text"
                  name="username"
                  autoComplete="username"
                  onChange={(e) => {
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
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl required>
                <FormLabel>姓名 *</FormLabel>
                <Input
                  color="neutral"
                  variant="soft"
                  type="text"
                  name="name"
                  onChange={(e) => {
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
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl required>
                <FormLabel>密码 *</FormLabel>
                <Input
                  color="neutral"
                  variant="soft"
                  type="password"
                  name="password"
                  onChange={(e) => {
                    const password = e.target.value
                    const confirmPassword = (
                      document.querySelector(
                        '[name="confirmPassword"]'
                      ) as HTMLInputElement
                    )?.value
                    // 实时验证
                    if (checkUserInfoLen('password', password)) {
                      setErrors((prev) => ({ ...prev, passsword: '密码过长' }))
                    } else if (password !== confirmPassword) {
                      setErrors((prev) => ({ ...prev, password: '密码不一致' }))
                    } else {
                      setErrors((prev) => ({ ...prev, password: '' }))
                    }
                  }}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'red' }}>
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl required>
                <FormLabel>确定密码 *</FormLabel>
                <Input
                  color="neutral"
                  variant="soft"
                  type="password"
                  name="confirmPassword"
                  onChange={(e) => {
                    const confirmPassword = e.target.value
                    const password = (
                      document.querySelector(
                        '[name="password"]'
                      ) as HTMLInputElement
                    )?.value
                    // 实时验证
                    if (checkUserInfoLen('password', password)) {
                      setErrors((prev) => ({ ...prev, passsword: '密码过长' }))
                    } else if (password !== confirmPassword) {
                      setErrors((prev) => ({ ...prev, password: '密码不一致' }))
                    } else {
                      setErrors((prev) => ({ ...prev, password: '' }))
                    }
                  }}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'red' }}>
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <FormControl>
                <FormLabel>手机号</FormLabel>
                <Input
                  color="neutral"
                  variant="soft"
                  type="tel"
                  name="telephone"
                  onChange={(e) => {
                    const telephone = e.target.value
                    // 实时验证
                    if (checkUserInfoLen('telephone', telephone)) {
                      setErrors((prev) => ({
                        ...prev,
                        telephone: '手机号过长',
                      }))
                    } else if (!telephone || telephoneRex.test(telephone)) {
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
            </Grid>

            <Grid xs={12}>
              <FormControl>
                <FormLabel>邮箱</FormLabel>
                <Input
                  color="neutral"
                  variant="soft"
                  type="email"
                  name="email"
                  onChange={(e) => {
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
            </Grid>

            <Grid xs={12}>
              <FormControl>
                <FormLabel>地址</FormLabel>
                <Input
                  color="neutral"
                  variant="soft"
                  type="text"
                  name="location"
                  onChange={(e) => {
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
