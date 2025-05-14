import { ApiResponse } from '../types/apiResponse'
import { axios } from '../utils/require'

import { PRODUCT_MODULE } from './_prefix'

export const rateSubmit = (productId: number, rate: number) => {
  return axios
    .post<ApiResponse<number>>(`${PRODUCT_MODULE}/${productId}/rate/${rate}`)
    .then((res) => {
      return res
    })
}
