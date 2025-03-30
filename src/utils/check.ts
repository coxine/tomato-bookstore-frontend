import { Profile } from '../types/profile'

// 定义字段长度规则（与 Profile 类型同步）
const USER_INFO_LEN: Record<keyof Profile, number> = {
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

export function checkUserInfoLen(
  key: keyof Profile, // 修正参数类型
  value: string
): boolean {
  return value.length > USER_INFO_LEN[key]
}
