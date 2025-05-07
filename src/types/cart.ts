export interface CartItem {
  cartItemId: number
  productId: number
  title: string
  price: number
  description: string
  cover: string
  detail: string
  quantity: number
}

export interface CartData {
  items: CartItem[]
  total: number
  totalAmount: number
}
