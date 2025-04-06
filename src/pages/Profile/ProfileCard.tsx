import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/joy'
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
        <IconButton onClick={() => setShowSensitive((prev) => !prev)}>
          {showSensitive ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      }
    >
      {' '}
      <Stack direction="row" spacing={3} sx={{ display: 'flex', my: 1 }}>
        <Stack direction="column" spacing={1}>
          <Avatar src={profile.avatar} alt={profile.name} size="lg" />
        </Stack>
        <Box display="grid" gridTemplateColumns="auto 1fr" gap={2}>
          <Typography fontWeight="bold">姓名:</Typography>
          <Typography>{profile.name}</Typography>

          <Typography fontWeight="bold">邮箱:</Typography>
          <Typography>{profile.email}</Typography>

          <Typography fontWeight="bold">手机号:</Typography>
          <Typography>{showSensitive ? profile.telephone : '***'}</Typography>

          <Typography fontWeight="bold">地址:</Typography>
          <Typography>{showSensitive ? profile.location : '***'}</Typography>
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
