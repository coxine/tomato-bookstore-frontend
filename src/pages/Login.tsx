import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Link from '@mui/joy/Link'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'

import { userGetRole, userLogin } from '../api/user'
import AuthLayout from '../components/layouts/AuthLayout'
import { ToastSeverity, showToast } from '../components/UI/ToastMessageUtils'

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  password: HTMLInputElement
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export default function Login() {
  const navigate = useNavigate()
  const handleSubmit = (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault()
    showToast({
      title: '登录中',
      message: '请稍等...',
      severity: ToastSeverity.Primary,
      duration: 3000,
    })
    const formElements = event.currentTarget.elements
    const data = {
      username: formElements.username.value,
      password: formElements.password.value,
    }

    userLogin(data).then((res) => {
      if (res.data.code === '200') {
        sessionStorage.setItem('token', res.data.data)
        userGetRole(formElements.username.value).then((res) => {
          if (res.data.code === '200') {
            sessionStorage.setItem('username', formElements.username.value)
            sessionStorage.setItem('isLoggedIn', 'true')
            sessionStorage.setItem('role', res.data.data)
            showToast({
              title: '登录成功',
              message: `${data.username}，欢迎使用西红柿读书!`,
              severity: ToastSeverity.Success,
              duration: 3000,
            })
            navigate('/profile')
          } else {
            sessionStorage.removeItem('token')
            showToast({
              title: '未知消息码',
              message: `服务器出错! 请重新尝试登录`,
              severity: ToastSeverity.Warning,
              duration: 3000,
            })
          }
        })
      } else if (res.data.code === '400') {
        showToast({
          title: '登录失败',
          message: res.data.msg,
          severity: ToastSeverity.Danger,
          duration: 3000,
        })
      } else {
        showToast({
          title: '未知消息码',
          message: `服务器出错!`,
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
            登录
          </Typography>
          <Typography level="body-sm">
            新用户？
            <Link
              component={RouterLink}
              to="/register"
              sx={{ fontWeight: 'lg', color: 'primary.500' }}
            >
              注册
            </Link>
          </Typography>
        </Stack>
      </Stack>

      <Stack sx={{ gap: 4 }}>
        <form onSubmit={handleSubmit}>
          <FormControl required>
            <FormLabel>用户名</FormLabel>
            <Input
              color="neutral"
              variant="soft"
              type="text"
              name="username"
              autoComplete="username"
            />
          </FormControl>
          <FormControl required>
            <FormLabel>密码</FormLabel>
            <Input
              color="neutral"
              variant="soft"
              type="password"
              name="password"
            />
          </FormControl>
          <Stack sx={{ gap: 4, mt: 2 }}>
            <Button type="submit" fullWidth>
              登录
            </Button>
          </Stack>
        </form>
      </Stack>
    </AuthLayout>
  )
}
