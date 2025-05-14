import { ApiResponse } from '../types/apiResponse'
import { Book } from '../types/book'
import { Tag } from '../types/tag'
import { axios } from '../utils/require'

import { PRODUCT_MODULE, TAG_MODULE } from './_prefix'

export const tagGetAll = () => {
  return axios.get<ApiResponse<Tag[]>>(`${TAG_MODULE}`).then((res) => {
    return res
  })
}

export const tagGetSimpleProduct = (tagId: number) => {
  return axios
    .get<ApiResponse<Book[]>>(`${PRODUCT_MODULE}/bytag/${tagId}`)
    .then((res) => {
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
