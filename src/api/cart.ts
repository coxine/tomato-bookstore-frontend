import { ApiResponse } from '../types/apiResponse'
import { CartData, CartItem } from '../types/cart'
import { axios } from '../utils/require'

import { CART_MODULE } from './_prefix'

export const cartAddProduct = (productId: number, quantity: number) => {
  return axios
    .post<ApiResponse<CartItem>>(`${CART_MODULE}`, {
      productId: productId,
      quantity: quantity,
    })
    .then((res) => {
      return res
    })
}

export const cartDeleteProduct = (cartItemId: number) => {
  return axios
    .delete<ApiResponse<string>>(`${CART_MODULE}/${cartItemId}`)
    .then((res) => {
      return res
    })
}

export const cartUpdateQuantity = (cartItemId: number, quantity: number) => {
  return axios
    .patch<ApiResponse<string>>(`${CART_MODULE}/${cartItemId}`, {
      quantity: quantity,
    })
    .then((res) => {
      return res
    })
}

export const cartGetCartItems = () => {
  return axios.get<ApiResponse<CartData>>(`${CART_MODULE}`).then((res) => {
    return res
  })
}
