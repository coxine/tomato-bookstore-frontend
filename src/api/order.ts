import { ApiResponse } from '../types/apiResponse'
import { Order, OrderForPay } from '../types/order'
import { axios } from '../utils/require'

import { CART_MODULE, ORDER_MODULE } from './_prefix'

export const orderSubmit = (
  cartItemIds: number[],
  shippingAddress: {
    address: string
    phone: string
    name: string
  },
  paymentMethod: string
) => {
  return axios
    .post<ApiResponse<Order>>(`${CART_MODULE}/checkout`, {
      cartItemIds: cartItemIds,
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
    })
    .then((res) => {
      return res
    })
}

export const orderToPay = (orderId: number) => {
  return axios
    .post<ApiResponse<OrderForPay>>(`${ORDER_MODULE}/${orderId}/pay`)
    .then((res) => {
      return res
    })
}
