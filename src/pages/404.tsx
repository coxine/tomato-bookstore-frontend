import { Box, Link, Button, Typography } from '@mui/joy'
import { Link as RouterLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100dvh',
        gap: 2,
        p: 2,
      }}
    >
      <Typography level="h1" sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
        404
      </Typography>
      <Typography level="body-lg">抱歉，您访问的页面不存在！</Typography>
      <Link component={RouterLink} to="/">
        <Button variant="solid">返回首页</Button>
      </Link>
    </Box>
  )
}
