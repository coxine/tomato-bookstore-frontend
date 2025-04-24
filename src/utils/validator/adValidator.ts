import { Advertisement } from '../../types/advertisement'
import { ValidatorResult } from '../../types/validatorResult'

const PROFILE_MAX_LENGTH: Record<keyof Advertisement, number> = {
  id: 255, // useless
  title: 50,
  content: 500,
  imgUrl: 500,
  productId: 255, // useless
}

export function checkAdLength(
  key: keyof Advertisement,
  value: string
): boolean {
  return value.length > PROFILE_MAX_LENGTH[key]
}

export const AdValidators: Record<string, (value: string) => ValidatorResult> =
  {
    title: (value: string) =>
      checkAdLength('title', value)
        ? { valid: false, message: '标题过长' }
        : { valid: true },
    content: (value: string) =>
      checkAdLength('content', value)
        ? { valid: false, message: '广告内容过长' }
        : { valid: true },
  }
