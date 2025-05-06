export interface Order {
  orderId: string
  username: string
  totalAmount: number
  paymentMethod: string
  createTime: string
  status: string
}

export interface OrderForPay {
  paymentForm: string
  orderId: string
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
  paymentMethod: string
  status: 'SUCCESS' | 'CANCELLED'
  createTime: string
  name: string
  address: string
  phone: string
  orderItems: OrderItem[]
}
