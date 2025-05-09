import { ChapterState } from '../types/chapter'
import { OrderStatus } from '../types/order'

export const priceFormatter = (params: number) => {
  return `¥${params.toFixed(2)}`
}

export const orderAddressFormatter = (params: string) => {
  return params.length > 20 ? `${params.slice(0, 20)}...` : params
}

export const datetimeFormatter = (params: string) => {
  return new Date(params).toLocaleString()
}

export const paymentMethodFormatter = (params: string) => {
  switch (params) {
    case 'ALIPAY':
      return '支付宝'
    case 'WECHAT':
      return '微信'
    default:
      return params
  }
}

export const chapterStatusFormatter = (params: ChapterState) => {
  switch (params) {
    case 'FREE':
      return { label: '免费试读', color: 'success' as const }
    case 'LOCKED':
      return { label: '锁定', color: 'danger' as const }
    case 'CHARGED':
      return { label: '付费', color: 'warning' as const }
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
