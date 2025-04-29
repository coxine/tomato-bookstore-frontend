import { SaveRounded } from '@mui/icons-material'
import { Button, Stack } from '@mui/joy'
import React, { FormEvent } from 'react'

import { userUpdatePassword } from '../../api/user'
import InfoCard from '../../components/UI/InfoCard'
import { RenderInput } from '../../components/UI/RenderInput'
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
    if (
      (field === 'confirmPassword' && value !== formData.newPassword) ||
      (field === 'newPassword' && value !== formData.confirmPassword)
    ) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: '密码不一致',
      }))
    } else if (!formData.newPassword && !formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: '',
      }))
    } else if (field === 'newPassword' && value == formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }))
    } else {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
    userUpdatePassword(formData.currentPassword, formData.newPassword).then(
      (res) => {
        if (res.data.code === '200') {
          showToast({
            title: '提交成功',
            message: '密码已更新',
            severity: ToastSeverity.Success,
            duration: 3000,
          })
          setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          })
        } else if (res.data.code === '400') {
          showToast({
            title: '提交失败',
            message: res.data.msg,
            severity: ToastSeverity.Danger,
            duration: 3000,
          })
        } else {
          showToast({
            title: '未知错误',
            message: `服务器出错！请稍后再试！`,
            severity: ToastSeverity.Warning,
            duration: 3000,
          })
        }
      }
    )
  }

  function renderInput({
    label,
    field,
    required,
    placeholder,
    type,
  }: {
    label: string
    field: keyof typeof formData
    required?: boolean
    placeholder?: string
    type?: string
  }) {
    return (
      <RenderInput<typeof formData>
        label={label}
        field={field}
        data={formData}
        required={required}
        placeholder={placeholder}
        type={type || 'password'}
        errors={errors}
        onChange={handleChange}
      />
    )
  }

  return (
    <InfoCard
      title="更改密码"
      actions={
        <Button
          size="sm"
          variant="soft"
          startDecorator={<SaveRounded />}
          type="submit"
          form="edit-password-form"
        >
          保存
        </Button>
      }
    >
      <form id="edit-password-form" onSubmit={(e) => handleSubmit(e)}>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          {renderInput({
            label: '当前密码',
            field: 'currentPassword',
            placeholder: '请输入当前密码',
          })}
          {renderInput({
            label: '新密码',
            field: 'newPassword',
            required: formData.currentPassword.length != 0,
            placeholder: '请输入新密码',
          })}
          {renderInput({
            label: '确认新密码',
            field: 'confirmPassword',
            placeholder: '请再次输入新密码',
          })}
        </Stack>
      </form>
    </InfoCard>
  )
}
