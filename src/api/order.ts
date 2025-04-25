import { ApiResponse } from '../types/apiResponse'
import { order, orderForPay } from '../types/order'
import { axios } from '../utils/require'

import { CART_MODULE, ORDER_MODULE } from './_prefix'

export const orderSubmit = async (
  cartItemIds: string[],
  shippingAddress: {
    address: string
    phone: string
    name: string
  },
  paymentMethod: string
) => {
  const res = await axios.post<ApiResponse<order>>(`${CART_MODULE}/checkout`, {
    cartItemIds: cartItemIds,
    shipping_address: shippingAddress,
    payment_method: paymentMethod,
  })
  return res
}

export const orderToPay = async (orderId: string) => {
  const res = await axios.post<ApiResponse<orderForPay>>(
    `${ORDER_MODULE}/${orderId}/pay`
  )
  return res
}
