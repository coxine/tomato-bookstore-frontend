import { ApiResponse } from '../types/apiResponse'
import { Book } from '../types/book'
import { Stockpile } from '../types/stockpile'
import { axios } from '../utils/require'

import { PRODUCT_MODULE, PRODUCT_STOCKPILE_MODULE } from './_prefix'

export const productGetAllSimpleInfo = () => {
  return axios.get<ApiResponse<Book[]>>(`${PRODUCT_MODULE}`).then((res) => {
    return {
      ...res,
      data: {
        ...res.data,
        data: res.data.data.map((book) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { specifications, tags, ...bookSimple } = book // 利用对象解构排除字段
          return bookSimple
        }),
      },
    }
  })
}

export const productGetInfo = (productId: number) => {
  return axios
    .get<ApiResponse<Book>>(`${PRODUCT_MODULE}/${productId}`)
    .then((res) => {
      return res
    })
}

export const productUpdate = (productUpdateInfo: Book) => {
  return axios
    .put<ApiResponse<string>>(`${PRODUCT_MODULE}`, productUpdateInfo)
    .then((res) => {
      return res
    })
}

export const productCreate = (productInfo: Book) => {
  return axios
    .post<ApiResponse<Book>>(`${PRODUCT_MODULE}`, productInfo)
    .then((res) => {
      return res
    })
}

export const productDelete = (productId: number) => {
  return axios
    .delete<ApiResponse<string>>(`${PRODUCT_MODULE}/${productId}`)
    .then((res) => {
      return res
    })
}

export const productUpdateStockpile = (productId: number, amount: number) => {
  return axios
    .patch<ApiResponse<string>>(`${PRODUCT_STOCKPILE_MODULE}/${productId}`, {
      amount: amount,
    })
    .then((res) => {
      return res
    })
}

export const productGetStockpile = (productId: number) => {
  return axios
    .get<ApiResponse<Stockpile>>(`${PRODUCT_STOCKPILE_MODULE}/${productId}`)
    .then((res) => {
      return res
    })
}
