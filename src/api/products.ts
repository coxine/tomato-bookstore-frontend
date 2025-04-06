import { ApiResponse } from '../types/apiResponse'
import { Book } from '../types/book'
import { axios } from '../utils/require'

import { PRODUCT_MODULE } from './_prefix'

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

export const productGetInfo = (id: string) => {
  return axios.get<ApiResponse<Book>>(`${PRODUCT_MODULE}/${id}`).then((res) => {
    return res
  })
}
