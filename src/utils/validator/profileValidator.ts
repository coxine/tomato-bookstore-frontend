import { Profile } from '../../types/profile'

// 定义字段长度规则（与 Profile 类型同步）
const PROFILE_MAX_LENGTH: Record<keyof Profile, number> = {
  id: 255,
  username: 50,
  password: 100,
  name: 50,
  avatar: 255,
  telephone: 11,
  email: 100,
  location: 255,
  role: 50,
}

export function checkProfileLength(key: keyof Profile, value: string): boolean {
  return value.length > PROFILE_MAX_LENGTH[key]
}

export type ValidatorResult = {
  valid: boolean
  message?: string
}

export const profileValidators: Record<
  string,
  (value: string) => ValidatorResult
> = {
  username: (value: string) =>
    checkProfileLength('username', value)
      ? { valid: false, message: '用户名过长' }
      : { valid: true },
  name: (value: string) =>
    checkProfileLength('name', value)
      ? { valid: false, message: '姓名过长' }
      : { valid: true },
  telephone: (value: string) =>
    !value || /^1\d{10}$/.test(value)
      ? { valid: true }
      : { valid: false, message: '手机号不合法' },
  email: (value: string) =>
    checkProfileLength('email', value)
      ? { valid: false, message: '邮箱过长' }
      : { valid: true },
  location: (value: string) =>
    checkProfileLength('location', value)
      ? { valid: false, message: '地址过长' }
      : { valid: true },
}
