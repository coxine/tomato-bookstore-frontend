import { Chapter } from '../types/chapter'
import { OrderStatus } from '../types/order'

export const priceFormatter = (priceValue: number) => {
  return `¥${priceValue.toFixed(2)}`
}

export const orderAddressFormatter = (fullAddress: string) => {
  return fullAddress.length > 20 ? `${fullAddress.slice(0, 20)}...` : fullAddress
}

export const datetimeFormatter = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

export const paymentMethodFormatter = (paymentMethod: string) => {
  switch (paymentMethod) {
    case 'ALIPAY':
      return '支付宝'
    case 'WECHAT':
      return '微信'
    default:
      return paymentMethod
  }
}

export const chapterStatusFormatter = (chapter: Chapter) => {
  switch (chapter.status) {
    case 'FREE':
      return { label: '免费', color: 'success' as const }
    case 'LOCKED':
      return { label: '锁定', color: 'danger' as const }
    case 'CHARGED':
      if (chapter.purchased) {
        return { label: '已购', color: 'success' as const }
      }
      return { label: '未购', color: 'warning' as const }
  }
}

export const orderStatusFormatter = (status: OrderStatus) => {
  switch (status) {
    case 'PENDING':
      return { label: '待支付', color: 'warning' as const }
    case 'CANCELLED':
      return { label: '已取消', color: 'neutral' as const }
    case 'SUCCESS':
      return { label: '已支付', color: 'success' as const }
  }
}
