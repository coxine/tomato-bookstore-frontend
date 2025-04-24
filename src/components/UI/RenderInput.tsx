import { Stack, FormLabel, FormControl, Input, FormHelperText } from '@mui/joy'

// 定义类型
interface RenderInputProps<T> {
  label: string
  field: keyof T
  data: T
  required?: boolean
  placeholder?: string
  type?: string
  startIcon?: React.ReactNode
  errors?: Record<keyof T, string>
  onChange: (field: keyof T, value: string) => void
}

// 通用输入框
export const RenderInput = <T extends object>({
  label, // 输入框名
  field, // 字段名
  data, // 数据来源
  required = false, // 是否必填
  placeholder = '', // 占位字符
  type = 'text', // 输入类型
  startIcon, // 图标
  errors, // 错误提示
  onChange,
}: RenderInputProps<T>) => {
  return (
    <Stack spacing={1}>
      <FormLabel>{label}</FormLabel>
      <FormControl required={required}>
        <Input
          size="sm"
          type={type}
          startDecorator={startIcon}
          value={data[field] ? data[field].toString() : ''}
          onChange={(e) => onChange(field, e.target.value)}
          placeholder={placeholder || label}
        />
        {errors && errors[field] && (
          <FormHelperText sx={{ color: 'red' }}>{errors[field]}</FormHelperText>
        )}
      </FormControl>
    </Stack>
  )
}
