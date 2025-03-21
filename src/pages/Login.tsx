import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import Link from '@mui/joy/Link'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import * as React from 'react'
import './Login.css'

import ColorSchemeToggle from '../components/UI/ColorSchemeToggle'
import { ToastSeverity, showToast } from '../components/UI/ToastMessageUtils'

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  password: HTMLInputElement
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

const handleSubmit =
  (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault()
    const formElements = event.currentTarget.elements
    const data = {
      username: formElements.username.value,
      password: formElements.password.value,
    }
    console.log(data)
    showToast({
      title: '登录成功',
      message: `${data.username}，欢迎使用西红柿读书!`,
      severity: ToastSeverity.Success,
      duration: 3000,
    })
  }


export default function Login() {
  return (
    <>
      <Box
        className="sign-in-container"
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
          backgroundColor: 'rgba(255 255 255 / 0.6)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.6)',
          },
        })}
      >
        <Box
          className="sign-in-form"
          sx={{ minHeight: { xs: '40vh', md: '80vh' }, px: 2, }}
        >
          <Box
            component="header"
            sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton variant="soft" color="primary" size="sm">
                <MenuBookOutlinedIcon />
              </IconButton>
              <Typography level="title-lg">西红柿读书</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            className='sign-in-form-content'
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              gap: 2,
              width: 400,
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack sx={{ gap: 4, mb: 2 }}>
              <Stack sx={{ gap: 1 }}>
                <Typography component="h1" level="h3">
                  登录
                </Typography>
                <Typography level="body-sm">
                  新用户?{' '}
                  <Link href="#replace-with-a-link" level="title-sm">
                    注册!
                  </Link>
                </Typography>
              </Stack>
            </Stack>

            <Stack sx={{ gap: 4, mt: 2 }}>
              <form
                onSubmit={handleSubmit}
              >
                <FormControl required>
                  <FormLabel>用户名</FormLabel>
                  <Input type="text" name="username" autoComplete="username" />
                </FormControl>
                <FormControl required>
                  <FormLabel>密码</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>
                <Stack sx={{ gap: 4, mt: 2 }}>
                  <Button type="submit" fullWidth>
                    登录
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" sx={{ textAlign: 'center' }}>
              © 软件攻嗔小组 {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        className="background"
        sx={(theme) => ({
          backgroundImage: 'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
          },
        })}
      />
    </>
  )
}