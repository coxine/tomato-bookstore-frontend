import { ApiResponse } from '../types/apiResponse'
import { Book } from '../types/book'
import { Tag } from '../types/tag'
import { axios } from '../utils/require'

import { PRODUCT_MODULE, TAG_MODULE } from './_prefix'

export const tagGetAll = async () => {
  const res = await axios.get<ApiResponse<Tag[]>>(`${TAG_MODULE}`)
  return res
}

export const tagGetSimpleProduct = async (tagId: number) => {
  const res = await axios.get<ApiResponse<Book[]>>(
    `${PRODUCT_MODULE}/byTag/${tagId}`
  )
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
