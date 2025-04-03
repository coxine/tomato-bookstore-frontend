import ArrowForward from '@mui/icons-material/ArrowForward'
import Button from '@mui/joy/Button'
import Link from '@mui/joy/Link'
import Typography from '@mui/joy/Typography'
import { Link as RouterLink } from 'react-router-dom'

export default function HomePageWelcome() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'

  return (
    <>
      <Typography
        level="h1"
        sx={{
          fontWeight: 'xl',
          fontSize: 'clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)',
        }}
      >
        开卷有益。
      </Typography>
      <Typography
        textColor="text.secondary"
        sx={{ fontSize: 'lg', lineHeight: 'lg' }}
      >
        在西红柿读书网，你可以看书、买书，从而在软攻 II 的大作业中取得好成绩：）
      </Typography>

      {!isLoggedIn && (
        <>
          <Link
            component={RouterLink}
            to="/login"
            sx={{ display: 'block', width: '100%' }}
          >
            <Button
              size="lg"
              endDecorator={<ArrowForward />}
              sx={{ width: '100%' }}
            >
              登录
            </Button>
          </Link>
          <Link
            component={RouterLink}
            to="/register"
            sx={{ display: 'block', width: '100%', color: 'danger.500' }}
          >
            <Button
              size="lg"
              endDecorator={<ArrowForward />}
              variant="soft"
              sx={{ width: '100%' }}
            >
              注册
            </Button>
          </Link>
        </>
      )}

      {isLoggedIn && (<>
        <Link
          component={RouterLink}
          to="/books"
          sx={{ display: 'block', width: '100%' }}
        >
          <Button
            size="lg"
            endDecorator={<ArrowForward />}
            sx={{ width: '100%' }}
          >
            购买书籍
          </Button>
        </Link>
        <Link
          component={RouterLink}
          to="/profile"
          sx={{ display: 'block', width: '100%' }}
        >
          <Button
            size="lg"
            endDecorator={<ArrowForward />}
            variant="soft"
            sx={{ width: '100%' }}
          >
            进入个人中心
          </Button>
        </Link>
      </>
      )}
    </>
  )
}
