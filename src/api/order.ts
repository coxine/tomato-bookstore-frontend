import { ApiResponse } from '../types/apiResponse'
import { Order, OrderDetail, OrderForPay } from '../types/order'
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
/**
 * 前端无需传入用户ID，由后端自动检测用户ID进行订单获取
 */
export const orderGetUsers = () => {
  return axios
    .get<ApiResponse<OrderDetail[]>>(`${ORDER_MODULE}/userOrders`)
    .then((res) => {
      return res
    })
}

/**
 * 需要管理员权限
 * 无权限时状态码400且data为报错消息（string）
 */
export const orderGetAll = () => {
  return axios
    .get<ApiResponse<OrderDetail[]>>(`${ORDER_MODULE}/allOrders`)
    .then((res) => {
      return res
    })
}
