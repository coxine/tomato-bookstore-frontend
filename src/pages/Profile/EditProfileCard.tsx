import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import { Button, FormControl, FormLabel, Input, Stack } from '@mui/joy'
import { useState } from 'react'

import InfoCard from '../../components/UI/InfoCard'
import { Profile } from '../../types/profile'

interface EditProfileCardProps {
  profile: Profile
}

export default function EditProfileCard({ profile }: EditProfileCardProps) {
  const [formData, setFormData] = useState({
    ...profile,
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    console.log(formData)
  }

  return (
    <InfoCard
      title="编辑资料"
      actions={
        <Button size="sm" variant="solid" onClick={handleSubmit}>
          保存
        </Button>
      }
    >
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <Stack spacing={1}>
          <FormLabel>用户名</FormLabel>
          <FormControl>
            <Input
              size="sm"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
            />
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormLabel>姓名</FormLabel>
          <FormControl>
            <Input
              size="sm"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormLabel>头像 URL</FormLabel>
          <FormControl>
            <Input
              size="sm"
              value={formData.avatar}
              onChange={(e) => handleChange('avatar', e.target.value)}
            />
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormLabel>手机号</FormLabel>
          <FormControl>
            <Input
              size="sm"
              value={formData.telephone}
              onChange={(e) => handleChange('telephone', e.target.value)}
              placeholder="1xxxxxxxxxx"
            />
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
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="email"
            />
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormLabel>位置</FormLabel>
          <FormControl>
            <Input
              size="sm"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </FormControl>
        </Stack>
      </Stack>
    </InfoCard>
  )
}
