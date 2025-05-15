import { ApiResponse } from '../types/apiResponse'
import { axios } from '../utils/require'

import { PRODUCT_MODULE } from './_prefix'

export const rateSubmit = async (productId: number, rate: number) => {
  const res = await axios
    .post<ApiResponse<number>>(`${PRODUCT_MODULE}/${productId}/rate/${rate}`)
  return res
}
