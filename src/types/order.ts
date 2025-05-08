export interface Order {
  orderId: number
  username: string
  totalAmount: number
  paymentMethod: string
  createTime: string
  status: string
}

export interface OrderForPay {
  paymentForm: string
  orderId: number
  totalAmount: number
  paymentMethod: string
}

export interface OrderItem {
  productId: number
  productTitle: string
  quantity: number
  price: number
  cover: string
}

export interface OrderDetail {
  orderId: number
  totalAmount: number
  paymentMethod: PaymentMethod
  status: OrderStatus
  createTime: string
  name: string
  address: string
  phone: string
  orderItems: OrderItem[]
}

export type OrderStatus = 'SUCCESS' | 'CANCELLED' | 'PENDING'
export type PaymentMethod = 'ALIPAY' | 'WECHAT'
