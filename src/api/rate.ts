import { ApiResponse } from '../types/apiResponse'
import { Book } from '../types/book'
import { axios } from '../utils/require'

import { PRODUCT_MODULE } from './_prefix'

export const rateSubmit = async (productId: number, rate: number) => {
  const res = await axios.post<ApiResponse<number>>(
    `${PRODUCT_MODULE}/${productId}/rate/${rate}`
  )
  return res
}

export const rateRank = async (num: number) => {
  const res = await axios.get<ApiResponse<Book[]>>(
    `${PRODUCT_MODULE}/byRating/${num}`
  )
  return res
}
