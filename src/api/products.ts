import { ApiResponse } from '../types/apiResponse'
import { Book } from '../types/book'
import { Stockpile } from '../types/stockpile'
import { axios } from '../utils/require'

import { PRODUCT_MODULE, PRODUCT_STOCKPILE_MODULE } from './_prefix'

export const productGetAllSimpleInfo = async () => {
  const res = await axios.get<ApiResponse<Book[]>>(`${PRODUCT_MODULE}`)
  return {
    ...res,
    data: {
      ...res.data,
      data: res.data.data.map((book) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { specifications, ...bookSimple } = book // 利用对象解构排除字段
        return bookSimple
      }),
    },
  }
}

export const productGetInfo = async (productId: number) => {
  const res = await axios.get<ApiResponse<Book>>(
    `${PRODUCT_MODULE}/${productId}`
  )
  return res
}

export const productUpdate = async (productUpdateInfo: Book) => {
  const res = await axios.put<ApiResponse<string>>(
    `${PRODUCT_MODULE}`,
    productUpdateInfo
  )
  return res
}

export const productCreate = async (productInfo: Book) => {
  const res = await axios.post<ApiResponse<Book>>(
    `${PRODUCT_MODULE}`,
    productInfo
  )
  return res
}

export const productDelete = async (productId: number) => {
  const res = await axios.delete<ApiResponse<string>>(
    `${PRODUCT_MODULE}/${productId}`
  )
  return res
}

export const productUpdateStockpile = async (
  productId: number,
  amount: number
) => {
  const res = await axios.patch<ApiResponse<string>>(
    `${PRODUCT_STOCKPILE_MODULE}/${productId}`,
    {
      amount: amount,
    }
  )
  return res
}

export const productGetStockpile = async (productId: number) => {
  const res = await axios.get<ApiResponse<Stockpile>>(
    `${PRODUCT_STOCKPILE_MODULE}/${productId}`
  )
  return res
}
