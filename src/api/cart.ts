import { ApiResponse } from '../types/apiResponse'
import { CartData, CartItem } from '../types/cart'
import { axios } from '../utils/require'

import { CART_MODULE } from './_prefix'

export const cartAddProduct = async (productId: number, quantity: number) => {
  const res = await axios
    .post<ApiResponse<CartItem>>(`${CART_MODULE}`, {
      productId: productId,
      quantity: quantity,
    })
  return res
}

export const cartDeleteProduct = async (cartItemId: number) => {
  const res = await axios
    .delete<ApiResponse<string>>(`${CART_MODULE}/${cartItemId}`)
  return res
}

export const cartUpdateQuantity = async (cartItemId: number, quantity: number) => {
  const res = await axios
    .patch<ApiResponse<string>>(`${CART_MODULE}/${cartItemId}`, {
      quantity: quantity,
    })
  return res
}

export const cartGetCartItems = async () => {
  const res = await axios.get<ApiResponse<CartData>>(`${CART_MODULE}`)
  return res
}
