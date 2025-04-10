import { Book } from '../../types/book'
import { ValidatorResult } from '../../types/validatorResult'

// 定义字段长度规则（与 Book 类型同步）
const PRODUCT_MAX_LENGTH: Record<keyof Book, number> = {
  id: 255, // useless
  title: 50,
  price: 0, // 0 represents extra rule
  // precision = 10, scale = 2, min = 0, max = 9999999.99, 最多七位整数两位小数
  rate: 0, // min = 0, max = 10
  description: 255,
  cover: 500,
  detail: 500,
  specifications: -1, // -1 represents separate processing
  tags: -2, // -2 represents undefined
}

export function checkProductLength(key: keyof Book, value: string): boolean {
  return value.length > PRODUCT_MAX_LENGTH[key]
}

// 价格验证逻辑分解
const priceValidate = (priceStr: string): ValidatorResult => {
  // 处理科学计数法（如 1e7 => 10000000）
  if (/e/i.test(priceStr)) {
    try {
      priceStr = Number(priceStr).toFixed(2)
    } catch {
      return { valid: false, message: '价格格式错误' }
    }
  }

  // 获取小数部分
  const decimalPart = priceStr.split('.')[1] || ''

  if (decimalPart.length > 2) {
    return { valid: false, message: '价格小数部分不得超过2位' }
  }

  const numericValue = Number(priceStr)
  if (isNaN(numericValue)) {
    return { valid: false, message: '价格必须是有效数字' }
  }
  if (numericValue < 0) {
    return { valid: false, message: '价格不能为负数' }
  }
  if (numericValue > 9999999.99) {
    return { valid: false, message: '价格不能超过9999999.99' }
  }

  return { valid: true }
}

export const productValidators: Record<
  string,
  (value: string) => ValidatorResult
> = {
  title: (value: string) =>
    checkProductLength('title', value)
      ? { valid: false, message: '书名过长' }
      : { valid: true },
  price: (value: string) => priceValidate(value),
  description: (value: string) =>
    checkProductLength('description', value)
      ? { valid: false, message: '书籍描述过长' }
      : { valid: true },
  detail: (value: string) =>
    checkProductLength('detail', value)
      ? { valid: false, message: '书籍详细过长' }
      : { valid: true },
}
