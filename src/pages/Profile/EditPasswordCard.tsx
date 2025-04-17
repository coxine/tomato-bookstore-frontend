import { SaveRounded } from '@mui/icons-material'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@mui/joy'
import React from 'react'

import InfoCard from '../../components/UI/InfoCard'
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils'

export default function EditPasswordCard() {
  const [formData, setFormData] = React.useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = React.useState<Record<string, string>>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === 'confirmPassword' && value !== formData.newPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: '密码不一致',
      }))
    } else {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = () => {
    if (Object.values(errors).some((msg) => msg)) {
      showToast({
        title: '提交失败',
        message: '请修正表单中的错误',
        severity: ToastSeverity.Danger,
        duration: 3000,
      })
      return
    }
    showToast({
      title: '正在提交',
      message: '请稍等...',
      severity: ToastSeverity.Primary,
      duration: 3000,
    })
    showToast({
      title: '提交成功',
      message: '密码已更新',
      severity: ToastSeverity.Success,
      duration: 3000,
    })
  }

  const renderInput = (
    label: string,
    field: keyof typeof formData,
    placeholder?: string,
    type: string = 'password'
  ) => (
    <Stack spacing={1}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          size="sm"
          type={type}
          value={formData[field] || ''}
          placeholder={placeholder}
          onChange={(e) => handleChange(field, e.target.value)}
        />
        {errors[field] && (
          <FormHelperText sx={{ color: 'red' }}>{errors[field]}</FormHelperText>
        )}
      </FormControl>
    </Stack>
  )

  return (
    <InfoCard
      title="更改密码"
      actions={
        <Button
          size="sm"
          variant="soft"
          startDecorator={<SaveRounded />}
          onClick={handleSubmit}
        >
          保存
        </Button>
      }
    >
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        {renderInput('当前密码', 'currentPassword', '请输入当前密码')}
        {renderInput('新密码', 'newPassword', '请输入新密码')}
        {renderInput('确认新密码', 'confirmPassword', '请再次输入新密码')}
      </Stack>
    </InfoCard>
  )
}
