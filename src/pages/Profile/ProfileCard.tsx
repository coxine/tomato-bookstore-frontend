import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Avatar, Box, Button, Stack, Typography } from '@mui/joy'
import { useState } from 'react'

import InfoCard from '../../components/UI/InfoCard'
import { Profile } from '../../types/profile'

interface ProfileCardProps {
  profile: Profile
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const [showSensitive, setShowSensitive] = useState(false)

  return (
    <InfoCard
      title={`${profile.username} 的资料`}
      actions={
        <Button
          onClick={() => setShowSensitive((prev) => !prev)}
          variant="soft"
          color="primary"
          size="sm"
          startDecorator={showSensitive ? <VisibilityOff /> : <Visibility />}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          {showSensitive ? '隐藏个人信息' : '显示个人信息'}
        </Button>
      }
    >
      {' '}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        sx={{ display: 'flex', my: 1 }}
      >
        <Stack
          direction="column"
          spacing={1}
          alignItems={{ xs: 'center', md: 'flex-start' }}
        >
          <Avatar src={profile.avatar} alt={profile.name} size="lg" />
        </Stack>
        <Box display="grid" gridTemplateColumns="auto 1fr" gap={2}>
          <Typography fontWeight="bold">姓名</Typography>
          <Typography sx={{ wordBreak: 'break-all' }}>
            {profile.name}
          </Typography>

          <Typography fontWeight="bold">邮箱</Typography>
          <Typography sx={{ wordBreak: 'break-all' }}>
            {profile.email}
          </Typography>

          <Typography fontWeight="bold">手机</Typography>
          <Typography sx={{ wordBreak: 'break-all' }}>
            {showSensitive ? profile.telephone : '***'}
          </Typography>

          <Typography fontWeight="bold">地址</Typography>
          <Typography sx={{ wordBreak: 'break-all' }}>
            {showSensitive ? profile.location : '***'}
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction="column"
        spacing={2}
        sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
      ></Stack>
    </InfoCard>
  )
}
