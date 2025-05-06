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
export const orderStatusFormatter = (status: string) => {
  switch (status) {
    case 'CANCELLED':
      return { label: '已取消', color: 'neutral' as const }
    case 'SUCCESS':
      return { label: '已支付', color: 'success' as const }
    case 'PENDING':
      return { label: '待支付', color: 'warning' as const }
    case 'SHIPPED':
      return { label: '已发货', color: 'primary' as const }
    case 'DELIVERED':
      return { label: '已送达', color: 'success' as const }
    default:
      return { label: status, color: 'neutral' as const }
  }
}
