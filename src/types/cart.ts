export interface CartItem {
  cartItemId: string
  productId: string
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
