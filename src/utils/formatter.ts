export const priceFormatter = (params: number) => {
  return `¥${params.toFixed(2)}`
}

export const orderAddressFormatter = (params: string) => {
  return params.length > 20 ? `${params.slice(0, 20)}...` : params
}

export const orderCreateTimeFormatter = (params: string) => {
  return new Date(params).toLocaleString()
}

export const orderStatusFormatter = (params: string) => {
  switch (params) {
    case 'CANCELLED':
      return '已取消'
    case 'SUCCESS':
      return '已支付'
    default:
      return params
  }
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
