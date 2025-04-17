export interface order {
  orderId: string
  username: string
  totalAmount: number
  paymentMethod: string
  createTime: string
  status: string
}

export interface orderForPay {
  paymentForm: string
  orderId: string
  totalAmount: number
  paymentMethod: string
}
